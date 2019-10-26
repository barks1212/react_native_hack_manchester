import React, { useState } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import Navigator from "./navigator/Navigator";

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

  return <Navigator />;
}
