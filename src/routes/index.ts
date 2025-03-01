import { Router } from "express";
import {
    handle_post_user,
    handle_post_user_address,
    handle_get_users,
    handle_get_user,
    handle_get_user_addresses,
    handle_get_user_address,
    handle_update_user,
    handle_update_user_address,
    handle_delete_user,
    handle_delete_user_address,
    handle_post_template,
    handle_get_templates,
    handle_get_template,
    handle_update_template,
    handle_delete_template
} from "../controllers";
import {
    validate_pagination_query,
    validate_user_access_control,
    validate_post_user,
    validate_uuid,
    validate_update_user,
    validate_addresses,
    validate_post_template,
    validate_update_template,
} from "../validators";

const router = Router();

/** --------------------------------------------------------------------------------------
 *                                                                                       *
 * @author        Users                                                                  *
 * @description   Routes for managing user, including creation, retrieval,               *
 *                updates, and deletion.                                                 *
 *                                                                                       *
 * --------------------------------------------------------------------------------------*/

router.post(
    "/users",
    validate_post_user,
    handle_post_user
);

router.get(
    "/users",
    validate_pagination_query,
    handle_get_users
);

router.get(
    "/users/:id",
    validate_uuid(["id"]),
    handle_get_user
);

router.patch(
    "/users/:id",
    validate_uuid(["id"]),
    validate_update_user,
    handle_update_user
);

router.delete(
    "/users/:id",
    validate_uuid(["id"]),
    handle_delete_user
);

/** --------------------------------------------------------------------------------------
 *                                                                                       *
 * @author        Users addresses                                                        *
 * @description   Routes for managing user addresses, including creation, retrieval,     *
 *                updates, and deletion.                                                 *
 *                                                                                       *
 * --------------------------------------------------------------------------------------*/

router.get(
    "/users/:id/addresses",
    validate_uuid(["id"]),
    handle_get_user_addresses
);

router.post(
    "/users/:id/addresses",
    validate_uuid(["id"]),
    validate_addresses,
    handle_post_user_address
);

router.get(
    "/users/:id/addresses/:address_id",
    validate_uuid(["id", "address_id"]),
    handle_get_user_address
);

router.put(
    "/users/:id/addresses/:address_id",
    validate_uuid(["id", "address_id"]),
    validate_addresses,
    handle_update_user_address
);

router.delete(
    "/users/:id/addresses/:address_id",
    validate_uuid(["id", "address_id"]),
    handle_delete_user_address
);

/** --------------------------------------------------------------------------------------
 *                                                                                       *
 * @author        Templates                                                              *
 * @description   Routes for managing templates, including creation, retrieval,          *
 *                updates, and deletion.                                                 *
 *                                                                                       *
 * --------------------------------------------------------------------------------------*/

router.post(
    "/templates",
    validate_post_template,
    handle_post_template
);

router.get(
    "/templates",
    handle_get_templates
);

router.get(
    "/templates/:id",
    validate_uuid(["id"]),
    handle_get_template
);

router.patch(
    "/templates/:id",
    validate_uuid(["id"]),
    validate_update_template,
    handle_update_template
);

router.delete(
    "/templates/:id",
    validate_uuid(["id"]),
    handle_delete_template
);

export default router;