import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers/decks";
import middleware from "./middleware";
import { setLocalNotification } from "./utils/notifications";
import { createStackNavigator } from "react-navigation-stack";
import Deck from "./components/Deck";
import NewCard from "./components/NewCard";
import Quiz from "./components/Quiz";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Decks from "./components/Decks";
import NewDeck from "./components/NewDeck";

const Tabs = createBottomTabNavigator(
  {
    Decks: {
      screen: Decks
    },
    New_Deck: {
      screen: NewDeck
    }
  },
  {
    navigationOptions: {
      header: () => null
    },
    tabBarOptions: {
      activeTintColor: 'blue',
      inactiveTintColor: 'black',
      style: {
        height: 40
      }
    }
  }
);

const Stacks = createStackNavigator(
  {
    Decks: {
      screen: Tabs
    },
    Deck: {
      screen: Deck,
      path: "Deck"
    },
    NewCard: {
      screen: NewCard,
      path: "NewCard"
    },
    Quiz: {
      screen: Quiz,
      path: "Quiz"
    }
  },
  {
    initialRouteName: "Decks"
  }
);

const store = createStore(reducer, middleware);
const Navigation = createAppContainer(Stacks);

export default class App extends Component {
  componentDidMount() {
    //setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <StatusBar />
          <Navigation />
        </View>
      </Provider>
    );
  }
}
