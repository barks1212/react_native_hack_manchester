import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const QuizSummaryScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>QuizSummaryScreen</Text>
      <Button
        title="To Shopping"
        onPress={() => {
          props.navigation.navigate("Shopping");
        }}
      />
    </View>
  );
};

QuizSummaryScreen.navigationOptions = {
  headerTitle: "Quiz Summary",
  headerLeft: null
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default QuizSummaryScreen;
