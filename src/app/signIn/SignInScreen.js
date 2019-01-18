import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, Image, View, StyleSheet } from "react-native";
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
        <Image
          source={require("@assets/images/logo-color-battle.png")}
          resizeMode="center"
          style={styles.image}
        />
        <View style={styles.contentConteiner}>
          <Text>Oi</Text>
        </View>
        <View style={styles.newAccount}>
          <Text>Criar conta com email -></Text>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between"
  },
  image: {
    height: 150,
    paddingVertical: 20
  },
  contentConteiner: {
    flex: 1
  },
  newAccount: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, .5)"
  }
});
