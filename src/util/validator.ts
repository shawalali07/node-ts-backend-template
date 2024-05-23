import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

class validator {
  requiredFieldValidationMW = (fieldName: any) =>
    check(fieldName)
      .exists({ checkFalsy: true, checkNull: true })
      .withMessage(`The ${fieldName} is required`);

  booleanFieldValidationMW = (fieldName: any) =>
    check(fieldName)
      .isBoolean()
      .withMessage(`The ${fieldName} must be boolean`);

  emailFieldValidationMW = (fieldName: string, optional = true) =>
    check(fieldName)
      .optional({ checkFalsy: optional })
      .isEmail()
      .withMessage("Invalid Email address");
  passwordFieldValidationMW = (fieldName: any, minLength: number) =>
    check(fieldName)
      .isLength({ min: minLength })
      .withMessage(
        `Password must be 8 characters long with the combination of uppercase , lowercase and numbers`
      )
      .matches("[0-9]")
      .withMessage(
        "Password must be 8 characters long with the combination of uppercase , lowercase and numbers"
      )
      .matches("[A-Z]")
      .withMessage(
        "Password must be 8 characters long with the combination of uppercase , lowercase and numbers"
      );
  validationResultMW = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let msg = errors.array();
      let error_msg = msg[0].msg;
      return res.status(400).json({ msg: error_msg });
    } else next();
  };
}
export default new validator();
