import { IUser } from '../core/interfaces';

export * from './reducers';
export * from './actions';

export interface IRootState {
    currentUser: IUser;
}