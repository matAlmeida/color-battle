import React from "react";
import PropTypes from "prop-types";
import {
  View,
  ScrollView,
  StyleSheet,
  Modal,
  TouchableHighlight,
  Text,
  Platform
} from "react-native";
import { Svg, Icon } from "expo";
import ColorPalette from "react-native-color-palette";
import Layout from "../constants/Layout";
import Score from "../components/Score";

// Api Wrapper
import { getGraph, getLinks } from "../wrappers/api";

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
      hasWinner: 0, // 0 - no, 1 - player1, 2 - player2
      showModal: false,
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
      }
    };
  }

  componentWillMount = () => {
    const { defaultColor, paletteColors } = this.props;

    const nodes = getGraph();
    const checkLinks = getLinks(nodes);

    const newNodes = nodes.map(node => {
      return {
        ...node,
        color: defaultColor,
        paletteColors: paletteColors
      };
    });

    this.setState({ nodes: newNodes, remainingNodes: nodes.length });
  };

  static navigationOptions = {
    title: "Color Battle"
  };

  _onNodePress = label => {
    const { selectedColor, defaultColor } = this.props;
    const { nodes, selectedNode } = this.state;

    const newNodes = nodes.map(node => {
      if (node.label === label && !node.lock) {
        const toggle = selectedNode == label ? undefined : label;
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
    const { nodes, selectedNode, remainingNodes } = this.state;

    const newNodes = nodes.map(node => {
      if (node.label === selectedNode) {
        return { ...node, color, lock: true };
      }
      return { ...node };
    });

    this.setState({
      nodes: newNodes,
      paletteVisible: false,
      remainingNodes: remainingNodes - 1
    });

    this._togglePlayerTurn();
    if (remainingNodes - 1 == 0) {
      this.givePoints();
    }
  };

  _cleanOneNode = label => {
    const { defaultColor } = this.props;
    const { nodes, remainingNodes } = this.state;

    const newNodes = nodes.map(node => {
      if (node.label === label) {
        return { ...node, color: defaultColor, lock: false };
      }
      return { ...node };
    });

    this.setState({
      nodes: newNodes,
      remainingNodes: remainingNodes + 1
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
    const scoreProps = this.state.scoreProps;
    const player1 = scoreProps.player1;

    const newScore = {
      ...scoreProps,
      player1: { ...player1, points: player1.points + 1 }
    };

    this.setState({
      scoreProps: newScore
    });
  };

  _pointToPlayerTwo = () => {
    const scoreProps = this.state.scoreProps;
    const player2 = scoreProps.player2;

    const newScore = {
      ...scoreProps,
      player2: { ...player2, points: player2.points + 1 }
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
      return { ...node, color: "#e1e1e1", lock: false };
    });

    this.setState({ nodes: reseted, remainingNodes: reseted.length });
  }

  _willHaveAWinner = () => {
    const { player1, player2 } = this.state.scoreProps;
    const bo = 2;

    if (!player1.turn && player1.points + 1 == bo) {
      return 1;
    } else if (!player2.turn && player2.points + 1 == bo) {
      return 2;
    }

    return 0;
  };

  givePoints = () => {
    this.resetColor();
    const willHaveAWinner = this._willHaveAWinner();

    if (willHaveAWinner) {
      this.setState({ hasWinner: willHaveAWinner, showModal: true });
    } else {
      if (!this.state.scoreProps.player1.turn) {
        this._pointToPlayerOne();
      } else {
        this._pointToPlayerTwo();
      }
    }
  };

  restartGame = () => {
    this.resetColor();

    const whoStart =
      parseInt(
        Math.random()
          .toString()
          .slice(2, 3)
      ) % 2;

    this.setState({
      hasWinner: 0,
      showModal: false,
      scoreProps: {
        ...this.state.scoreProps,
        player1: {
          ...this.state.scoreProps.player1,
          points: 0,
          turn: whoStart == 0
        },
        player2: {
          ...this.state.scoreProps.player2,
          points: 0,
          turn: whoStart == 1
        }
      }
    });
  };

  render() {
    const { paletteColors } = this.props;
    const { paletteVisible, scoreProps, showModal, hasWinner } = this.state;
    return (
      <ScrollView style={styles.container}>
        <Modal
          animationType="slide"
          transparent
          visible={showModal}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalCard}>
              <View>
                {hasWinner && (
                  <Text style={styles.modalText1}>
                    {scoreProps[`player${hasWinner}`].name} Ganhou!
                  </Text>
                )}
              </View>
              <TouchableHighlight
                onPress={() => {
                  this.restartGame();
                }}
              >
                <View style={styles.modalButtonContainer}>
                  <Text style={styles.modalButtonText}>Restart the Game</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

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
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)"
  },
  modalCard: {
    justifyContent: "center",
    alignItems: "center",
    height: Layout.window.height * 0.5,
    width: Layout.window.width * 0.8,
    backgroundColor: "#42f4c8",
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.75,
        shadowRadius: 2
      },
      android: {
        elevation: 40
      }
    })
  },
  modalText1: {
    fontSize: 30,
    color: "black",
    textAlign: "center"
  },
  modalButtonContainer: {
    marginTop: 20,
    width: 300,
    height: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  modalButtonText: {
    fontSize: 20,
    color: "black",
    textAlign: "center"
  }
});

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
