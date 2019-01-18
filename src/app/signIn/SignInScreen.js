import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
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
      <Container>
        <Text>Oi</Text>
      </Container>
    );
  }
}
