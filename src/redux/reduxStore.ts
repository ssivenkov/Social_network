import { applyMiddleware, combineReducers, createStore } from "redux";
import profileReducer, {
    ProfileActionsType,
    ProfileStateType,
} from "./reducers/profileReducer";
import dialogsReducer, {
    DialogsActionsType,
    DialogsStateType,
} from "./reducers/dialogsReducer";
import sidebarFriendsReducer, { SidebarFriendsStateType } from "./reducers/sidebarFriendsReducer";
import usersReducer, { UserActionsType, UsersStateType } from "./reducers/usersReducer";
import authReducer, { AuthActionsType, AuthStateType } from "./reducers/authReducer";
import thunkMiddleware, { ThunkAction } from "redux-thunk";

export type RootStateType = {
    profilePage: ProfileStateType
    dialogsPage: DialogsStateType
    sidebarFriends: SidebarFriendsStateType
    usersPage: UsersStateType
    auth: AuthStateType
}

export type RootActionsType = ProfileActionsType
    | DialogsActionsType
    | UserActionsType
    | AuthActionsType

export type RootThunk<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, RootActionsType>

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebarFriends: sidebarFriendsReducer,
    usersPage: usersReducer,
    auth: authReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;