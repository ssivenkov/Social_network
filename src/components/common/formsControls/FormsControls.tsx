import React from 'react';

import { Field } from 'redux-form';

import styles from './formsControls.module.scss';

export const FormControl = (props: any) => {
  const { meta, children } = props;

  const hasError = meta.error && meta.touched;

  return (
    <div className={hasError ? styles.formControlError : ''}>
      <div>{children}</div>
      <div>{hasError && <span>{meta.error}</span>}</div>
    </div>
  );
};

export const Textarea = (props: any) => {
  const { input, ...restProps } = props;

  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  );
};

export const Input = (props: any) => {
  const { input, ...restProps } = props;

  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  );
};

export const createField = (
  placeholder = '',
  name: string,
  validators: any[],
  component: any,
  props = {},
  text = '',
  wrapperClass: any,
  fieldClass: any,
) => (
  <div className={wrapperClass}>
    <Field
      component={component}
      name={name}
      placeholder={placeholder}
      validate={validators}
      {...props}
      className={fieldClass}
    />
    {text}
  </div>
);
