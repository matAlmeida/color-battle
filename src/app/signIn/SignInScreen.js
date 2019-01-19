import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, StyleSheet, TouchableHighlight } from "react-native";
import { LinearGradient } from "expo";
import { StackActions, NavigationActions } from "react-navigation";
import { Formik } from "formik";
import * as Yup from "yup";

import Layout from "@constants/Layout";
import i18n from "@constants/i18n";
import { Container, TextInput, Button } from "@common";

export default class SignInScreen extends Component {
  static navigationOptions = {
    header: null
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func
    }).isRequired
  };

  _handleSignIn = values => {
    console.log(values);
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: "Main" })]
    });

    setTimeout(() => this.props.navigation.dispatch(resetAction), 1500);
  };

  _handleSignUp = () => {
    this.props.navigation.navigate("SignUp");
  };

  render() {
    return (
      <Container style={styles.container}>
        <LinearGradient
          colors={["#00edff", "#00ffbb"]}
          style={styles.gradientBackground}
          start={[1, 0]}
          end={[0, 1]}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>color battle</Text>
        </View>
        <View style={styles.contentConteiner}>
          <Formik
            ref={form => (this.form = form)}
            initialValues={{
              email: "",
              password: ""
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email(i18n.t("error.emailInvalid"))
                .required(i18n.t("error.requiredInput")),
              password: Yup.string()
                .min(8, i18n.t("error.passwordMinCharacters"))
                .required(i18n.t("rerror.equiredInput"))
            })}
            onSubmit={this._handleSignIn}
            render={({
              values,
              handleSubmit,
              setFieldValue,
              setFieldTouched,
              isSubmitting,
              isValid,
              errors,
              touched
            }) => {
              return (
                <React.Fragment>
                  <TextInput
                    name="email"
                    label={i18n.t("inputLabel.email")}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    value={values.email}
                    placeholder={i18n.t("placeholder.emailInput")}
                    autoCapitalize="none"
                    errorMessage={touched.email && errors.email}
                  />
                  <TextInput
                    name="password"
                    label={i18n.t("inputLabel.password")}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    value={values.password}
                    placeholder={i18n.t("placeholder.passwordInput")}
                    autoCapitalize="none"
                    errorMessage={touched.password && errors.password}
                    secureTextEntry
                  />
                  <Button
                    onPress={handleSubmit}
                    loading={isSubmitting}
                    title={i18n.t("buttonLabel.signIn")}
                    disabled={!isValid || isSubmitting}
                  />
                </React.Fragment>
              );
            }}
          />
        </View>
        <TouchableHighlight
          style={styles.newAccountButton}
          onPress={this._handleSignUp}
        >
          <Text style={styles.newAccountText}>
            {i18n.t("buttonLabel.newAccount")}
          </Text>
        </TouchableHighlight>
      </Container>
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
    height: Layout.window.height
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
