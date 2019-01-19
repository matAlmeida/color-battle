import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";

export default function CButton({
  title,
  onPress,
  loading,
  disabled,
  ...rest
}) {
  return (
    <Button
      onPress={onPress}
      loading={loading}
      title={title}
      disabled={disabled}
      {...rest}
      buttonStyle={styles.buttonStyle}
      titleStyle={styles.buttonTitleStyle}
      containerStyle={styles.buttonContainerStyle}
    />
  );
}

const styles = StyleSheet.create({
  buttonTitleStyle: {
    color: "#000"
  },
  buttonContainerStyle: {
    marginVertical: 20,
    borderRadius: 50,
    backgroundColor: "#FFF"
  },
  buttonStyle: {
    paddingVertical: 10,
    borderRadius: 50,
    backgroundColor: "#FFF",
    elevation: 0
  }
});
