import React from "react";
import { View, StyleSheet } from "react-native";
import { Container, Button, Text, Content } from "native-base";

import { quizData } from "../quizData/quizData";

const QuizScreen = props => {
  return (
    <Container>
      <View style={styles.screen}>
        <Text>QuizScreen</Text>
        <Button
          title="To Quiz Summary"
          onPress={() => {
            props.navigation.navigate("QuizSummary");
          }}
        />
      </View>
    </Container>
  );
};

QuizScreen.navigationOptions = {
  headerTitle: "Quiz"
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default QuizScreen;
