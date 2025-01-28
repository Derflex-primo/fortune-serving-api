import { Router } from "express";
import {
    handle_user_registration,
    handle_get_all_user,
    handle_get_user,
    handle_get_user_addresses,
    handle_update_user,
    handle_delete_user,
} from "../controllers";
import {
    validate_pagination_query,
    validate_user_access_control,
    validate_user_registration,
    validate_uuid,
    validate_update_user,
} from "../middlewares";

const router = Router();

//users
router.get("/users", validate_pagination_query, handle_get_all_user);
router.post("/users", validate_user_registration, handle_user_registration);
router.get("/users/:id", validate_uuid, handle_get_user);
router.patch("/users/:id", validate_uuid, validate_update_user, handle_update_user);
router.delete("/users/:id", validate_uuid, handle_delete_user);
router.get("/users/:id/addresses", validate_uuid, handle_get_user_addresses);

export default router;