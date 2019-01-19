import { Localization } from "expo";
import i18n from "i18n-js";

const en = {
  newAccountButton: "Create a new account",
  email: "Email",
  emailInputPlaceholder: "your email",
  password: "Password",
  passwordInputPlaceholder: "your password",
  signInButton: "SignIn",
  emailInvalid: "This email isn't valid",
  passwordMinCharacters: "The password has at least 8 characters",
  requiredInput: "This field is required"
};

const pt = {
  newAccountButton: "Criar uma nova conta",
  email: "Email",
  emailInputPlaceholder: "seu email",
  password: "Senha",
  passwordInputPlaceholder: "sua senha",
  signInButton: "Entrar",
  emailInvalid: "Esse email não é válido",
  passwordMinCharacters: "A senha tem no mínimo 8 caracteres",
  requiredInput: "É necessário preencher esse campo"
};

const translations = { en, pt };

i18n.fallbacks = true;
i18n.translations = translations;
i18n.locale = Localization.locale;

export default i18n;
