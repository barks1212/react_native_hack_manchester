import React from "react";
import { useSelector } from "react-redux";
import get from "lodash/get";
import { View, Text, StyleSheet, Button } from "react-native";

const QuizSummaryScreen = props => {
  const calories = props.navigation.getParam("calories");

  const gameId = useSelector(state => get(state, "game.gameId"));
  return (
    <View style={styles.screen}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>YOU HAVE {calories} CALORIES TO SPEND</Text>
      </View>
      <Text>{gameId}</Text>
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
    alignItems: "center"
  },
  titleContainer: {
    marginVertical: 200
  },
  title: {
    textAlign: "center",
    fontFamily: "Roboto-bold",
    fontSize: 22
  }
});

export default QuizSummaryScreen;
