import { Request, Response, NextFunction } from 'express';
import userService from '../services/userService';

class UserController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.email = req.body.email.toLowerCase();
      const result = await userService.signUp(req.body);
      if (result)
        return res.status(result?.statusCode).send({
          user: result?.user,
          msg: result?.msg,
        });
    } catch (error) {
      return next(error);
    }
  }
  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.verifyEmail(req.body.token);

      return res.status(200).send({
        token: result,
      });
    } catch (error) {
      return next(error);
    }
  }

  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.email = req.body.email.toLowerCase();
      const result = await userService.signIn(req.body);
      if (result) {
        return res.status(result.statusCode).send({
          token: result.token,
          user: result.user,
          msg: result.msg,
        });
      }
    } catch (error) {
      return next(error);
    }
  }
  async updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { new_password, current_password } = req.body;
      const id = req.currentUser!.id.toString();
      const update_password = await userService.updatePassword(
        new_password,
        current_password,
        id
      );
      if (update_password)
        return res
          .status(update_password.statusCode)
          .send({ msg: update_password.msg });
    } catch (error) {
      return next(error);
    }
  }
  async contactUs(req: Request, res: Response, next: NextFunction) {
    const { message } = req.body;
    const { email } = req.currentUser as any;
    try {
      const result = await userService.contactUs(message, email);
      return res.status(200).send({
        result,
      });
    } catch (error) {
      return next(error);
    }
  }
}
export default new UserController();
