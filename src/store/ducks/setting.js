import { createActions, createReducer } from "reduxsauce";

export const { Types, Creators } = createActions({
  changePlayer1: ["name"],
  changePlayer2: ["name"],
  changeStyle: ["freestyle"],
  changeColors: ["fourcolors"],
  changeGraph: ["graphId"]
});

const INITIAL_STATE = {
  player1: "Jogador A",
  player2: "Jogador B",
  freestyle: false,
  fourcolors: false,
  graphId: 1
};

const changePlayer1 = (state = INITIAL_STATE, action) => ({
  ...state,
  player1: action.name
});
const changePlayer2 = (state = INITIAL_STATE, action) => ({
  ...state,
  player2: action.name
});
const changeStyle = (state = INITIAL_STATE, action) => ({
  ...state,
  freestyle: action.freestyle
});
const changeColors = (state = INITIAL_STATE, action) => ({
  ...state,
  fourcolors: action.fourcolors
});
const changeGraph = (state = INITIAL_STATE, action) => ({
  ...state,
  graphId: action.graphId
});

export default createReducer(INITIAL_STATE, {
  [Types.CHANGE_PLAYER1]: changePlayer1,
  [Types.CHANGE_PLAYER2]: changePlayer2,
  [Types.CHANGE_STYLE]: changeStyle,
  [Types.CHANGE_COLORS]: changeColors,
  [Types.CHANGE_GRAPH]: changeGraph
});
