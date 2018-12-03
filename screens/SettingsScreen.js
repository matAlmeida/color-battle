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
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as SettingsActions } from "../store/ducks/setting";

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Configurações"
  };

  render() {
    const {
      settings,
      changePlayer1,
      changePlayer2,
      changeStyle,
      changeColors
    } = this.props;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.mainContainer}>
          <View>
            <Text style={styles.header}>Jogador 1:</Text>
            <TextInput
              style={styles.input}
              onChangeText={name => changePlayer1(name)}
              value={settings.player1}
              placeholder={this.props.placeholderTextPlayer}
              placeholderTextColor="#e2e2e2"
              underlineColorAndroid="transparent"
            />
          </View>
          <View>
            <Text style={styles.header}>Jogador 2:</Text>
            <TextInput
              style={styles.input}
              onChangeText={name => changePlayer2(name)}
              value={settings.player2}
              placeholder={this.props.placeholderTextPlayer}
              placeholderTextColor="#e2e2e2"
              underlineColorAndroid="transparent"
            />
          </View>
          <View>
            <Text style={styles.header}>Jogar no modo Livre?</Text>
            <Switch
              style={styles.switch}
              onChangeText={freestyle => changeStyle(freestyle)}
              value={settings.freestyle}
            />
          </View>
          <View>
            <Text style={styles.header}>Jogar com 4 cores?</Text>
            <Switch
              style={styles.switch}
              onChangeText={fourcolors => changeColors(fourcolors)}
              value={settings.fourcolors}
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

const mapStateToProps = state => ({
  settings: state.settings
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(SettingsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);

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
