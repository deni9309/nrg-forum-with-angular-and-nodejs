import { IBase } from './base';
import { IPost } from './post';
import { IUser } from './user';

export interface ITheme<T = string> extends IBase {
    subscribers: string[];
    posts: T[];
    themeName: string;
    userId: IUser;
}
