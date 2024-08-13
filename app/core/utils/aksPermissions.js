import { Platform } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

export const requestStoragePermission = async () => {
  if (Platform.OS === 'android') {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === 'granted';
  }
  return true; // Permissions are automatically granted on iOS
};
