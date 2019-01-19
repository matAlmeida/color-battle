import React from "react";
import { View, StyleSheet, Platform } from "react-native";

export default function Container({
  children,
  hasHeader = false,
  style = {},
  ...rest
}) {
  return (
    <View
      style={[styles.container, style, hasHeader && styles.hasHeader]}
      {...rest}
    >
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
  },
  hasHeader: {
    paddingTop: 0
  }
});
