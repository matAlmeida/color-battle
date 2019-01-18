import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Input } from "react-native-elements";

import Layout from "@constants/Layout";

export default class TextInput extends Component {
  _handleChange = value => {
    this.props.onChange(this.props.name, value);
  };

  _handleTouch = () => {
    this.props.onTouch(this.props.name);
  };

  render() {
    const { value, ...rest } = this.props;
    return (
      <Input
        {...rest}
        value={value}
        containerStyle={styles.containerStyle}
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={styles.inputStyle}
        underlineColorAndroid="transparent"
        onChangeText={this._handleChange}
        onBlur={this._handleTouch}
        placeholderTextColor="#FFF"
        labelStyle={styles.labelStyle}
      />
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    marginVertical: 15,
    width: Layout.window.width * 0.9
  },
  inputStyle: {
    textAlign: "center",
    fontWeight: "bold"
  },
  inputContainerStyle: {
    borderBottomWidth: 2,
    borderWidth: 2,
    borderColor: "#FFF",
    borderRadius: 50,
    paddingVertical: 10
  },
  labelStyle: {
    color: "#000",
    alignSelf: "center",
    backgroundColor: "#FFF",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingHorizontal: 20
  }
});
