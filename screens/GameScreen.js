import React from "react";
import PropTypes from "prop-types";
import { View, ScrollView, StyleSheet } from "react-native";
import { Svg, Icon } from "expo";
import ColorPalette from "react-native-color-palette";
import Layout from "../constants/Layout";
import Score from "../components/Score";
// import { ExpoLinksView } from '@expo/samples';

// Api Wrapper
import { getGraph } from "../wrappers/api";

GameScreen.propTypes = {
  defaultColor: PropTypes.string,
  paletteColors: PropTypes.arrayOf(PropTypes.string),
  selectedColor: PropTypes.string,
  turnColor: PropTypes.string,
  idleColor: PropTypes.string,
  player1Name: PropTypes.string,
  player2Name: PropTypes.string
};

GameScreen.defaultProps = {
  defaultColor: "#e1e1e1",
  paletteColors: ["#E74C3C", "#9B59B6", "#2980B9", "#FFFF00"],
  selectedColor: "#919191",
  turnColor: "#42f4c8",
  idleColor: "#f2f2f2",
  player1Name: "Matheus",
  player2Name: "Ícaro"
};

export default class GameScreen extends React.Component {
  constructor(props) {
    super(props);
    const { turnColor, idleColor, player1Name, player2Name } = props;

    const whoStart =
      parseInt(
        Math.random()
          .toString()
          .slice(2, 3)
      ) % 2;

    this.state = {
      paletteVisible: false,
      selectedNode: undefined,
      scoreProps: {
        player1: {
          points: 0,
          turn: whoStart == 0,
          name: player1Name
        },
        player2: {
          points: 0,
          turn: whoStart == 1,
          name: player2Name
        },
        turnColor,
        idleColor
      },
      remainingNodes: 9
    };
  }

  componentWillMount = () => {
    const { defaultColor, paletteColors } = this.props;

    const nodes = getGraph();

    const newNodes = nodes.map(node => {
      return {
        ...node,
        color: defaultColor,
        paletteColors: paletteColors
      };
    });

    this.setState({ newNodes });
  };

  static navigationOptions = {
    title: "Color Battle"
  };

  _onNodePress = label => {
    const { selectedColor, defaultColor } = this.props;

    const newNodes = this.state.nodes.map(node => {
      if (node.label === label && !node.lock) {
        const toggle = this.state.selectedNode == label ? undefined : label;
        const color = toggle ? selectedColor : defaultColor;

        this.setState({
          selectedNode: toggle,
          paletteVisible: toggle ? true : false
        });

        return { ...node, color };
      } else {
        return {
          ...node,
          color: node.color == selectedColor ? defaultColor : node.color
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
    if (this.state.remainingNodes == 0) {
      this.givePoints();
    }
  };

  _cleanOneNode = label => {
    const { defaultColor } = this.props;
    const newNodes = this.state.nodes.map(node => {
      if (node.label === label) {
        return { ...node, color: defaultColor, lock: false };
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
    const { selectedColor } = this.props;
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
          stroke={selectedColor}
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
    const { paletteColors } = this.props;
    const { paletteVisible, scoreProps } = this.state;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <Svg height={Layout.window.width} width={Layout.window.width}>
            {this.renderEdges()}
            {this.renderNodes()}
          </Svg>
        </View>
        {!paletteVisible && <Score {...scoreProps} />}
        {paletteVisible && (
          <ColorPalette
            onChange={this._colorSelect}
            defaultColor={paletteColors[0]}
            colors={paletteColors}
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
