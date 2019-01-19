import { Localization } from "expo";
import i18n from "i18n-js";

const en = {
  greeting: {
    homeScreen: "Hello {{firstName}}"
  },
  screenTitle: {
    newAccount: "create new account"
  },
  buttonLabel: {
    newAccount: "Create a new account",
    signIn: "SignIn",
    signUp: "SignUp"
  },
  inputLabel: {
    email: "Email",
    password: "Password",
    fullName: "Full Name",
    confirmedPassword: "Confirm Password"
  },
  placeholder: {
    emailInput: "your email",
    passwordInput: "your password",
    fullNameInput: "your full name",
    confirmedPasswordInput: "your password again"
  },
  error: {
    confirmedPassword: "The passwords must be equal",
    emailInvalid: "This email isn't valid",
    passwordMinCharacters: "The password has at least 8 characters",
    requiredInput: "This field is required"
  }
};

const pt = {
  greeting: {
    homeScreen: "Olá {{firstName}}"
  },
  screenTitle: {
    newAccount: "criar nova conta"
  },
  buttonLabel: {
    newAccount: "Criar uma nova conta",
    signIn: "Entrar",
    signUp: "Criar"
  },
  inputLabel: {
    email: "Email",
    password: "Senha",
    fullName: "Nome Completo",
    confirmedPassword: "Confirmar Senha"
  },
  placeholder: {
    emailInput: "seu email",
    passwordInput: "sua senha",
    fullNameInput: "seu nome completo",
    confirmedPasswordInput: "sua senha novamente"
  },
  error: {
    confirmedPassword: "As senhas devem ser iguais",
    emailInvalid: "Esse email não é válido",
    passwordMinCharacters: "A senha tem no mínimo 8 caracteres",
    requiredInput: "É necessário preencher esse campo"
  }
};

const translations = { en, pt };

i18n.fallbacks = true;
i18n.translations = translations;
i18n.locale = Localization.locale;

export default i18n;
