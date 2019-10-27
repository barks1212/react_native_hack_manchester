import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import QuizItem from "./QuizItem";

const Question = props => {
  return (
    <View style={styles.screen}>
      <View style={styles.questionWrapper}>
        <Text style={styles.question}>{props.question.question}</Text>
      </View>
      <View style={styles.answerContainer}>
        <QuizItem
          color="red"
          title={props.question.answers[0]}
          onSelect={() => props.setAnswer(props.question.answers[0])}
        />
        <QuizItem
          color="purple"
          title={props.question.answers[1]}
          onSelect={() => props.setAnswer(props.question.answers[1])}
        />
        <QuizItem
          color="green"
          title={props.question.answers[2]}
          onSelect={() => props.setAnswer(props.question.answers[2])}
        />
        <QuizItem
          color="yellow"
          title={props.question.answers[3]}
          onSelect={() => props.setAnswer(props.question.answers[3])}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    width: Dimensions.get("window").width,
    backgroundColor: "yellow"
  },
  questionWrapper: {
    marginTop: 50,
    paddingHorizontal: 30,
    width: "90%",
    justifyContent: "center",
    minHeight: 150,
    backgroundColor: "green"
  },
  question: {
    fontFamily: "Roboto-bold",
    textAlign: "center",
    fontSize: 22
  },
  answerContainer: {
    marginTop: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "purple",
    width: "100%"
  }
});

export default Question;
