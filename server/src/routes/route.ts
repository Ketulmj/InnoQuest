import { Router } from "express";
import { handleSignIn, handleSignUp } from "../controllers/auth.controller.js";

const routes = Router();

routes.post("/login", handleSignIn);
routes.post("/signup", handleSignUp);

export default routes;