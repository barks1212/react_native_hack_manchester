import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const ShoppingScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>ShoppingScreen</Text>
      <Button
        title="To Shopping Summary"
        onPress={() => {
          props.navigation.navigate("ShoppingSummary");
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

export default ShoppingScreen;
