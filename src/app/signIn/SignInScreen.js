import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, StyleSheet, TouchableHighlight } from "react-native";
import { LinearGradient } from "expo";
import { Formik } from "formik";
import * as Yup from "yup";

import Layout from "@constants/Layout";
import i18n from "@constants/i18n";
import { Container, TextInput } from "@common";

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
              password: "senha123"
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email()
                .required(),
              password: Yup.string()
                .min(8)
                .required()
            })}
            render={({ values, setFieldValue, setFieldTouched }) => {
              return (
                <React.Fragment>
                  <TextInput
                    name="email"
                    label={i18n.t("email")}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    value={values.email}
                    placeholder={i18n.t("emailInputPlaceholder")}
                  />
                  <TextInput
                    name="password"
                    label={i18n.t("password")}
                    onChange={setFieldValue}
                    onTouch={setFieldTouched}
                    value={values.password}
                    placeholder={i18n.t("passwordInputPlaceholder")}
                    secureTextEntry
                  />
                </React.Fragment>
              );
            }}
          />
        </View>
        <TouchableHighlight
          style={styles.newAccountButton}
          onPress={() => console.log("Criar nova conta")}
        >
          <Text style={styles.newAccountText}>{i18n.t("newAccount")}</Text>
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
