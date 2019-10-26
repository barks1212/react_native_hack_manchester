import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Container, Button, Text, Content } from "native-base";
import CountdownTimer from "../components/Countdown";

import { quizData } from "../quizData/quizData";

const QuizScreen = props => {
  const [quizReady, setQuizReady] = useState(false);

  return (
    <Container>
      <View style={styles.screen}>
        {quizReady ? (
          <Text>Im a quiz</Text>
        ) : (
          <CountdownTimer
            size={200}
            until={3}
            onFinishCountdown={() => setQuizReady(true)}
          />
        )}
      </View>
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

export default QuizScreen;
