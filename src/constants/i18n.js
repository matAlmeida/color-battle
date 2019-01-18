import { Localization } from "expo";
import i18n from "i18n-js";

const en = {
  newAccount: "Create a new account"
};

const pt = {
  newAccount: "Criar uma nova conta"
};

const translations = { en, pt };

i18n.fallbacks = true;
i18n.translations = translations;
i18n.locale = Localization.locale;

export default i18n;
