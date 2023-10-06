import { StatusBar } from 'expo-status-bar';
import { useLayoutEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, SafeAreaView,Platform } from 'react-native';
import React, { useEffect, useState, navigation } from 'react';
import MenuBackArrow from '../../components/menubackarrow/menubackarrow'
import * as Notifications from 'expo-notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

export default function Notification(props) {
  const { navigation } = props;
  const [token, setToken] = useState('');
  const [title, setTitle] = useState('');
  const [bodydec, setBodydec] = useState('');
  const [notificationData, setNotificationData] = useState(null);
  const headerHeight = Platform.OS === 'android' ? (width >= 720 ? 120 : 100) : 120;

  const data = [{}]

  useEffect(() => {
    const getToken = async () => {
      try {
        let data =await AsyncStorage.getItem('notificationstatus')  
        data = await JSON.parse(data)
        if (data.status === true) {
          setToken(data.token);
        } else {
          console.log('Notification permission denied');
        }
      } catch (error) {
        console.error('Error requesting permission:', error);
      }
    };

    getToken();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuBackArrow
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerTitle: () => (
        <View style={{
          display: "flex",
          flexDirection: "row",
          width: "100%"
        }}>
          <Text style={{
            textAlign: "center",
            fontSize: 25, fontWeight: "700", width: "100%"
          }}>Notification</Text>
        </View>
      ),
      headerStyle: {
        height: headerHeight // Increase the header height here
    },


    });
  }, []);

  const sendNotification = async () => {
    try {
      await axios.post("http://10.0.2.2:4000/getNotification",bodydec).then((res)=>{console.log(res);})

      console.log('Notification sent successfully');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };
  const sendAllNotification = async () => {
    try {
      await axios.post("http://10.0.2.2:4000/getNotification",bodydec).then((res)=>{console.log(res);})


      console.log('Notification sent successfully');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      const { title, body } = notification.request.content;
      // setNotifucationData([title,body])
      console.log(title, body);
      // Update state with notification data
      setNotificationData({ title, body });

      data.push(notificationData)
      console.log(data);
      // Display the notification in the Expo app using Expo's built-in notification UI
      Notifications.presentNotificationAsync({
        title: title,
        body: body,
      });
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      {notificationData && (
        <View style={styles.notificationContainer}>
          <Text style={styles.notificationTitle}>Received Notification:</Text>
          <Text style={{ width: '100%' }}>{notificationData.title}</Text>
          <Text>{notificationData.body}</Text>
        </View>
      )}
      <SafeAreaView style={{ width: '90%' }}>
        <TextInput
          style={styles.input}
          onChangeText={setTitle}
          placeholder="Title"
        />
        <TextInput
          style={styles.input}
          onChangeText={setBodydec}
          placeholder="Body"
        />
      </SafeAreaView>

      <TouchableOpacity
        style={{ backgroundColor: 'gray', padding: 10, borderRadius: 5 }}
        onPress={sendNotification}
      >
        <Text style={{ color: 'white' }}>Send Notification</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ backgroundColor: 'gray', padding: 10, marginTop: 20, borderRadius: 5 }}
        onPress={sendAllNotification}
      >
        <Text style={{ color: 'white' }}>Send All Notification</Text>
      </TouchableOpacity>

      {/* {/ Render notification data /} */}


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
    marginTop: 12,
    marginBottom: 12,
    width: '100%',
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  notificationContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    width: '96%',
    marginLeft: '1%',
    borderColor: 'gray',
  },
  notificationTitle: {
    fontWeight: 'bold',
  },
});
