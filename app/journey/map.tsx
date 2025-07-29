import MapView, { Marker, Polyline } from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet';
import { useSharedValue } from 'react-native-reanimated';
import { useState, useMemo, useRef } from 'react';
import { BlurView } from '@react-native-community/blur';

const MapScreen = () => {
  const mapRef = useRef(null);
  const [selectedStep, setSelectedStep] = useState(null);
  const steps = useMemo(() => getJourneyData(), []);
  const sheetIndex = useSharedValue(0);

  const animateToStep = (step) => {
    mapRef.current.animateToRegion({ ...step.coords, latitudeDelta: 0.03, longitudeDelta: 0.03 }, 800);
    setSelectedStep(step);
    sheetIndex.value = 1;
  };

  return (
    <>
      <MapView ref={mapRef} style={{ flex: 1 }} showsUserLocation={false}>
        <Polyline coordinates={steps.map(s => s.coords)} strokeColor="#FFFFFF" strokeWidth={3} />
        {steps.map((step, i) => (
          <Marker key={i} coordinate={step.coords} onPress={() => animateToStep(step)} />
        ))}
      </MapView>

      <BlurView style={styles.blurOverlay} blurType="light" blurAmount={10} />

      <BottomSheet index={selectedStep ? 0 : -1} snapPoints={["25%", "50%"]}>
        {selectedStep && <StepCard step={selectedStep} />}
      </BottomSheet>

      <ScrubBar steps={steps} onSelectStep={animateToStep} />
    </>
  );
};