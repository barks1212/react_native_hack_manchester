import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Dimensions
} from "react-native";
import CountdownTimer from "../components/Countdown";
import Question from "../components/Question";
import { quizData } from "../quizData/quizData";
import { addGameId } from "../store/actions";

const QuizScreen = props => {
  const dispatch = useDispatch();
  const [gameId, setGameId] = useState();
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

  const countdownFinishHandler = answerCount => {
    const calorieCount = answerCount * 250;
    dispatch(addGameId(calorieCount));
    props.navigation.navigate("QuizSummary", { calories: calorieCount });
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/background.png")}
        style={styles.bgImg}
        resizeMode="cover"
      >
        <Question question={question} setAnswer={setAnswer} />
        <View style={styles.bottom}>
          <View>
            <Text style={styles.text}>{`${correctAnswersTotal *
              250} Calories`}</Text>
          </View>
          <View>
            <CountdownTimer
              until={20}
              size={60}
              onFinishCountdown={() =>
                countdownFinishHandler(correctAnswersTotal)
              }
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
//

const styles = StyleSheet.create({
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",

    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 2,
    borderTopColor: "black"
  },
  bgImg: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontFamily: "Caviar-bold",
    fontSize: 30
  }
});

export default QuizScreen;
