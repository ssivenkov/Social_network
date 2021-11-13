import appReducer, { initializedSuccess } from "./appReducer";

let state = {
    initialized: false,
    email: null,
    login: null,
    isAuth: false,
}

it("app should be success initialized", () => {
    let action = initializedSuccess();
    let newState = appReducer(state, action);
    expect(newState.initialized).toBe(true);
})