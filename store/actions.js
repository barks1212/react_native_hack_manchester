import axios from "axios";
export const ADD_GAMEID = "ADD_GAMEID";

export const addGameId = calorieCount => {
  return dispatch => {
    axios
      .post("https://supermarketsweep.azurewebsites.net/game/create", {
        calories: calorieCount
      })
      .then(response => {
        dispatch({ type: ADD_GAMEID, data: { gameId: response.data.gameId } });
      });
  };
};
