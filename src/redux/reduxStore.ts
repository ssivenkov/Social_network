import { applyMiddleware, combineReducers, createStore } from "redux";
import profileReducer, {
    ProfileActionsType,
} from "./reducers/profileReducer";
import dialogsReducer, {
    DialogsActionsType,
} from "./reducers/dialogsReducer";
import sidebarFriendsReducer from "./reducers/sidebarFriendsReducer";
import usersReducer, { UserActionsType } from "./reducers/usersReducer";
import authReducer, { AuthActionsType } from "./reducers/authReducer";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import { reducer as formReducer } from "redux-form"

let RootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebarFriends: sidebarFriendsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
});

type RootReducerType = typeof RootReducer;
export type RootStateType = ReturnType<RootReducerType>

export type RootActionsType = ProfileActionsType
    | DialogsActionsType
    | UserActionsType
    | AuthActionsType

export type RootThunk<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, RootActionsType>

let store = createStore(RootReducer, applyMiddleware(thunkMiddleware));

export default store;