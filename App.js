import React, { useState } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Container, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";

const fetchFonts = () =>
  Font.loadAsync({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
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
    <Container>
      <Text>Open up App.js to start working on your app!</Text>
    </Container>
  );
}
