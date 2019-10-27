import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";
import { useSelector } from "react-redux";
import get from "lodash/get";
import axios from "axios";

const getSummary = (gameId, setSummaryCb) => {
  if (!gameId) return;

  // axios.post(`https://supermarketsweep.azurewebsites.net/game/finishGame/${gameId}`,
  axios
    .post(
      `https://supermarketsweep.azurewebsites.net/game/finishGame/${gameId}`
    )
    .then(response => {
      if (response.data) {
        console.log("------ finishGame response ---------", response.data);
      }

      setSummaryCb(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
};

const getLeaderBoard = () => {
  axios.get("https://supermarketsweep.azurewebsites.net/game/leaderboard");
};

const onPurchase = gameId => {
  console.log("hit purchase button: ", gameId);
  // axios.post(`https://supermarketsweep.azurewebsites.net/game/purchase/${gameId}`,
  axios
    .post(`https://supermarketsweep.azurewebsites.net/game/purchase/${gameId}`)
    .then(response => {
      if (response.data) {
        console.log("------ purchase response ---------", response.data);
      }
    })
    .catch(function(error) {
      console.log(error);
    });
};
//
const ShoppingSummaryScreen = props => {
  const [summary, setSummary] = useState();

  const gameId = useSelector(state => get(state, "game.gameId"));

  useEffect(() => {
    getSummary(gameId, setSummary);
  }, [gameId]);

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.bgImg}
      resizeMode="cover"
    >
      <View style={styles.screen}>
        {summary && (
          <View style={styles.summary}>
            <Text style={styles.text}>Score: {get(summary, "score")}</Text>
            <Text style={styles.text}>
              Allotted Calories: {get(summary, "allowedCalories")}
            </Text>
            <Text style={styles.text}>
              Calories Used: {get(summary, "totalCalories")}
            </Text>
            <Text style={styles.text}>
              Total donated items: {get(summary, "totalDonatedItems")}
            </Text>
            <Text style={styles.text}>
              Total Spend: {get(summary, "totalCost")}
            </Text>
          </View>
        )}
        <View style={styles.purchaseButton}>
          <TouchableOpacity
            style={styles.customButton}
            onPress={() => {
              onPurchase(gameId);
              props.navigation.popToTop();
            }}
          >
            <Text style={styles.buttonText}>PURCHASE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dale}>
          <Image
            fadeDuration={750}
            source={require("../assets/dale-winton.jpg")}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  bgImg: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  summary: {
    height: 350,
    backgroundColor: "white",
    justifyContent: "space-around",
    alignItems: "center",
    width: "75%",
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "black"
  },
  text: {
    fontFamily: "Caviar-bold",
    fontSize: 22
  },
  purchaseButton: {
    marginTop: 30,
    width: "100%",
    alignItems: "center"
  },
  customButton: {
    width: "50%",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D57900",
    padding: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5
  },
  buttonText: {
    fontFamily: "Caviar-bold",
    fontSize: 30
  },
  image: {
    height: "100%",
    width: "100%"
  },
  dale: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: 40,
    backgroundColor: "white"
  }
});

export default ShoppingSummaryScreen;
