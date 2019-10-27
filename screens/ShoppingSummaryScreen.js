import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useSelector } from 'react-redux'
import get from 'lodash/get'
import axios from 'axios'

const getSummary = (gameId, setSummaryCb) => {
  if (!gameId)
    return

  axios.post(`https://supermarketsweep.azurewebsites.net/game/finishGame/${gameId}`,
    // axios.post(`https://supermarketsweep.azurewebsites.net/game/finishGame/b5c94b67-5f4b-4a25-a119-82aa3d4c3bae`,
  )
    .then((response) => {

      if (response.data) {
        console.log('------ finishGame response ---------', response.data)
      }

      setSummaryCb(response.data)
    })
    .catch(function (error) {
      console.log(error);
    })
}

const getLeaderBoard = () => {
  axios.get('https://supermarketsweep.azurewebsites.net/game/leaderboard')
}

const onPurchase = (gameId) => {
  console.log('hit purchase button: ', gameId)
  // axios.post(`https://supermarketsweep.azurewebsites.net/game/purchase/${gameId}`,
  axios.post(`https://supermarketsweep.azurewebsites.net/game/purchase/${gameId}`,

  )
    .then((response) => {
      if (response.data) {
        console.log('------ purchase response ---------', response.data)
      }
    })
    .catch(function (error) {
      console.log(error);
    })
}
//
const ShoppingSummaryScreen = props => {
  const [summary, setSummary] = useState()
  console.log('in summary screen')

  const gameId = useSelector(state => get(state, 'game.gameId'))

  useEffect(() => {
    getSummary(gameId, setSummary)
  }, [gameId])

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

      <Button
        title="Purchase"
        onPress={() => {
          onPurchase(gameId)

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

export default ShoppingSummaryScreen;
