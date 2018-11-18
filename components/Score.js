import React, { Component } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Svg } from "expo";
import Layout from "../constants/Layout";

export default class Score extends Component {
  render() {
    return (
      <View style={styles.scoreBoard}>
        <View style={styles.player}>
          <Svg height={86} width={86}>
            <Svg.Circle
              cx={43}
              cy={43}
              r={40}
              strokeWidth={2.5}
              stroke="#919191"
              fill="#f2f2f2"
            />
            <Svg.Text
              x="43"
              y="53"
              fontSize="32"
              fonWeight="bold"
              textAnchor="middle"
              scale="1"
            >
              1
            </Svg.Text>
          </Svg>
          <Text style={styles.playerText}>Matheus</Text>
        </View>
        <View style={styles.player}>
          <Svg height={86} width={86}>
            <Svg.Circle
              cx={43}
              cy={43}
              r={40}
              strokeWidth={2.5}
              stroke="#919191"
              fill="#f2f2f2"
            />
            <Svg.Text
              x="43"
              y="53"
              fontSize="32"
              fonWeight="bold"
              textAnchor="middle"
              scale="1"
            >
              1
            </Svg.Text>
          </Svg>
          <Text style={styles.playerText}>Gabriel</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c2c2c2"
  },
  scoreBoard: {
    // position: "absolute",
    // bottom: 0,
    // left: 0,
    // right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#c2c2c2",
    padding: 20
  },
  player: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  playerText: {
    marginHorizontal: 10,
    fontSize: 20
  }
});
