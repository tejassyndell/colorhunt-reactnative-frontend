import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button,TextInput,SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';

export default function Notification() {
  const [token, setToken] = useState('');
  const [title, setTitle] = useState('');
  const [bodydec, setbodydec] = useState('');

  console.log('title',title);
  console.log('dec..',bodydec);
  useEffect(() => {
    const getToken = async () => {
      try {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status === 'granted') {
          const pushToken = (await Notifications.getExpoPushTokenAsync()).data;
          console.log('Expo Push Token:', pushToken);
          setToken(pushToken);
        } else {
          console.log('Notification permission denied');
        }
      } catch (error) {
        console.error('Error requesting permission:', error);
      }
    };

    getToken();
  }, []);

  const sendNotification = async () => {
    try {
      await fetch('http://10.0.2.2:8020/getNotification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registrationToken: token,
          title: title,
          body: bodydec,
        }),
      });
      console.log('Notification sent successfully');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        const { title, body } = notification.request.content;
        console.log('Notification Title:', title);
        console.log('Notification Body:', body);
        // Display the notification in the Expo app using Expo's built-in notification UI
        Notifications.presentNotificationAsync({
          title: title,
          body: body,
        });
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={setTitle}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={setbodydec}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
    </SafeAreaView>
      <Button title="Send Notification" onPress={sendNotification} />
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

