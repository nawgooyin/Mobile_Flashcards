import * as Notifications from 'expo-notifications';

import { MOBILE_FLASH_CARDS_KEY } from "./api";
import { AsyncStorage } from "react-native";

const NOTIFICATION_KEY = `${MOBILE_FLASH_CARDS_KEY}:Notifications`;

export function clearLocalNotifications(){
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
  .then(() => {
    Notifications.cancelAllScheduledNotificationsAsync();
  });
}

export function setLocalNotifications(){
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(() => {
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
        trigger: {
          seconds: 60 * 60 * 24,
          repeats: true,
        }
      })

      AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
    }
  )
}
