import React, { Component } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Svg } from "expo";
import Layout from "../constants/Layout";

export default class Score extends Component {
  render() {
    const { player1, player2, turnColor, idleColor } = this.props;
    const nodeRadius = (Layout.window.width / 9 - 10) / 2 + 5;

    return (
      <View style={styles.scoreBoard}>
        <View style={styles.player}>
          <Svg height={(nodeRadius + 3) * 2} width={(nodeRadius + 3) * 2}>
            <Svg.Circle
              cx={nodeRadius + 3}
              cy={nodeRadius + 3}
              r={nodeRadius}
              strokeWidth={2.5}
              stroke="#919191"
              fill={player1.turn ? turnColor : idleColor}
            />
            <Svg.Text
              x={nodeRadius + 3}
              y={nodeRadius + 3 + 10}
              fontSize={nodeRadius + 3}
              fonWeight="bold"
              textAnchor="middle"
              scale="1"
            >
              {player1.points}
            </Svg.Text>
          </Svg>
          <View style={styles.textContainer}>
            <Text style={styles.whatPlayerText}>Jogador 1</Text>
            <Text style={styles.playerText}>{player1.name}</Text>
          </View>
        </View>
        <View style={styles.player}>
          <Svg height={(nodeRadius + 3) * 2} width={(nodeRadius + 3) * 2}>
            <Svg.Circle
              cx={nodeRadius + 3}
              cy={nodeRadius + 3}
              r={nodeRadius}
              strokeWidth={2.5}
              stroke="#919191"
              fill={player2.turn ? turnColor : idleColor}
            />
            <Svg.Text
              x={nodeRadius + 3}
              y={nodeRadius + 3 + 10}
              fontSize={nodeRadius + 3}
              fonWeight="bold"
              textAnchor="middle"
              scale="1"
            >
              {player2.points}
            </Svg.Text>
          </Svg>
          <View style={styles.textContainer}>
            <Text style={styles.whatPlayerText}>Jogador 2</Text>
            <Text style={styles.playerText}>{player2.name}</Text>
          </View>
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
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 35
  },
  player: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  textContainer: {
    marginHorizontal: 10
  },
  whatPlayerText: {
    fontSize: 16
  },
  playerText: {
    fontSize: 26
  }
});
