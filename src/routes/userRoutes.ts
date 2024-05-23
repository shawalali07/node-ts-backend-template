import express, { Request, Response } from "express";
import validation from "../util/validationMiddlewares";
import { requireAuth } from "../middlewares/require-auth";
import { currentUser } from "../middlewares/curent-user";
import usersController from "../controllers/userController";
const router = express.Router();

router.post("/signup", ...validation.signup, usersController.signUp);
router.post("/signin", ...validation.signin, usersController.signIn);
router.post(
  "/contact/us",
  ...validation.contactUs,
  currentUser,
  requireAuth,
  usersController.contactUs,
);
router.patch("/update/password", ...validation.updatepassword);
router.put(
  "/verify/email",
  ...validation.verifyEmail,
  usersController.verifyEmail,
);

export { router as usersRouter };
