import React from 'react';

import { ButtonPropsType } from './types';

export const Button = (props: ButtonPropsType) => {
  return <button type='button' {...props} />;
};
