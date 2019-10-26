import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Container, Content } from "native-base";
import CountDown from "react-native-countdown-component";

const CountdownTimer = props => {
  return (
    <Container>
      <Content contentContainerStyle={styles.screen}>
        <CountDown
          until={props.until}
          size={props.size}
          onFinish={props.onFinishCountdown}
          digitStyle={{ backgroundColor: "#FFF" }}
          digitTxtStyle={{ color: "#1CC625" }}
          timeToShow={["S"]}
          timeLabels={{ s: "" }}
        />
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default CountdownTimer;
