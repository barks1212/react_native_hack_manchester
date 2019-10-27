import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import get from 'lodash/get'
import axios from 'axios'

const ShoppingSummaryScreen = props => {
  const [summary, setSummary] = useState()
  console.log('in summary screen')
  setSummary(getSummary())

  const getSummary = () => {
    axios.post('http://localhost:60616/game/finishGame/',
      {
        gameId: "ea626bbd-4604-427f-a4eb-0391178157af"

      })
      .then((response) => {

        if (response.data) {
          console.log('------ finishGame response ---------', response.data)
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  return (
    <View style={styles.screen}>
      <Text>ShoppingSummaryScreen</Text>
      <Button
        title="Back to home"
        onPress={() => {
          props.navigation.popToTop();
        }}
      />

      {summary && <>
        <Text>Player: {get(summary, 'username')}</Text>

        {get(summary, 'basketItems').map(item => {
          return (
            <View>
              <Text>Item: {item.productName}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <Text>Donated to foodbank: {item.isDonation}</Text>
              <Text>Total Calories: {item.totalCalories}</Text>
              <Text>Total Cost: {item.totalCost}</Text>
            </View>
          )

        })}

        <Text>Score: {get(summary, 'score')}</Text>
        <Text>Allotted Calories: {get(summary, 'allowedCalories')}</Text>
        <Text>Calories Used: {get(summary, 'totalCalories')}</Text>
        <Text>Total donated items: {get(summary, 'totalDonatedItems')}</Text>
        <Text>Total Spend: {get(summary, 'totalCost')}</Text>
      </>}


    </View>

    /*
    "gameId": "05e75d4c-e148-4e18-9f6e-6242ab75d708",
  "username": null,
  "totalCalories": 645,
  "allowedCalories": 2471,
  "totalDonatedItems": 4,
  "basketItems": [
    {
      "productName": "Pataks Rogan Josh Paste Pots 2X70g",
      "quantity": 4,
      "isDonation": true,
      "calories": 197,
      "totalCalories": 645,
      "totalCost": 9.12,
      "unitCost": 2.28
    }
  ],
  "totalBonusCalories": 0,
  "totalBonusItems": 0
    */
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ShoppingSummaryScreen;
