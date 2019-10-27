import React from "react";
import CountDown from "react-native-countdown-component";

const CountdownTimer = props => {
  return (
    <CountDown
      style={{
        borderRadius: 150,
        overflow: "hidden",
        width: 140,
        height: 140,
        borderWidth: 2,
        borderColor: "black"
      }}
      until={props.until}
      size={props.size}
      onFinish={props.onFinishCountdown}
      digitStyle={{ backgroundColor: "#D57900" }}
      digitTxtStyle={{ color: "white" }}
      timeToShow={["S"]}
      timeLabels={{ s: "SS" }}
    />
  );
};

export default CountdownTimer;
