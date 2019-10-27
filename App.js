import React, { useState } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import Navigator from "./navigator/Navigator";
import reducer from "./store/reducer";

const rootReducer = combineReducers({
  game: reducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () =>
  Font.loadAsync({
    "Roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
    ...Ionicons.font
  });

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading startAsync={fetchFonts} onFinish={() => setIsReady(true)} />
    );
  }

  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
