import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Svg } from "expo";
import Layout from "../constants/Layout";
// import { ExpoLinksView } from '@expo/samples';

export default class LinksScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
    title: "Links"
  };

  renderNodes() {
    const nodes = this.state.nodes;

    return nodes.map(node => {
      return (
        <Svg.Circle
          key={node.label}
          cx={node.pos[0] * 50 + 75}
          cy={node.pos[1] * 50 + 75}
          r={40}
          strokeWidth={2.5}
          stroke="#919191"
          fill={node.color}
        />
      );
    });
  }

  renderEdges() {
    const nodes = this.state.nodes;

    const lines = nodes.map(node => {
      return node.links.map(link => {
        return (
          <Svg.Line
            key={node.label + link}
            x1={node.pos[0] * 50 + 75}
            y1={node.pos[1] * 50 + 75}
            x2={nodes[link - 1].pos[0] * 50 + 75}
            y2={nodes[link - 1].pos[1] * 50 + 75}
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
        <Svg height={Layout.window.width} width={Layout.window.width}>
          {this.renderEdges()}
          {this.renderNodes()}
        </Svg>
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
