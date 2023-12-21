import React, { useEffect, useRef, useState } from 'react';
import {
  Image, Pressable, StyleSheet, Text, View, Platform, TextInput,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';
import { registerForPushNotificationsAsync, schedulePushNotification } from './handlers/notification';

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: 110,
    width: 100,
    position: 'relative',
    margin: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: '1em',
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

const buttonStyles = StyleSheet.create({
  button: {
    borderRadius: 2,
    margin: 10,
    width: 100,
  },
  text: {
    fontWeight: 'bold',
    padding: 8,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

const updateDB = (password) => {
  fetch(process.env.EXPO_PUBLIC_BACKEND_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pass: password }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('POST Request Data:', data);
      Toast.show('Request sent successfully.', {
        duration: Toast.durations.LONG,
      });
    })
    .catch((error) => {
      console.error('Error posting data:', error);
      Toast.show('Request failed to send.', {
        duration: Toast.durations.LONG,
      });
    });
};

const onButtonPress = (password) => {
  updateDB(password);
  if (Platform.OS !== 'web') {
    Notifications.cancelAllScheduledNotificationsAsync();
    schedulePushNotification();
  }
};

function App() {
  const password = process.env.EXPO_PUBLIC_PASSWORD;

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <RootSiblingParent>
      <View style={styles.app}>
        <Image
          accessibilityLabel="Hi!"
          source={require('./assets/hi.png')}
          style={styles.img}
        />
        <Text style={styles.title}>
          Are you alive ?
        </Text>
        <Pressable
          onPress={() => { onButtonPress(password); }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? '#fff' : '#2196F3',
            },
            buttonStyles.button,
          ]}
        >
          {({ pressed }) => (
            <Text style={[{
              color: pressed ? '#2196F3' : '#fff',
            }, buttonStyles.text]}
            >
              Yes
            </Text>
          )}
        </Pressable>
      </View>
    </RootSiblingParent>

  );
}

export default App;
