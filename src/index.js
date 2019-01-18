import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Font } from "expo";

import Router from "./router";

class App extends React.Component {
  state = {
    fontLoaded: false
  };

  componentDidMount = async () => {
    await Font.loadAsync({
      coolvetica: require("@assets/fonts/coolvetica-rg.ttf")
    });

    this.setState({ fontLoaded: true });
  };

  render() {
    const { fontLoaded } = this.state;

    if (fontLoaded) {
      return <Router />;
    }

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00ffbb" />
      </View>
    );
  }
}

export default App;
