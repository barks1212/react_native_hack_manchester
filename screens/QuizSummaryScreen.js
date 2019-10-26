import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const QuizSummaryScreen = props => {
  const calories = props.navigation.getParam("calories");
  return (
    <View style={styles.screen}>
      <Text>YOU HAVE {calories} CALORIES</Text>
      <Button
        title="To Shopping"
        onPress={() => {
          props.navigation.navigate("Shopping");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default QuizSummaryScreen;
