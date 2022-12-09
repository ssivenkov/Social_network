import React, { FunctionComponent } from 'react';

import { PATH } from 'enum/pathEnum';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RootStateType } from 'store/types';

type MapStateToPropsType = {
  isAuth: boolean;
};

const mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
  isAuth: state.auth.isAuth,
});

export function withAuthRedirect<TWrappedComponentProps>(
  WrappedComponent: FunctionComponent<TWrappedComponentProps>,
) {
  const RedirectComponent = (props: MapStateToPropsType) => {
    const { isAuth, ...restProps } = props;

    if (!isAuth) return <Redirect to={`/${PATH.LOGIN}`} />;

    return <WrappedComponent {...(restProps as TWrappedComponentProps)} />;
  };

  return connect<MapStateToPropsType, object, TWrappedComponentProps, RootStateType>(
    mapStateToProps,
    {},
  )(RedirectComponent);
}
