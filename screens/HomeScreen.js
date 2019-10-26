import React from "react";
import { View, StyleSheet } from "react-native";
import { Container, Button, Text, Content } from "native-base";

const HomeScreen = props => {
  return (
    <Container>
      <Content contentContainerStyle={styles.screen}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>SUPERMARKET SWEEP</Text>
        </View>
        <View style={styles.menuContainer}>
          <Button
            full
            success
            onPress={() => {
              props.navigation.navigate("Quiz");
            }}
          >
            <Text style={styles.buttonText}>New Game</Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center"
  },
  logoContainer: {
    flex: 1,
    marginVertical: 200,
    width: "100%",
    alignItems: "center"
  },
  logo: {
    fontFamily: "Roboto-bold",
    fontSize: 22
  },
  menuContainer: {
    flex: 1,
    width: "100%"
  },
  buttonText: {
    fontFamily: "Roboto-bold",
    fontSize: 18
  }
});

export default HomeScreen;
