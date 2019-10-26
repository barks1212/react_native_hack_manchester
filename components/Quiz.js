import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { Container, Content } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import QuizItem from "./QuizItem";

const Quiz = props => {
  return (
    <Container>
      <Content contentContainerStyle={styles.screen}>
        <View style={styles.questionWrapper}>
          <Text style={styles.question}>
            How many hur durs does it take to hur dur in the hur dur?
          </Text>
        </View>
        <View style={styles.answerContainer}>
          <QuizItem color="red" title="Answer 1" onSelect={() => {}} />
          <QuizItem color="purple" title="Answer 2" onSelect={() => {}} />
          <QuizItem color="green" title="Answer 3" onSelect={() => {}} />
          <QuizItem color="yellow" title="Answer 4" onSelect={() => {}} />
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  questionWrapper: {
    paddingVertical: 50,
    paddingHorizontal: 30,
    width: "100%",
    justifyContent: "center",
    height: 200
  },
  question: {
    fontFamily: "Roboto-bold",
    textAlign: "center",
    fontSize: 25
  },
  answerContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  }
});

export default Quiz;
