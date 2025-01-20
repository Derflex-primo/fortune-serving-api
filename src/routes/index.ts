import { Router } from "express";
import { handle_user_registration } from "../controllers";

const router = Router();

//users
router.post('/users', handle_user_registration)

export default router;