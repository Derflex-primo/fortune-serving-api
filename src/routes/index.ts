import { Router } from "express";
import { handle_user_registration } from "../controllers";
import { validate_pagination_query, validate_user_access_control, validate_user_registration } from "../middlewares";
import { handle_get_all_user } from "../controllers/users";

const router = Router();

//users
router.get("/users", validate_pagination_query, handle_get_all_user);
router.post("/users", validate_user_registration, handle_user_registration);

export default router;