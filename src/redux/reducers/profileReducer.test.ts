import profileReducer, { addPost, deletePost } from "./profileReducer";

let state = {
    posts: [
        {id: 1, message: "It's my first post.", likesCount: 20},
        {id: 2, message: "Hello, welcome!", likesCount: 15},
    ],
    profile: null,
    status: "",
}

it("length of posts should be incremented", () => {
    // 1. start test data
    let action = addPost("it-kamasutra");

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(3);
});

it("message on new post should be correct", () => {
    // 1. start test data
    let action = addPost("it-kamasutra");

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts[1].message).toBe("Hello, welcome!");
});

it("after deleting length of messages should be decrement", () => {
    // 1. start test data
    let action = deletePost(1);

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(1);
});

it("after deleting length of messages shouldn't be decrement if id is incorrect", () => {
    // 1. start test data
    let action = deletePost(1000);

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(2);
});