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
    Caviar: require("./assets/fonts/CaviarDreams.ttf"),
    "Caviar-italic": require("./assets/fonts/CaviarDreams_Italic.ttf"),
    "Caviar-bold": require("./assets/fonts/Caviar_Dreams_Bold.ttf"),
    Seaside: require("./assets/fonts/SEASRN__.ttf"),
    Raleway: require("./assets/fonts/Raleway-Regular.ttf"),
    "Raleway-italic": require("./assets/fonts/Raleway-Italic.ttf"),
    "Raleway-light": require("./assets/fonts/Raleway-Light.ttf"),
    "Raleway-light-italic": require("./assets/fonts/Raleway-LightItalic.ttf"),
    "Raleway-medium": require("./assets/fonts/Raleway-Medium.ttf"),
    "Raleway-bold": require("./assets/fonts/Raleway-Bold.ttf"),
    "Raleway-extra-bold": require("./assets/fonts/Raleway-ExtraBold.ttf"),
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
