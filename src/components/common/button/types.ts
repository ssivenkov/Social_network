// type of button props. Children in which the name of the button is stored is already described there
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export type ButtonPropsType = DefaultButtonPropsType & {
  //red?: boolean
};
