import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';

import PushNotification from 'react-native-push-notification';
import * as Notifications from 'expo-notifications';

export default function Notification() {
  const [token, setToken] = useState('');

  useEffect(() => {
    // Define channel options
    const channelOptions = {
      name: 'Colorhunt app', // Descriptive name
      description: 'Test', // Description
      priority: Notifications.AndroidNotificationPriority.HIGH, // High priority
      sound: true, // Enable sound
      vibrate: true, // Enable vibration
    };

    // Create the notification channel
    Notifications.setNotificationChannelAsync('colorhunt', channelOptions)
      .then(() => {
        console.log('Notification channel created');
      })
      .catch((error) => {
        console.error('Error creating notification channel:', error);
      });
  }, []);

  const getNotification = async (registrationToken) => {
    try {
      const tokenData = {
        registrationToken: registrationToken,
      };
      const response = await axios.post('http://10.0.2.2:8020/getNotification', tokenData);
      console.log('Notification sent successfully:', response.data);
    } catch (err) {
      console.error('Error sending notification:', err);
    }
  };

  const requestUserPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        return true;
      } else {
        console.log('Permission denied');
        return false;
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
      return false;
    }
  };

  const pushNotificationsss = async () => {
    const isPermissionGranted = await requestUserPermission();

    if (isPermissionGranted) {
      try {
        const remoteToken = await messaging().getToken();
        console.log('FCM Token:', remoteToken);
        // setToken(remoteToken);
        // getNotification(remoteToken);
      } catch (error) {
        console.error('Error getting FCM token:', error);
      }

      // Check whether an initial notification is available
      messaging()
        .getInitialNotification()
        .then(async (remoteMessage) => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification
            );
          }
        });
      
      // Assume a message-notification contains a "type" property in the data payload of the screen to open
      messaging().onNotificationOpenedApp(async (remoteMessage) => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification
        );
      });

      // Register background handler
      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log('Message handled in the background!', remoteMessage);
      });

      // Listen for incoming FCM messages
      const unsubscribe = messaging().onMessage(async (remoteMessage) => {
        // Display the notification using PushNotification
        PushNotification.localNotification({
          channelId: 'colorhunt',
          title: remoteMessage.notification.title,
          message: remoteMessage.notification.body,
        });
      });

      return unsubscribe;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{token}</Text>
      <Button title="Click Me" onPress={pushNotificationsss} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
