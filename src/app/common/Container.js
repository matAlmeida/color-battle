import React from "react";
import { View, StyleSheet, Platform } from "react-native";

export default function Container({ children, ...rest }) {
  return (
    <View style={styles.container} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      android: {
        paddingTop: 25
      }
    }),
    flex: 1,
    alignItems: "center"
  }
});
