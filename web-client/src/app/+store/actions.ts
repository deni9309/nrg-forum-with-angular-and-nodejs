import { createAction, props } from "@ngrx/store";

import { IUser } from "../core/interfaces";

const currentUserDomain = '[CurrentUser]';

export const login = createAction(`${currentUserDomain} Login`, props<{ user: IUser }>());
export const logout = createAction(`${currentUserDomain} Logout`);