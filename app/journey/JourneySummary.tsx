import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, Text, TextInput, Switch, ActivityIndicator
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
import { BlurView } from 'expo-blur';
import MapView, { Polyline } from 'react-native-maps';

export default function JourneySummary() {
  const { journeyId } = useLocalSearchParams();
  const [data, setData] = useState(null);
  const [journal, setJournal] = useState('');
  const [share, setShare] = useState(false);
  const [storyCard, setStoryCard] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!journeyId) return;
    AsyncStorage.getItem(`journey-${journeyId}`).then(raw => {
      if (raw) {
        const parsed = JSON.parse(raw);
        setData(parsed);
        setJournal(parsed.journal || '');
        setShare(parsed.share || false);
        setStoryCard(parsed.storyCard ?? true);
      }
    });
  }, [journeyId]);

  const saveData = async () => {
    if (!journeyId || !data) return;
    setSaving(true);
    const updated = {
      ...data,
      journal,
      share,
      storyCard,
      journalSnippet: journal.slice(0, 100),
      updatedAt: Date.now()
    };
    await AsyncStorage.setItem(`journey-${journeyId}`, JSON.stringify(updated));
    setSaving(false);
  };

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${('0' + (s % 60)).slice(-2)}`;

  const placeholderPrompt = () => {
    if (!data) return "Reflect on your journey...";
    if (data.distance > 10) return "You covered serious ground! What stood out most?";
    if (data.time > 1800) return "A long trip deserves reflection—what moved you?";
    return "Quick but meaningful—jot a thought?";
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={50} tint="light" style={styles.card}>
        <Text style={styles.title}>Journey Summary</Text>
        {!data ? (
          <ActivityIndicator style={{ marginTop: 40 }} />
        ) : (
          <>
            <Text style={styles.stat}>⏱ Duration: {formatTime(data.time)}</Text>
            <Text style={styles.stat}>📏 Distance: {data.distance} km</Text>
            <Text style={styles.stat}>🕰 Started: {new Date(data.startedAt).toLocaleTimeString()}</Text>

            <Text style={styles.quote}>“Not all those who wander are lost.”</Text>

            <Text style={styles.label}>Reflection:</Text>
            <TextInput
              value={journal}
              onChangeText={text => setJournal(text)}
              placeholder={placeholderPrompt()}
              multiline
              style={styles.input}
            />

            <Text style={styles.count}>{journal.length} characters</Text>

            <View style={styles.toggleRow}>
              <Text>Share to feed</Text>
              <Switch value={share} onValueChange={setShare} />
            </View>

            <View style={styles.toggleRow}>
              <Text>Create Story Card</Text>
              <Switch value={storyCard} onValueChange={setStoryCard} />
            </View>

            {data.points?.length > 1 && (
              <MapView style={styles.map} initialRegion={{
                latitude: data.points[0].latitude,
                longitude: data.points[0].longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}>
                <Polyline coordinates={data.points} strokeWidth={3} strokeColor="#4A90E2" />
              </MapView>
            )}

            <Button mode="contained" onPress={saveData} disabled={saving}>
              {saving ? 'Saving...' : 'Save & Continue'}
            </Button>
          </>
        )}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  card: {
    padding: 24,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: 'rgba(255,255,255,0.4)',
    borderWidth: 1
  },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
  stat: { fontSize: 16, marginBottom: 8 },
  quote: { fontStyle: 'italic', marginVertical: 16, color: '#555', fontSize: 15, textAlign: 'center' },
  label: { fontWeight: 'bold', marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    borderRadius: 8,
    height: 100,
    marginBottom: 8,
    backgroundColor: 'rgba(255,255,255,0.5)'
  },
  count: { fontSize: 12, color: '#666', textAlign: 'right', marginBottom: 8 },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  map: { height: 160, borderRadius: 12, marginBottom: 16 }
});