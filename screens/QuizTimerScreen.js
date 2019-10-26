import React from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import CountDown from "react-native-countdown-component";

const CountdownTimer = props => {
  return (
    <View style={styles.screen}>
      <CountDown
        size={150}
        until={3}
        onFinish={() => props.navigation.navigate("Quiz")}
        digitStyle={{ backgroundColor: "#FFF" }}
        digitTxtStyle={{ color: "#1CC625" }}
        timeToShow={["S"]}
        timeLabels={{ s: "" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: Dimensions.get("window").height,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50
  }
});

export default CountdownTimer;
