import { createReducer, on } from "@ngrx/store";

import { login, logout } from "./actions";
import { IUser } from "../core/interfaces";

export const currentUserReducer = createReducer<IUser>(
    undefined,
    on(login, (_, action) => action.user),
    on(logout, () => undefined)
);