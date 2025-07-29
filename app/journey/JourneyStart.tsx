import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { BlurView } from 'expo-blur';
import { useState, useEffect } from 'react';
import { Button, Snackbar, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const JourneyStart = () => {
  const [location, setLocation] = useState(null);
  const [started, setStarted] = useState(false);
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  const startJourney = async () => {
    const timestamp = Date.now();
    const journeyId = `journey_${timestamp}`;
    setStarted(true);
    setVisible(true);

    const journeyData = {
      journeyId,
      timestamp,
      coords: location,
    };

    await AsyncStorage.setItem(journeyId, JSON.stringify(journeyData));
    router.push({
      pathname: '/timeline',
      params: { journeyId },
    });
  };

  return (
    <>
      <LinearGradient
        colors={['#FFE29A', '#FFA99F']}
        style={{ position: 'absolute', top: 0, width: '100%', height: '100%', zIndex: -1 }}
        start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }}
      />
      {location && (
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={location}
            title="You're here!"
            description={`Lat: ${location.latitude}, Lon: ${location.longitude}`}
            pinColor="#FF5D73"
          />
        </MapView>
      )}
      <BlurView intensity={70} tint="dark" style={{ position: 'absolute', bottom: 50, width: '100%', padding: 20 }}>
        <Button
          mode="contained"
          onPress={startJourney}
          contentStyle={{ paddingVertical: 8 }}
        >
          Start My Journey
        </Button>
      </BlurView>
      {started && (
        <Text style={{ position: 'absolute', bottom: 110, alignSelf: 'center', color: '#fff', fontSize: 16 }}>
          “Every journey begins with a bold step.”
        </Text>
      )}
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={3000}
      >
        Journey started. Track safely 👣
      </Snackbar>
    </>
  );
};

export default JourneyStart;