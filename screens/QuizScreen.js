import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Container, Button, Text, Content } from "native-base";
import CountdownTimer from "../components/Countdown";
import Quiz from "../components/Quiz";
import { quizData } from "../quizData/quizData";

const QuizScreen = props => {
  const [quizReady, setQuizReady] = useState(false);

  return (
    <Container style={{ width: "100%" }}>
      <Content contentContainerStyle={styles.screen}>
        {quizReady ? (
          <Quiz />
        ) : (
          <CountdownTimer
            size={200}
            until={3}
            onFinishCountdown={() => setQuizReady(true)}
          />
        )}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  }
});

export default QuizScreen;
