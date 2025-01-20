export class User {
    public async register_user(users: any): Promise<any> {
        return {
            message: "User created successfully!",
            data: users,
        };
    }
}