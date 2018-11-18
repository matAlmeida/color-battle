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
      ]
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

    this.setState({ nodes: newNodes, paletteVisible: false });
  };

  _cleanOneNode = label => {
    const newNodes = this.state.nodes.map(node => {
      if (node.label === label) {
        return { ...node, color: "#e1e1e1", lock: false };
      }
      return { ...node };
    });

    this.setState({ nodes: newNodes });
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
    const reseted = this.nodes.map(node => {
      return { ...node, color: "#e1e1e1" };
    });

    this.setState({ nodes: reseted });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <Svg height={Layout.window.width} width={Layout.window.width}>
            {this.renderEdges()}
            {this.renderNodes()}
          </Svg>
        </View>
        <Score />
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
