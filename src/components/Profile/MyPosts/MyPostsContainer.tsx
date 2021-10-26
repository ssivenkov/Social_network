import { addPost, PostsType } from "../../../redux/reducers/profileReducer";
import { MyPosts } from "./MyPosts";
import { connect } from "react-redux";
import { RootStateType } from "../../../redux/reduxStore";
import { Dispatch } from "redux";

type DispatchToPropsType = {
    addPost: (newPostText: any) => void
}

type MapStateToPropsType = {
    posts: PostsType[],
}

export type MyPostsPropsType = MapStateToPropsType & DispatchToPropsType;

let mapStateToProps = (state: RootStateType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
    };
};

let mapDispatchToProps = (dispatch: Dispatch): DispatchToPropsType => {
    return {
        addPost: (newPostText: any) => {
            dispatch(addPost(newPostText));
        },
    };
};

export const MyPostsContainer = connect<MapStateToPropsType, DispatchToPropsType, {}, RootStateType>
(mapStateToProps, mapDispatchToProps)(MyPosts);