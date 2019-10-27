import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const QuizScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>QuizScreen</Text>
      <Button
        title="To Quiz Summary"
        onPress={() => {
          props.navigation.navigate("QuizSummary")
        }}
      />
    </View>
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
