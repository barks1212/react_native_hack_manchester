import { ADD_GAMEID } from "./actions";

const initialState = {
  gameId: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_GAMEID:
      return {
        ...state,
        gameId: action.data.gameId
      };
  }
  return state;
};

export default reducer;
