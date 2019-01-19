import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";

import { Container } from "@common";

import i18n from "@constants/i18n";

export default class MainScreen extends Component {
  render() {
    return (
      <Container>
        <Text style={styles.titleText}>
          {i18n
            .t("greeting.homeScreen", { firstName: "Matheus" })
            .toLowerCase()}
        </Text>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontFamily: "coolvetica",
    fontSize: 34
  }
});
