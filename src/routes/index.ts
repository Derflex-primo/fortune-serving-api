import { Router } from "express";
import { handle_user_registration, handle_get_all_user, handle_get_user } from "../controllers";
import { validate_pagination_query, validate_user_access_control, validate_user_registration, validate_get_user } from "../middlewares";

const router = Router();

//users
router.get("/users", validate_pagination_query, handle_get_all_user);
router.post("/users", validate_user_registration, handle_user_registration);

router.get("/users/:id", validate_get_user, handle_get_user);

export default router;