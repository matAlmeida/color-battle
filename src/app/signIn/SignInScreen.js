import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, StyleSheet, TouchableHighlight } from "react-native";
import { LinearGradient } from "expo";

import Layout from "@constants/Layout";
import { Container } from "@common";

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
          <Text>Oi</Text>
        </View>
        <TouchableHighlight
          style={styles.newAccountButton}
          onPress={() => console.log("Criar nova conta")}
        >
          <Text style={styles.newAccountText}>Criar conta com email</Text>
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
