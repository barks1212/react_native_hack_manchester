import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const HomeScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>HomeScreen</Text>
      <Button
        title="To Quiz"
        onPress={() => {
          props.navigation.navigate("Quiz");
        }}
      />
    </View>
  );
};

HomeScreen.navigationOptions = {
  headerTitle: "Home"
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default HomeScreen;
