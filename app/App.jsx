import React from 'react';
import {
  Image, Pressable, StyleSheet, Text, View,
} from 'react-native';

const styles = StyleSheet.create({
  app: {
    marginHorizontal: 'auto',
    marginVertical: 'auto',
  },
  img: {
    height: 80,
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginVertical: '1em',
    textAlign: 'center',
  },
});

const buttonStyles = StyleSheet.create({
  button: {
    borderRadius: 2,
  },
  text: {
    fontWeight: 'bold',
    padding: 8,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

const imgUri = 'data:image/svg+xml;utf8,<svg width="128" height="128" style="enable-background:new 0 0 128 128;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M39.11,79.56c-1.1,1.03-2.21-0.2-2.21-0.2S18.42,59.78,17.22,58.9c-1.69-1.23-5.31-3.16-8.93,0.57 c-1.51,1.55-3.97,5,0.6,10.56c0.99,1.2,29.78,31.54,31.46,33.18c0,0,13.3,12.94,21.35,17.81c2.23,1.35,4.74,2.78,7.67,3.78 c2.92,1,6.22,1.69,9.7,1.69c3.48,0.04,7.09-0.63,10.5-1.88c3.41-1.26,6.59-3.09,9.48-5.2c0.71-0.54,1.43-1.08,2.1-1.66l1.94-1.6 c1.35-1.13,2.61-2.32,3.82-3.53c2.43-2.42,4.62-5.01,6.55-7.66c1.92-2.66,3.55-5.41,4.85-8.15c1.3-2.74,2.21-5.49,2.76-8.09 c0.58-2.59,0.74-5.04,0.65-7.18c-0.02-2.14-0.45-3.97-0.8-5.43c-0.4-1.46-0.83-2.55-1.17-3.27c-0.33-0.72-0.51-1.1-0.51-1.1l0,0 c-0.46-1.29-0.9-2.52-1.29-3.63c-1.1-3.13-2.37-6.64-3.69-10.25c-0.56-1.53-0.82-2.22-0.82-2.22l0.01,0.03 c-4.85-13.17-10.06-26.74-10.06-26.74c-0.79-2.39-3.7-3.22-5.84-1.68c-6.18,4.44-8.07,10.92-5.89,17.83l5.59,15.32 c0.79,1.71-1.39,3.69-2.85,2.5c-4.59-3.74-14.3-14.05-14.3-14.05c-4.34-4.16-28.83-29.27-30.47-30.8 c-3.3-3.07-7.46-4.65-10.63-2.32c-3.24,2.38-4.14,6.06-1.01,10.08c0.85,1.09,25.6,27.24,25.6,27.24c1.44,1.51-0.26,3.65-1.85,2.18 c0,0-30.79-32.12-32.18-33.62c-3.15-3.42-8.21-4.17-11.21-1.35c-2.93,2.75-2.86,7.26,0.34,10.8c1.02,1.12,22.71,24.02,31.39,33.4 c0.58,0.63,1.03,1.47,0.17,2.26c-0.01,0.01-0.88,0.95-2-0.25c-2.36-2.52-25.93-27.08-27.24-28.41C18,35,13.96,33.55,10.71,36.53 c-2.96,2.71-3.44,7.44-0.04,10.78l28.55,30.18C39.22,77.49,40.15,78.59,39.11,79.56z" style="fill:#FAC036;"/><path d="M85.46,54.4l2.41,2.58c0,0-13.79,13.31-4.39,33.75c0,0,1.22,2.59-0.38,3.02c0,0-1.4,0.78-3-3.2 C80.1,90.54,70.61,71.13,85.46,54.4z" style="fill:#E48C15;"/></g><path d="M63.28,10.2 c0,0,5.81,0.88,11.19,6.64c5.38,5.77,7.87,13.18,7.87,13.18" style="fill:none;stroke:#444444;stroke-width:4;stroke-linecap:round;stroke-miterlimit:10;"/><path d="M77.44,3.5 c0,0,4.87,2.45,8.63,8.5c3.76,6.05,4.67,13.05,4.67,13.05" style="fill:none;stroke:#444444;stroke-width:4;stroke-linecap:round;stroke-miterlimit:10;"/><path d="M35.71,110.73 c0,0-5.86,0.39-12.35-4.09S12.84,95.46,12.84,95.46" style="fill:none;stroke:#444444;stroke-width:4;stroke-linecap:round;stroke-miterlimit:10;"/><path d="M31.53,120.56 c0,0-5.44,0.23-11.68-3.22s-10.44-9.12-10.44-9.12" style="fill:none;stroke:#444444;stroke-width:4;stroke-linecap:round;stroke-miterlimit:10;"/></svg>';

const bitch = () => {
  fetch('http://localhost:5000/read', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pass: 'value' }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('POST Request Data:', data);
    // Handle the response data after POST request
    })
    .catch((error) => {
      console.error('Error posting data:', error);
    });
};

function App() {
  return (
    <View style={styles.app}>
      <View style={styles.header}>
        <Image
          accessibilityLabel="Hi!"
          source={{ uri: imgUri }}
          resizeMode="contain"
          style={styles.img}
        />
      </View>
      <Text style={styles.title}>
        Are you alive ?
      </Text>
      <Pressable
        onPress={() => { bitch(); }}
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
  );
}

export default App;
