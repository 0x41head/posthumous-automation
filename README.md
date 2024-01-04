I have always been fascinated by the concept of communication “after” death and I do not mean it in a spiritual or pseudo-science kind of way, but more like “if you are reading this I am probably dead” kind of scenario.

Traditionally, people used physical wills to relay their final words, but in this digital age, it has started taking the form of video messages or texts, passed on to a trusted confidant.

As 20 something year old, I have nothing of significance to give in will (maybe my 10 years old DVD of G-force?). I also don’t have money to hire a lawyer to execute my will.
<!-- excerpt -->
But I still want to be able to send messages to my friends and family in case of an untimely death. So, I did what any software engineer would do i.e. **_automation_**. 


___

# How does this acually work ?

This project can be divided into two steps:

1. Measuring the probability of my death at any given time

2. Executing automated processes after my passing

The latter isn’t that difficult. What I want to focus on is the former.

Below, you'll find a system architecture diagram elucidating how this entire system functions:
![System Arch](https://raw.githubusercontent.com/0x41head/btsht/main/src/posts/2024/1/images/sys-arch.png)

Simply put, I'm required to press a button on my app daily to update my database

If I fail to do so within 24 hours, I assume the likelihood of my demise has increased. 

I've set a buffer of 30 days; which means that if I don't send a curl command to my server within this timeframe, I presume myself dead. Each day without pressing the button increments the likelihood of my death by 3.33% (given by 100/30) and after an entire month without any activity, the system presumes I am deceased and runs the automation defined in step 2.

## Tech Stack

Nothing too complicated here. I wanted to complete this project over a weekend so I used a tech stack I was already familiar with.

- App: React Native
- Server: Node
- Database: Redis

_is RERN a thing?_

## The Database:

This was the simplest part of the project. I used a simple Redis database, containg a single key-value pair that stores my last active status.

## The App

Again, nothing too complicated here—just a button that when pressed triggers an API call that updates my database, containing my latest active status.

```js
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

function App() {
  const password = process.env.EXPO_PUBLIC_PASSWORD;

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
          onPress={() => { updateDB(password); }}
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

```

![App SS](https://raw.githubusercontent.com/0x41head/btsht/main/src/posts/2024/1/images/ss.jpg)

I also added a local notification that gets sent to my app, 24 hours after my last button press.

```js
const onButtonPress = (password) => {
  updateDB(password);
  if (Platform.OS !== 'web') {
    //Cancel existing scheduled notifications
    Notifications.cancelAllScheduledNotificationsAsync();
    //Schedule new notification that triggers 24 hours from now 
    schedulePushNotification();
  }
};
```

## Server

The most critical part of this application lies here.

I had to somehow let my server know that I was, in fact, dead. This is where me being terminally online comes into play. Considering my online activity, if I haven't checked my email or the app despite all the notifications, it's highly likely that I'm either dead or stranded on a remote island with no network, which considering my physical attributes also means I am dead

A scheduled task, executed every day at 00:00, retrieves my last activity status from the database and calculates the elapsed time. If I haven't pressed the app button in the last seven days, it shoots an email to me, with a cURL command (the same one the app uses). This precautionary step is in case I lose my phone or if I can no longer get the app to work.

```js
cron.schedule('0 0 * * *', async () => {
    if(dead){
        // Closes the serverwhen I die
        process.exit()
    }
    console.log('Running a task every day!');
    const whenWasTheDBLastUpdated = await redisClient.get('last update');
    const dbDateCovertedToDateObject= new Date(whenWasTheDBLastUpdated).getTime()
    const currentDateTime = new Date().getTime();
    
    //Conversion from milliseconds to days
    const numberOfDaysFromLastResponse = ((currentDateTime-dbDateCovertedToDateObject)/86400000).toFixed(0)

    // DId I really die or I am stuck on a place with no internet. Probably the former
    if(numberOfDaysFromLastResponse>30){
        // Webhooks to deploy if I die 
        sendEmail(process.env.PRIMARY_MAIL,"I am dead","delete my browser history");
        dead=true;
    }

    if(numberOfDaysFromLastResponse>7){
        const emailBody="If yes, use this: \n "+ process.env.COMMAND_TO_CURL
        sendEmail(process.env.PRIMARY_MAIL,"Are You Alive?",emailBody);
    }
});
```

## Containerization + hosting

I dockerized the backend with redis.

```yaml
version: '3.8'
services:
  redis-server: 
    container_name: redis-server
    image: 'redis'
  
  backend:
    container_name: backend
    build:
      context: ./server
      dockerfile: Dockerfile 
    ports:
      - "5000:5000"
    depends_on:
      - redis-server
```

___
# Future

This was a fun project I made over the course of a week. I had a bunch of other approaches that I considered for this project, but soon realized that I lacked either the time, funds, or experience to pursue them. Below, you'll find a list of some of those ideas:

- Using a smart watch to check my pulse and update the db once or twice a day.
- Creating a script updating my activity each time I boot up my laptop or perform an action on my phone.
- Putting a nanochip in my heart to check when it stops pumping blood.
