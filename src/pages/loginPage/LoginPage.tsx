import { INPUT_MAX_LENGTH } from 'constants/common';

import React from 'react';

import { Button } from 'components/common/button/Button';
import { createField, Input } from 'components/common/formsControls/FormsControls';
import inputErrorStyle from 'components/common/formsControls/formsControls.module.scss';
import { PATH } from 'enum/pathEnum';
import { maxLengthCreator, required } from 'helpers/validations';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { login } from 'store/reducers/authReducer/authReducer';
import { RootStateType } from 'store/types';

import styles from './loginPage.module.scss';
import { FormDataType, LoginFormPropsType, LoginPropsType } from './types';

const maxLength = maxLengthCreator(INPUT_MAX_LENGTH);

const LoginForm = (
  params: InjectedFormProps<FormDataType, LoginFormPropsType> & LoginFormPropsType,
) => {
  const { handleSubmit, error, captchaUrl } = params;

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      {createField(
        'Email',
        'email',
        [required],
        Input,
        {},
        '',
        styles.field,
        styles.input,
      )}

      {createField(
        'Password',
        'password',
        [required, maxLength],
        Input,
        {},
        '',
        styles.field,
        styles.input,
      )}

      {createField(
        'Password',
        'rememberMe',
        [],
        Input,
        { type: 'checkbox' },
        'Remember me',
        styles.field,
        '',
      )}

      {captchaUrl && (
        <div>
          <div>
            <img alt='Captcha' src={captchaUrl} />
          </div>
        </div>
      )}

      {captchaUrl &&
        createField(
          'Symbols from image',
          'captcha',
          [required],
          Input,
          {},
          '',
          styles.field,
          styles.input,
        )}

      {error && <div className={inputErrorStyle.formSummaryError}>{error}</div>}
      <div className={styles.field}>
        <Button className={styles.button} type='submit'>
          Submit
        </Button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm<FormDataType, LoginFormPropsType>({ form: 'login' })(
  LoginForm,
);

const LoginPage = (props: LoginPropsType) => {
  const { captchaUrl, isAuth, login } = props;

  const onSubmit = (formData: FormDataType) => {
    login(formData.email, formData.password, formData.rememberMe, formData.captcha);
  };

  if (isAuth) {
    return <Redirect to={`/${PATH.PROFILE}`} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <p className={styles.text}>
          {'To log in get registered '}
          <a href='src/pages/loginPage/LoginPage' rel='noreferrer' target='_blank'>
            here
          </a>
        </p>
        <p className={styles.text}>Or use common test account credentials:</p>
        <p className={styles.text}>Email: free@samuraijs.com</p>
        <p className={styles.text}>Password: free</p>
      </div>
      <LoginReduxForm captchaUrl={captchaUrl} onSubmit={onSubmit} />
    </div>
  );
};

const mapStateToProps = (state: RootStateType) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateToProps, { login })(LoginPage);
