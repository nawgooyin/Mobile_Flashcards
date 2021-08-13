import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

import { MOBILE_FLASHCARD_KEY } from "./api";
import { AsyncStorage } from "react-native";

const NOTIFICATION_KEY = `${MOBILE_FLASHCARD_KEY}:Notifications`;

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
        Notifications.cancelAllScheduledNotificationsAsync
    );
}

export function createNotification() {
    return {
        title: "Mobile Flashcards: Take your quiz today",
        body: "Don't forget to atleast do one quiz today.",
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

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then(data => {
        if (data === null) {
            Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
            if (status === "granted") {
                Notifications.cancelAllScheduledNotificationsAsync();

                let tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(5);
                tomorrow.setMinutes(0);

                Notifications.scheduleLocalNotificationAsync(createNotification(), {
                time: tomorrow,
                repeat: "day"
                });

                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
            });
        }
    }); 
}