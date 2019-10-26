import React from "react";
import CountDown from "react-native-countdown-component";

const CountdownTimer = props => {
  return (
    <CountDown
      style={{ borderRadius: 100, overflow: "hidden", width: 80, height: 80 }}
      until={props.until}
      size={props.size}
      onFinish={props.onFinishCountdown}
      digitStyle={{ backgroundColor: "#FFF" }}
      digitTxtStyle={{ color: "#1CC625" }}
      timeToShow={["S"]}
      timeLabels={{ s: "" }}
    />
  );
};

export default CountdownTimer;
