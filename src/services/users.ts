export class User {
    public async create_user(users: any): Promise<any> {
        return {
            message: "User created successfully!",
            data: users,
        };
    }
}