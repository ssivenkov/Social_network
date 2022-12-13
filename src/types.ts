export type MapDispatchToPropsType = {
  initializeApp: () => void;
};

export type MapStateToPropsType = {
  initialized: boolean;
};

export type AppPropsType = MapStateToPropsType & MapDispatchToPropsType;
