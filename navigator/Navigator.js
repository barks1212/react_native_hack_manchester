import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import {
  HomeScreen,
  QuizScreen,
  QuizSummaryScreen,
  ShoppingScreen,
  ShoppingSummaryScreen
} from "../screens";

const Navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Quiz: QuizScreen,
    QuizSummary: QuizSummaryScreen,
    Shopping: ShoppingScreen,
    ShoppingSummary: ShoppingSummaryScreen
  },
  {
    defaultNavigationOptions: {
      headerShown: false
    }
  }
);

export default createAppContainer(Navigator);
