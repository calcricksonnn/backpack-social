import { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Tracker() {
  const [coords, setCoords] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [active, setActive] = useState(true);
  const mapRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const location = await Location.getCurrentPositionAsync({});
      setCoords([location.coords]);
      setStartTime(Date.now());
    })();

    const sub = Location.watchPositionAsync(
      { timeInterval: 5000, accuracy: Location.Accuracy.High },
      loc => setCoords(prev => [...prev, loc.coords])
    );

    const timer = setInterval(() => setSeconds(s => s + 1), 1000);

    return () => {
      sub.then(s => s.remove());
      clearInterval(timer);
    };
  }, []);

  const formatTime = s => `${Math.floor(s / 60)}:${('0' + (s % 60)).slice(-2)}`;

  const calculateDistance = () => {
    const R = 6371;
    let d = 0;
    for (let i = 1; i < coords.length; i++) {
      const a = coords[i - 1];
      const b = coords[i];
      const dLat = (b.latitude - a.latitude) * (Math.PI / 180);
      const dLon = (b.longitude - a.longitude) * (Math.PI / 180);
      const lat1 = a.latitude * (Math.PI / 180);
      const lat2 = b.latitude * (Math.PI / 180);
      const hav = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
      d += R * 2 * Math.atan2(Math.sqrt(hav), Math.sqrt(1 - hav));
    }
    return d.toFixed(2);
  };

  const endJourney = async () => {
    const journeyId = String(startTime);
    const payload = {
      startedAt: startTime,
      time: seconds,
      distance: calculateDistance(),
      points: coords,
      journeyId
    };
    await AsyncStorage.setItem(`journey-${journeyId}`, JSON.stringify(payload));
    router.push(`/journey/Summary?journeyId=${journeyId}`);
  };

  if (!coords[0]) return <Text style={{ padding: 24 }}>Getting location...</Text>;

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        showsUserLocation={false}
        initialRegion={{
          latitude: coords[0].latitude,
          longitude: coords[0].longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
      >
        <Polyline coordinates={coords} strokeWidth={4} strokeColor="#3ddc84" />
        <Marker coordinate={coords[coords.length - 1]} />
      </MapView>

      <View style={styles.overlay}>
        <Text style={styles.meta}>⏱ {formatTime(seconds)}</Text>
        <Text style={styles.meta}>📍 {calculateDistance()} km</Text>
        {active && (
          <TouchableOpacity style={styles.button} onPress={endJourney}>
            <Text style={styles.btnText}>End Journey</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 12,
    borderRadius: 10
  },
  meta: { color: '#fff', fontSize: 16, marginBottom: 4 },
  button: {
    marginTop: 8,
    backgroundColor: '#FF5D73',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start'
  },
  btnText: { color: 'white', fontWeight: '600' }
});