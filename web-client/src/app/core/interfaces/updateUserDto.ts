import { IUser } from "./user";

export interface IUpdateUserDto extends Pick<IUser, 'username' | 'email' | 'tel'> { 
    profilePicture?: File;
}
