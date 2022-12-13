type MapDispatchToPropsType = {
  updateStatus: (status: string) => void;
};

type MapStateToPropsType = {
  status: string;
  isOwner: boolean;
};

export type ProfileStatusPropsType = MapStateToPropsType & MapDispatchToPropsType;

export type StateType = {
  editMode: boolean;
  status: string;
  isOwner: boolean;
};
