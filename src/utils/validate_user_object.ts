import { User } from "../@types";

type Validation = {
    valid: boolean
    message: string
}

export default function validate_user_object(user: Partial<User>): Validation {

    return { valid: true, message: 'ok' }
}