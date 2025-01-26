import { test, expect } from "@playwright/test";
import { UserRegistration } from "../../src/types";
import { validate_user_object } from "../../src/utils";

test.describe("validate_user_object", () => {
    test("should return invalid if user object is missing", async () => {
        const result = validate_user_object(null as unknown as Partial<UserRegistration>);
        expect(result).toEqual({
            valid: false,
            message: "User object is required.",
        });
    });

    test("should return invalid for missing full_name", async () => {
        const user = { email: "test@example.com" } as Partial<UserRegistration>;
        const result = validate_user_object(user);
        expect(result).toEqual({
            valid: false,
            message: "Full name is required and must be a non-empty string.",
        });
    });

    test("should return invalid for invalid email", async () => {
        const user = { full_name: "John Doe", email: "invalidemail" } as Partial<UserRegistration>;
        const result = validate_user_object(user);
        expect(result).toEqual({
            valid: false,
            message: "A valid email is required.",
        });
    });

    test("should return invalid for missing phone_number", async () => {
        const user = { full_name: "John Doe", email: "test@example.com" } as Partial<UserRegistration>;
        const result = validate_user_object(user);
        expect(result).toEqual({
            valid: false,
            message: "Phone number is required and must be a string.",
        });
    });

    test("should return valid for a complete user object", async () => {
        const user: UserRegistration = {
            full_name: "John Doe",
            email: "test@example.com",
            phone_number: "1234567890",
            password: "securepassword",
            date_of_birth: "1990-01-01",
            role: "user",
            privacy_policy_accepted_at: new Date().toISOString(),
            terms_accepted_at: new Date().toISOString(),
            addresses: [
                {
                    address_type: "home",
                    street_address: "123 Main St",
                    city: "Sample City",
                    postal_code: "12345",
                    country: "Sample Country",
                },
            ],
        };
        const result = validate_user_object(user);
        expect(result).toEqual({
            valid: true,
            message: "ok",
        });
    });

    test("should return invalid for missing address fields", async () => {
        const user: UserRegistration = {
            full_name: "John Doe",
            email: "test@example.com",
            phone_number: "1234567890",
            password: "securepassword",
            date_of_birth: "1990-01-01",
            role: "user",
            privacy_policy_accepted_at: new Date().toISOString(),
            terms_accepted_at: new Date().toISOString(),
            addresses: [
                {
                    address_type: "work",
                    street_address: "123 Main St",
                    city: "",
                    postal_code: "12345",
                    country: "Sample Country",
                },
            ],
        };
        const result = validate_user_object(user);
        expect(result).toEqual({
            valid: false,
            message: "Each address must include a valid city.",
        });
    });
});