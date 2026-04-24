import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

type NotificationToken = string | undefined;

interface NotificationData {
    [key: string]: any; 
}

interface ScheduleNotificationOptions {
    title: string;
    body: string;
    data?: NotificationData;
    trigger?: Notifications.NotificationTriggerInput;
}

async function schedulePushNotification({ title, body, data = {}, trigger = { seconds: 2 }}: ScheduleNotificationOptions): Promise<void> {
    await Notifications.scheduleNotificationAsync({
        content: {
            title, body, data
        },
        trigger
    });
}

async function registerForPushNotificationsAsync(): Promise<NotificationToken> {
    let token: NotificationToken;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }

        try {
            const projectId: string | undefined =
                Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
            if (!projectId) {
                throw new Error('Project ID not found');
            }
            token = (
                await Notifications.getExpoPushTokenAsync({
                    projectId,
                })
            ).data;
            console.log(token);
        } catch (e) {
            token = `${e}`;
        }
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token;
}

export { schedulePushNotification, registerForPushNotificationsAsync };
