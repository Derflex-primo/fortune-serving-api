import { Router } from "express";
import { handle_user_registration } from "../controllers";
import { validate_user_access_control, validate_user_registration } from "../middlewares";

const router = Router();

//users
router.get("/users", validate_user_access_control(['admin']))
router.post("/users", validate_user_access_control(['user', 'admin']), validate_user_registration, handle_user_registration)

export default router;