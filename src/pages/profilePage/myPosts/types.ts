import { PostsType } from 'store/reducers/profileReducer/types';

export type MapDispatchToPropsType = {
  addPost: (newPostText: string) => void;
};

export type MapStateToPropsType = {
  posts: PostsType[];
};

export type MyPostsCommonPropsType = {
  isOwner: boolean;
  userAvatar: string | null | undefined;
};

export type MyPostsConnectPropsType = MapStateToPropsType & MapDispatchToPropsType;
