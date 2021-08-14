import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';

import { MOBILE_FLASH_CARDS_KEY } from "./api";
import { AsyncStorage } from "react-native";

const NOTIFICATION_KEY = `${MOBILE_FLASH_CARDS_KEY}:Notifications`;

export function createNotification() {
  return {
    title: "Mobile Flashcards",
    body: "Quiz yourself today!.",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true
    }
  };
}

export function clearLocalNotifications(){
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
  .then(() => {
    Notifications.cancelAllScheduledNotificationsAsync();
  });
}

export function setLocalNotifications(){
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(({status}) => {
          if(status === 'denied'){
          }

          if(status === 'granted'){
            Notifications.cancelAllScheduledNotificationsAsync()

            Notifications.setNotificationHandler({
              handleNotification: async () => ({
                shouldPlaySound: true,
                shouldShowAlert: true,
                shouldSetBadge: false
              })
            })
            
            Notifications.scheduleNotificationAsync({
              content: {
                title: "Mobile Flashcards",
                body: "Quiz yourself today!."
              },
              trigger: new Date(Date.now() + 5 * 1000)
            })

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
          }
        })
    })
}
