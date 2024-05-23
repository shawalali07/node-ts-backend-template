import validator from "./validator";

const userResiter = [
  validator.emailFieldValidationMW("email"),
  validator.requiredFieldValidationMW("email"),
  validator.requiredFieldValidationMW("full_name"),
  validator.passwordFieldValidationMW("password", 8),
];
const signIn = [
  validator.emailFieldValidationMW("email"),
  validator.requiredFieldValidationMW("email"),
  validator.requiredFieldValidationMW("password"),
];

const forgotpassword = [
  validator.emailFieldValidationMW("email"),
  validator.requiredFieldValidationMW("email"),
];
const updatepassword = [
  validator.passwordFieldValidationMW("current_password", 8),
  validator.passwordFieldValidationMW("new_password", 8),
];
const verifyEmail = [validator.requiredFieldValidationMW("token")];
const resetpassword = [
  validator.requiredFieldValidationMW("token"),
  validator.requiredFieldValidationMW("password"),
  validator.passwordFieldValidationMW("password", 8),
];

const contactUs = [validator.requiredFieldValidationMW("message")];

class validation {
  signup = [userResiter, validator.validationResultMW];
  signin = [signIn, validator.validationResultMW];
  verifyEmail = [verifyEmail, validator.validationResultMW];
  contactUs = [contactUs, validator.validationResultMW];
  forgotpassword = [forgotpassword, validator.validationResultMW];
  updatepassword = [updatepassword, validator.validationResultMW];
  resetpassword = [resetpassword, validator.validationResultMW];
}

export default new validation();
