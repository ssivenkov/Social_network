export type FormDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};

export type LoginFormPropsType = {
  captchaUrl: null | string;
};

export type LoginPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string) => void;
  isAuth: boolean;
  captchaUrl: null | string;
};
