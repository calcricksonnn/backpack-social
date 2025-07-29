import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function JourneyTracker() {
  const [points, setPoints] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [journeyActive, setJourneyActive] = useState(true);
  const [initial, setInitial] = useState(null);

  useEffect(() => {
    Location.getCurrentPositionAsync({}).then(loc => {
      setInitial(loc.coords);
      setPoints([loc.coords]);
    });

    const sub = Location.watchPositionAsync(
      { timeInterval: 5000, accuracy: Location.Accuracy.High },
      loc => setPoints(p => [...p, loc.coords])
    );

    const timer = setInterval(() => setSeconds(s => s + 1), 1000);

    return () => {
      sub.then(s => s.remove());
      clearInterval(timer);
    };
  }, []);

  const formatTime = s => `${Math.floor(s / 60)}:${('0' + (s % 60)).slice(-2)}`;

  const calculateDistance = (a, b) => {
    const R = 6371; // km
    const dLat = ((b.latitude - a.latitude) * Math.PI) / 180;
    const dLon = ((b.longitude - a.longitude) * Math.PI) / 180;
    const lat1 = (a.latitude * Math.PI) / 180;
    const lat2 = (b.latitude * Math.PI) / 180;
    const x = dLat / 2;
    const y = dLon / 2;
    const hav = Math.sin(x) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(y) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(hav), Math.sqrt(1 - hav));
  };

  const getDistance = () => {
    let dist = 0;
    for (let i = 1; i < points.length; i++) {
      dist += calculateDistance(points[i - 1], points[i]);
    }
    return dist.toFixed(2);
  };

  const endJourney = async () => {
    const data = {
      time: seconds,
      distance: getDistance(),
      path: points,
      endedAt: new Date().toISOString()
    };
    await AsyncStorage.setItem(`journey-${data.endedAt}`, JSON.stringify(data));
    setJourneyActive(false);
    // navigate to summary or share
  };

  if (!initial) return <Text>Loading map...</Text>;

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: initial.latitude,
          longitude: initial.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
      >
        {points.length > 0 && <Polyline coordinates={points} strokeColor="#00BFFF" strokeWidth={4} />}
        <Marker coordinate={points[points.length - 1]} />
      </MapView>

      <View style={styles.stats}>
        <Text style={styles.stat}>⏱ {formatTime(seconds)}</Text>
        <Text style={styles.stat}>📍 {getDistance()} km</Text>
      </View>

      {journeyActive && (
        <TouchableOpacity style={styles.endBtn} onPress={endJourney}>
          <Text style={styles.endText}>End Journey</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  stats: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 8,
    padding: 10
  },
  stat: { color: 'white', fontSize: 16 },
  endBtn: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#FF4D4D',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 5
  },
  endText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
});