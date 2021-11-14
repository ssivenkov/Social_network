import { createStore, applyMiddleware, combineReducers, compose } from "redux";
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
import appReducer from "./reducers/appReducer";

let RootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebarFriends: sidebarFriendsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
});

type RootReducerType = typeof RootReducer;
export type RootStateType = ReturnType<RootReducerType>

export type RootActionsType = ProfileActionsType
    | DialogsActionsType
    | UserActionsType
    | AuthActionsType

export type RootThunk<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, RootActionsType>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(RootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
//let store = createStore(RootReducer, applyMiddleware(thunkMiddleware));

export default store;