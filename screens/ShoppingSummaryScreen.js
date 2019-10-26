import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const ShoppingSummaryScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>ShoppingSummaryScreen</Text>
      <Button
        title="Back to home"
        onPress={() => {
          props.navigation.popToTop();
        }}
      />
    </View>
  );
};

ShoppingSummaryScreen.navigationOptions = {
  headerTitle: "Shopping Summary",
  headerLeft: null
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ShoppingSummaryScreen;
