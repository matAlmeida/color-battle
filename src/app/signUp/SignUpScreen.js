import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LinearGradient } from "expo";
import { Formik } from "formik";
import * as Yup from "yup";

import Layout from "@constants/Layout";
import i18n from "@constants/i18n";
import { Container, TextInput, Button } from "@common";

export default class SignUpScreen extends Component {
  static navigationOptions = {
    header: null
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func
    }).isRequired
  };

  _handleSubmit = values => {
    console.log(values);
  };

  render() {
    return (
      <KeyboardAwareScrollView enableOnAndroid>
        <Container style={styles.container}>
          <LinearGradient
            colors={["#00edff", "#00ffbb"]}
            style={styles.gradientBackground}
            start={[1, 0]}
            end={[0, 1]}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>
              {i18n.t("screenTitle.newAccount")}
            </Text>
          </View>
          <View style={styles.contentConteiner}>
            <Formik
              ref={form => (this.form = form)}
              initialValues={{
                fullName: "",
                email: "",
                password: "",
                confirmedPassword: ""
              }}
              validationSchema={Yup.object().shape({
                fullName: Yup.string().required(i18n.t("error.requiredInput")),
                email: Yup.string()
                  .email(i18n.t("error.emailInvalid"))
                  .required(i18n.t("error.requiredInput")),
                password: Yup.string()
                  .min(8, i18n.t("error.passwordMinCharacters"))
                  .required(i18n.t("error.requiredInput")),
                confirmedPassword: Yup.string()
                  .oneOf([Yup.ref("password", null)])
                  .required(i18n.t("error.requiredInput"))
              })}
              onSubmit={this._handleSubmit}
              render={({
                values,
                handleSubmit,
                setFieldValue,
                setFieldTouched,
                isSubmitting,
                isValid
              }) => {
                return (
                  <React.Fragment>
                    <TextInput
                      name="fullName"
                      label={i18n.t("inputLabel.fullName")}
                      onChange={setFieldValue}
                      onTouch={setFieldTouched}
                      value={values.fullName}
                      placeholder={i18n.t("placeholder.fullNameInput")}
                      autoCapitalize="none"
                    />
                    <TextInput
                      name="email"
                      label={i18n.t("inputLabel.email")}
                      onChange={setFieldValue}
                      onTouch={setFieldTouched}
                      value={values.email}
                      placeholder={i18n.t("placeholder.emailInput")}
                      autoCapitalize="none"
                    />
                    <TextInput
                      name="password"
                      label={i18n.t("inputLabel.password")}
                      onChange={setFieldValue}
                      onTouch={setFieldTouched}
                      value={values.password}
                      placeholder={i18n.t("placeholder.passwordInput")}
                      autoCapitalize="none"
                      secureTextEntry
                    />
                    <TextInput
                      name="confirmedPassword"
                      label={i18n.t("inputLabel.confirmedPassword")}
                      onChange={setFieldValue}
                      onTouch={setFieldTouched}
                      value={values.confirmedPassword}
                      placeholder={i18n.t("placeholder.confirmedPasswordInput")}
                      autoCapitalize="none"
                      secureTextEntry
                    />
                    <Button
                      onPress={handleSubmit}
                      loading={isSubmitting}
                      title={i18n.t("buttonLabel.signUp")}
                      disabled={!isValid || isSubmitting}
                    />
                  </React.Fragment>
                );
              }}
            />
          </View>
        </Container>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between"
  },
  gradientBackground: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: Layout.window.height + 40
  },
  titleContainer: {
    height: 150,
    paddingVertical: 40
  },
  titleText: {
    fontFamily: "coolvetica",
    fontSize: 38
  },
  contentConteiner: {
    flex: 1
  },
  newAccountButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, .3)"
  },
  newAccountText: {
    color: "#FFF"
  }
});
