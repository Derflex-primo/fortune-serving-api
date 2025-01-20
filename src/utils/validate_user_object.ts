import { User } from "../@types";

type Validation = {
    valid: boolean;
    message?: string;
}

export default function validateUserObject(user: Partial<User>): Validation {

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

    if (!user.password_hash || typeof user.password_hash !== "string") {
        return {
            valid: false,
            message: "Password hash is required and must be a string."
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

    return { valid: true, message: "ok" };
}