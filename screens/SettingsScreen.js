import React from "react";
import PropTypes from "prop-types";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Switch,
  Picker
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
      changeColors,
      changeGraph
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
              onValueChange={freestyle => changeStyle(freestyle)}
              value={settings.freestyle}
            />
          </View>
          <View>
            <Text style={styles.header}>Jogar com 4 cores?</Text>
            <Switch
              style={styles.switch}
              onValueChange={fourcolors => changeColors(fourcolors)}
              value={settings.fourcolors}
            />
          </View>
          <View>
            <Text style={styles.header}>Escolha o Grafo</Text>
            <Picker
              selectedValue={settings.graphId}
              style={{ height: 50, width: 100 }}
              onValueChange={graphId => changeGraph(graphId)}
            >
              <Picker.Item label="Básico 1" value={1} />
              <Picker.Item label="Básico 2" value={2} />
              <Picker.Item label="Grande 1" value={3} />
              <Picker.Item label="Grande 2" value={4} />
            </Picker>
          </View>
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
