import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableNativeFeedback
} from "react-native";

const QuizItem = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.gridItem}>
      <TouchableCmp style={{ flex: 1 }} onPress={props.onSelect}>
        <View
          style={{ ...styles.container, ...{ backgroundColor: props.color } }}
        >
          <Text numberOfLines={2} style={styles.title}>
            {props.title}
          </Text>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    minWidth: 150,
    borderRadius: 10,
    elevation: 5,
    overflow:
      Platform.OS === "android" && Platform.Version >= 21 ? "hidden" : "visible"
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    padding: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontFamily: "Caviar-bold",
    fontSize: 20,
    textAlign: "center"
  }
});

export default QuizItem;
