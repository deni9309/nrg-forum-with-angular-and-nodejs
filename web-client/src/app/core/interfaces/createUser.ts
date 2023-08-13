export interface CreateUserDto {
    username: string;
    email: string;
    password: string;
    rePassword: string;
    tel?: string;
}