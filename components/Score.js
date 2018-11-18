import React, { Component } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Svg } from "expo";

export default class Score extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: {
        points: 0,
        turn: true
      },
      player2: {
        points: 0,
        turn: false
      },
      turnColor: "#42f4c8",
      staleColor: "#f2f2f2"
    };
  }

  render() {
    const { player1, player2, turnColor, staleColor } = this.state;

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
              fill={player1.turn ? turnColor : staleColor}
            />
            <Svg.Text
              x="43"
              y="53"
              fontSize="32"
              fonWeight="bold"
              textAnchor="middle"
              scale="1"
            >
              {player1.points}
            </Svg.Text>
          </Svg>
          <View style={styles.textContainer}>
            <Text style={styles.whatPlayerText}>Jogador 1</Text>
            <Text style={styles.playerText}>Matheus</Text>
          </View>
        </View>
        <View style={styles.player}>
          <Svg height={86} width={86}>
            <Svg.Circle
              cx={43}
              cy={43}
              r={40}
              strokeWidth={2.5}
              stroke="#919191"
              fill={player2.turn ? turnColor : staleColor}
            />
            <Svg.Text
              x="43"
              y="53"
              fontSize="32"
              fonWeight="bold"
              textAnchor="middle"
              scale="1"
            >
              {player2.points}
            </Svg.Text>
          </Svg>
          <View style={styles.textContainer}>
            <Text style={styles.whatPlayerText}>Jogador 2</Text>
            <Text style={styles.playerText}>Gabriel</Text>
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
