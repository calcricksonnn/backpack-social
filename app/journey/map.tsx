import React, { useState, useMemo, useRef } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet';
import { useSharedValue } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { View, StyleSheet } from 'react-native';

const MapScreen = () => {
  const mapRef = useRef<MapView>(null);
  const [selectedStep, setSelectedStep] = useState<any>(null);
  const steps = useMemo(() => getJourneyData(), []);
  const sheetIndex = useSharedValue(0);

  const animateToStep = (step: any) => {
    mapRef.current?.animateToRegion(
      { ...step.coords, latitudeDelta: 0.03, longitudeDelta: 0.03 },
      800
    );
    setSelectedStep(step);
    sheetIndex.value = 1;
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView ref={mapRef} style={{ flex: 1 }} showsUserLocation={false}>
        <Polyline
          coordinates={steps.map((s: any) => s.coords)}
          strokeColor="#FFFFFF"
          strokeWidth={3}
        />
        {steps.map((step: any, i: number) => (
          <Marker key={i} coordinate={step.coords} onPress={() => animateToStep(step)} />
        ))}
      </MapView>

      <BlurView intensity={30} style={styles.blurOverlay} tint="default" />

      <BottomSheet index={selectedStep ? 0 : -1} snapPoints={['25%', '50%']}>
        {selectedStep && <StepCard step={selectedStep} />}
      </BottomSheet>

      <ScrubBar steps={steps} onSelectStep={animateToStep} />
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  blurOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
  },
});