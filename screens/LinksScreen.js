import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Svg, Icon } from "expo";
import ColorPalette from "react-native-color-palette";
import Layout from "../constants/Layout";
import Score from "../components/Score";
// import { ExpoLinksView } from '@expo/samples';

export default class LinksScreen extends React.Component {
  constructor(props) {
    super(props);

    const whoStart =
      parseInt(
        Math.random()
          .toString()
          .slice(2, 3)
      ) % 2;

    this.state = {
      paletteVisible: false,
      selectedNode: undefined,
      nodes: [
        {
          label: 1,
          pos: [5, 0],
          links: [2, 6, 7, 9],
          color: "#e1e1e1"
        },
        {
          label: 2,
          pos: [9, 0],
          links: [3, 9],
          color: "#e1e1e1"
        },
        {
          label: 3,
          pos: [9, 4],
          links: [4, 9],
          color: "#e1e1e1"
        },
        {
          label: 4,
          pos: [6, 7],
          links: [5, 8],
          color: "#e1e1e1"
        },
        {
          label: 5,
          pos: [2, 5],
          links: [6, 7, 8],
          color: "#e1e1e1"
        },
        {
          label: 6,
          pos: [0, 1],
          links: [7],
          color: "#e1e1e1"
        },
        {
          label: 7,
          pos: [2, 3],
          links: [8],
          color: "#e1e1e1"
        },
        {
          label: 8,
          pos: [5, 5],
          links: [9],
          color: "#e1e1e1"
        },
        {
          label: 9,
          pos: [7, 2],
          links: [],
          color: "#e1e1e1"
        }
      ],
      scoreProps: {
        player1: {
          points: 0,
          turn: whoStart == 0,
          name: "Matheus"
        },
        player2: {
          points: 0,
          turn: whoStart == 1,
          name: "Gabriel"
        },
        turnColor: "#42f4c8",
        idleColor: "#f2f2f2"
      },
      remainingNodes: 9
    };
  }

  static navigationOptions = {
    title: "Color Battle"
  };

  _onNodePress = label => {
    const newNodes = this.state.nodes.map(node => {
      if (node.label === label && !node.lock) {
        const toggle = this.state.selectedNode == label ? undefined : label;
        const color = toggle ? "#919191" : "#e1e1e1";

        this.setState({
          selectedNode: toggle,
          paletteVisible: toggle ? true : false
        });

        return { ...node, color };
      } else {
        return {
          ...node,
          color: node.color == "#919191" ? "#e1e1e1" : node.color
        };
      }
    });

    this.setState({ nodes: newNodes });
  };

  _colorSelect = color => {
    const newNodes = this.state.nodes.map(node => {
      if (node.label === this.state.selectedNode) {
        return { ...node, color, lock: true };
      }
      return { ...node };
    });

    this.setState({
      nodes: newNodes,
      paletteVisible: false,
      remainingNodes: (this.state.remainingNodes -= 1)
    });

    this._togglePlayerTurn();
  };

  _cleanOneNode = label => {
    const newNodes = this.state.nodes.map(node => {
      if (node.label === label) {
        return { ...node, color: "#e1e1e1", lock: false };
      }
      return { ...node };
    });

    this.setState({
      nodes: newNodes,
      remainingNodes: (this.state.remainingNodes += 1)
    });
  };

  _togglePlayerTurn = () => {
    let { player1, player2 } = this.state.scoreProps;

    if (player1.turn) {
      player1.turn = false;
      player2.turn = true;
    } else {
      player1.turn = true;
      player2.turn = false;
    }

    const newScore = {
      ...this.state.scoreProps,
      player1,
      player2
    };

    this.setState({ scoreProps: newScore });
  };

  _pointToPlayerOne = () => {
    const { points, turn, name } = this.state.scoreProps.player1;

    const newScore = {
      ...this.state.scoreProps,
      player1: { points: points + 1, turn, name }
    };

    this.setState({
      scoreProps: newScore
    });
  };

  _pointToPlayerTwo = () => {
    const { points, turn, name } = this.state.scoreProps.player2;

    const newScore = {
      ...this.state.scoreProps,
      player2: { points: points + 1, turn, name }
    };

    this.setState({
      scoreProps: newScore
    });
  };

  renderNodes() {
    const nodes = this.state.nodes;
    const nodeRadius = (Layout.window.width / 9 - 10) / 2;
    const multiplier = 9 + 1.4 * nodeRadius;

    return nodes.map(node => {
      return (
        <Svg.Circle
          key={node.label}
          cx={node.pos[0] * multiplier + nodeRadius * 2.8}
          cy={node.pos[1] * multiplier + nodeRadius * 2.8}
          r={nodeRadius}
          strokeWidth={2.5}
          stroke="#919191"
          fill={node.color}
          onPressIn={() => this._onNodePress(node.label)}
          onLongPress={() => this._cleanOneNode(node.label)}
        />
      );
    });
  }

  renderEdges() {
    const nodes = this.state.nodes;
    const nodeRadius = (Layout.window.width / 9 - 10) / 2;
    const multiplier = 9 + 1.4 * nodeRadius;

    const lines = nodes.map(node => {
      return node.links.map(link => {
        return (
          <Svg.Line
            key={node.label + link}
            x1={node.pos[0] * multiplier + nodeRadius * 2.8}
            y1={node.pos[1] * multiplier + nodeRadius * 2.8}
            x2={nodes[link - 1].pos[0] * multiplier + nodeRadius * 2.8}
            y2={nodes[link - 1].pos[1] * multiplier + nodeRadius * 2.8}
            stroke="gray"
            strokeWidth="2"
          />
        );
      });
    });

    return lines;
  }

  resetColor() {
    const reseted = this.state.nodes.map(node => {
      return { ...node, color: "#e1e1e1" };
    });

    this.setState({ nodes: reseted, remainingNodes: 9 });
  }

  givePoints = () => {
    this.resetColor();

    if (!this.state.scoreProps.player1.turn) {
      this._pointToPlayerOne();
    } else {
      this._pointToPlayerTwo();
    }
  };

  render() {
    if (this.state.remainingNodes == 0) {
      this.givePoints();
    }

    return (
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <Svg height={Layout.window.width} width={Layout.window.width}>
            {this.renderEdges()}
            {this.renderNodes()}
          </Svg>
        </View>
        {!this.state.paletteVisible && <Score {...this.state.scoreProps} />}
        {this.state.paletteVisible && (
          <ColorPalette
            onChange={this._colorSelect}
            defaultColor={"#E74C3C"}
            colors={["#E74C3C", "#9B59B6", "#2980B9", "#FFFF00"]}
            title={"-"}
            icon={
              <Icon.Ionicons
                name="ios-checkmark-circle-outline"
                size={25}
                color="black"
              />
            }
          />
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
