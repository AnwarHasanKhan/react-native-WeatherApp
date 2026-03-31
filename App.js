import React, { useEffect } from 'react';
import Main from './src/Main/Main';
import { Alert, PermissionsAndroid, View, Text } from 'react-native';
import {
  getMessaging,
  onMessage,
  getToken,
} from '@react-native-firebase/messaging';

const App = () => {
  const messagingInstance = getMessaging();

  useEffect(() => {
    requestPermissionAndroid();
  }, []);

  const requestPermissionAndroid = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      getFcmToken();
    } else {
      Alert.alert('Permission Denied!');
    }
  };

  useEffect(() => {
    const unsubscribe = onMessage(messagingInstance, async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  const getFcmToken = async () => {
    const token = await getToken(messagingInstance);
    console.log('FCM Token:', token);
  };

  return (
    <Main />
  );
};

export default App;
