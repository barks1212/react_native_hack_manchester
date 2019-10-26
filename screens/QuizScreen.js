import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import CountdownTimer from "../components/Countdown";
import Question from "../components/Question";
import { quizData } from "../quizData/quizData";

const QuizScreen = props => {
  const [quizReady, setQuizReady] = useState(false);
  const [availableQuestions, setAvailableQuestions] = useState(
    quizData.map(x => x)
  );
  const [question, setQuestion] = useState(
    availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
  );
  const [index, setIndex] = useState();
  const [answer, setAnswer] = useState("");
  const [correctAnswersTotal, setCorrectAnswersTotal] = useState(4);

  useEffect(() => {
    if (question && question.correctAnswer === answer)
      setCorrectAnswersTotal(correctAnswersTotal + 1);

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selectedQuestion = availableQuestions[randomIndex];

    setQuestion(selectedQuestion);
    setIndex(randomIndex);
  }, [answer]);

  useEffect(() => {
    const newQuestions = availableQuestions.filter(q => q !== question);
    setAvailableQuestions(newQuestions);
  }, [index]);

  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <Question question={question} setAnswer={setAnswer} />
      <View style={styles.bottom}>
        <View style={styles.count}>
          <Text style={styles.text}>{`${correctAnswersTotal *
            250} Calories`}</Text>
        </View>
        <View>
          <CountdownTimer
            until={30}
            size={35}
            onFinishCountdown={() =>
              props.navigation.navigate("QuizSummary", {
                calories: correctAnswersTotal * 250
              })
            }
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "blue",
    marginVertical: 30,
    paddingHorizontal: 20
  },
  count: {
    flexDirection: "column"
  },
  text: {
    fontFamily: "Roboto-bold",
    fontSize: 22
  }
});

export default QuizScreen;
