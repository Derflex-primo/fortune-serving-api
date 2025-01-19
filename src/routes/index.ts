import { Router } from "express";
import { post_user } from "../controllers";

const router = Router();

//users
router.post('/users', post_user)

export default router;