import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { themeColors } from '../../../theme/colors';

export type HandleBarCodeScanned = ({ type, data }: { type: string, data: string }) => void

export type QRCodeScannerProps = {
  handleBarCodeScanned: HandleBarCodeScanned;
  setScanned: (scanned: boolean) => void;
  scanned: boolean;
}

export default function QRCodeScanner({ handleBarCodeScanned, setScanned, scanned }: QRCodeScannerProps) {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  // if (!permission.granted) {
  //   // Camera permissions are not granted yet.
  //   return (
  //     <View style={[styles.container, {
  //         backgroundColor: themeColors.basePage,
  //       }]}>
  //       <Text style={[styles.text, { textAlign: 'center' }]}>Para este recurso precisamos de acesso á sua câmera</Text>
  //       <Button onPress={requestPermission} title="definir permissão" />
  //     </View>
  //   );
  // }

  permission.granted = true;

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={handleBarCodeScanned}
      >
        <View style={styles.buttonContainer}>
          {/*
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          */}
        </View>
      </CameraView>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 8,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themeColors.color,
  },
});