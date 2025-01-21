import { UserRegistration } from "../types";

type Validation = {
    valid: boolean;
    message: string;
}

export default function validate_user_object(user: Partial<UserRegistration>): Validation {

    if (!user) {
        return {
            valid: false,
            message: "User object is required."
        };
    }

    if (!user.full_name || typeof user.full_name !== "string" || user.full_name.trim().length === 0) {
        return {
            valid: false,
            message: "Full name is required and must be a non-empty string."
        };
    }

    if (!user.email || typeof user.email !== "string" || !/\S+@\S+\.\S+/.test(user.email)) {
        return {
            valid: false,
            message: "A valid email is required."
        };
    }

    if (!user.phone_number || typeof user.phone_number !== "string") {
        return {
            valid: false,
            message: "Phone number is required and must be a string."
        };
    }

    if (!user.password || typeof user.password !== "string") {
        return {
            valid: false,
            message: "Password is required and must be a string."
        };
    }

    if (!user.date_of_birth || typeof user.date_of_birth !== "string") {
        return {
            valid: false,
            message: "Date of birth is required and must be a string (ISO format)."
        };
    }

    if (!user.role || !["user", "admin"].includes(user.role)) {
        return {
            valid: false,
            message: "Role must be either 'user' or 'admin'."
        };
    }

    if (!user.privacy_policy_accepted_at || isNaN(Date.parse(user.privacy_policy_accepted_at))) {
        return {
            valid: false,
            message: "Privacy policy must be accepted with a valid timestamp."
        };
    }
    
    if (!user.terms_accepted_at || isNaN(Date.parse(user.terms_accepted_at))) {
        return {
            valid: false,
            message: "Terms policy must be accepted with a valid timestamp."
        };
    }
    
    if (user.addresses) {
        for (const address of user.addresses) {
            if (!address.street_address || typeof address.street_address !== "string") {
                return { valid: false, message: "Each address must include a valid street address." };
            }
            if (!address.city || typeof address.city !== "string") {
                return { valid: false, message: "Each address must include a valid city." };
            }
            if (!address.postal_code || typeof address.postal_code !== "string") {
                return { valid: false, message: "Each address must include a valid postal code." };
            }
            if (!address.country || typeof address.country !== "string") {
                return { valid: false, message: "Each address must include a valid country." };
            }
        }
    }

    return { valid: true, message: "ok" };
}