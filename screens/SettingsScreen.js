import React from "react";
import PropTypes from "prop-types";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Switch
} from "react-native";

export default class SettingsScreen extends React.Component {
  state = {
    player1: "Matheus",
    player2: "Icaro",
    freestyle: false,
    fourcolors: false
  };

  static navigationOptions = {
    title: "Configurações"
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.mainContainer}>
          <View>
            <Text style={styles.header}>Jogador 1:</Text>
            <TextInput
              style={styles.input}
              onChangeText={player1 => this.setState({ player1 })}
              value={this.state.player1}
              placeholder={this.props.placeholderTextPlayer}
              placeholderTextColor="#e2e2e2"
              underlineColorAndroid="transparent"
            />
          </View>
          <View>
            <Text style={styles.header}>Jogador 2:</Text>
            <TextInput
              style={styles.input}
              onChangeText={player2 => this.setState({ player2 })}
              value={this.state.player2}
              placeholder={this.props.placeholderTextPlayer}
              placeholderTextColor="#e2e2e2"
              underlineColorAndroid="transparent"
            />
          </View>
          <View>
            <Text style={styles.header}>Jogar no modo Livre?</Text>
            <Switch
              style={styles.switch}
              onValueChange={freestyle => this.setState({ freestyle })}
              value={this.state.freestyle}
            />
          </View>
          <View>
            <Text style={styles.header}>Jogar com 4 cores?</Text>
            <Switch
              style={styles.switch}
              onValueChange={fourcolors => this.setState({ fourcolors })}
              value={this.state.fourcolors}
            />
          </View>

          <TouchableOpacity style={styles.buttonContainer} onPress={() => {}}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Salvar</Text>
            </View>
          </TouchableOpacity>
        </View>
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
  mainContainer: {
    paddingHorizontal: 40,
    marginTop: 15
  },
  header: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: "bold"
  },
  input: {
    height: 80,
    fontSize: 25,
    borderBottomColor: "black",
    borderBottomWidth: 2
  },
  switch: {
    marginTop: -25
  },
  button: {
    marginTop: 20,
    width: 300,
    height: 100,
    backgroundColor: "#42f4c8",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    fontSize: 20,
    color: "black",
    textAlign: "center"
  },
  buttonContainer: {
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center"
  }
});

SettingsScreen.propTypes = {
  placeholderTextPlayer: PropTypes.string,
  defaultColor: PropTypes.string,
  paletteColors: PropTypes.arrayOf(PropTypes.string),
  selectedColor: PropTypes.string,
  turnColor: PropTypes.string,
  idleColor: PropTypes.string,
  player1Name: PropTypes.string,
  player2Name: PropTypes.string,
  freestyle: PropTypes.bool
};

SettingsScreen.defaultProps = {
  placeholderTextPlayer: "Nome do Jogador",
  defaultColor: "#e1e1e1",
  paletteColors: ["#E74C3C", "#9B59B6", "#2980B9"],
  paletteColors4: ["#E74C3C", "#9B59B6", "#2980B9", "#FFFF00"],
  selectedColor: "#919191",
  turnColor: "#42f4c8",
  idleColor: "#f2f2f2",
  player1Name: "Matheus",
  player2Name: "Ícaro",
  freestyle: false
};
