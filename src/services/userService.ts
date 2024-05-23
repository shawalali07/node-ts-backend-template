import { User, UserCreationAttributes } from '../models/User';
import { BadRequestError } from '../errors/BadRequestError';
import jwt from 'jsonwebtoken';
import Email from '../util/Email';
import Password from '../util/Password';
import { NotAuthorizedError } from '../errors/NotAuthorizeError';
import { ObjectId } from 'mongoose';
import { config } from '../config/configBasic';

class UserService {
  async signUp(reqBody: UserCreationAttributes) {
    const { email, password, full_name } = reqBody;

    const existingUser = await User.findOne({
      where: {
        email,
      },
    });
    if (existingUser) {
      throw new BadRequestError('Email already exists.');
    }
    // let generateCode = generator.generate({ length: 8, numbers: true });
    // let token = jwt.sign(generateCode, String(process.env.JWT_KEY));
    let user = new User({
      email,
      password,
      full_name,
    });
    const new_user = await user.save();

    // let link = `${process.env.SERVER_URL}/verify/${token}`;
    // await Email({
    //   to: email,
    //   subject: "Email Verification",
    //   text: "Hi! Click on the following link to verify your email",
    //   html: `Hi!  Click on the following link to verify your email. <br> <a href="${link}">${link}</a>`,
    // })

    //   return email ;
    if (new_user) {
      return {
        statusCode: 201,
        user: new_user,
        msg: 'Signed Up Successfully',
      };
    }
  }
  async createToken(id: string, role: string, email: string) {
    let expires;
    expires = '1h';
    const token = jwt.sign(
      {
        id: id,
        role: role,
        email,
      },
      config.Jwt_keys.JWT_key!,
      { expiresIn: expires }
    );

    return token;
  }

  async verifyEmail(token: string) {
    const user = await User.findOne({ token });
    if (!user) {
      throw new BadRequestError("User doesn't exist.");
    }
    if (user?.email_verified) {
      throw new BadRequestError('Email already verified.');
    }

    const verifyUser = await User.updateOne(
      { email: user?.email },
      { email_verified: true }
    );

    const authorisedToken = await this.createToken(
      user.id,
      user.role,
      user.email
    );
    return authorisedToken;
  }

  async signIn(reqBody: UserCreationAttributes) {
    const { email, password } = reqBody;
    const existingUser = await User.findOne({
      email,
    });
    if (!existingUser) {
      throw new NotAuthorizedError();
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordsMatch) {
      throw new NotAuthorizedError();
    }

    const token = await this.createToken(
      existingUser.id,
      existingUser.role,
      existingUser.email
    );
    return {
      statusCode: 200,
      token: token,
      user: existingUser,
      msg: 'Signed In Successfully',
    };
  }
  async updatePassword(
    new_password: string,
    current_password: string,
    id: string
  ) {
    const user = await User.findById(id);
    if (!user) {
      throw new BadRequestError('No, such user found');
    }
    const passwords_match = await Password.compare(
      user.password,
      current_password
    );
    if (passwords_match) {
      throw new BadRequestError('Current and new password cannot be same');
    }
    const encrypt_password = await Password.toHash(new_password);
    user.password = encrypt_password;
    const password_update = await user.save();
    if (password_update) {
      return {
        statusCode: 200,
        msg: 'password updated Successfully',
      };
    }
  }

  async contactUs(message: string, email: string) {
    await Email({
      from: '',
      to: '',
      subject: 'New Message',
      text: `A new message has been received from ${email}:\n\n${message}`,
    });
    return {
      statusCode: 200,
      msg: 'Email sent successfully',
    };
  }
}
export default new UserService();
