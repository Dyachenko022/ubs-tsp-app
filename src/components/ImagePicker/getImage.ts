import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ActionSheetIOS, Alert, PermissionsAndroid, Platform } from 'react-native';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

const options = {
  title: 'Выбор аватара',
  cancelButtonTitle: 'Отмена',
  takePhotoButtonTitle: 'Сделать фото...',
  chooseFromLibraryButtonTitle: 'Выбрать из библиотеки...',
  allowsEditing: false,
  storageOptions: {
    skipBackup: true,
    waitUntilSaved: true
  },
  mediaType: 'photo',
  // cameraType: 'front',
  quality: 0.25
};

export async function pictureFromCamera(): Promise<ImagePickerResponse> {
  if (Platform.OS === 'ios') {
    let cameraPermission = await check(PERMISSIONS.IOS.CAMERA);
    if (cameraPermission === RESULTS.DENIED) cameraPermission = await request(PERMISSIONS.IOS.CAMERA);
    if (cameraPermission === RESULTS.BLOCKED) {
      throw new Error('Доступ к камере запрещен! Разрешите доступ к камере в настройках.');
    }
    return launchCamera(options);
  } else {
    return launchCamera(options);
  }
}

export async function pictureFromLibrary(): Promise<ImagePickerResponse> {
  if (Platform.OS === 'ios') {
    let libraryPermission = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
    if (libraryPermission === RESULTS.DENIED) libraryPermission = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    if (libraryPermission === RESULTS.BLOCKED) {
      throw new Error('Доступ к фотографиям запрещен! Разрешите доступ к фотографиям в настройках.');
    }
    return launchImageLibrary(options);
  } else {
    await requestFilePermission();
    return launchImageLibrary(options);
  }
}


const parseFile = (fileSize: number, uri: string) => {
  if (fileSize > 2 * 1000 * 1000) {
    Alert.alert('Размер файла слишком большой!', 'Максимальный размер файла – 2 мегабайта', [
      {
        text: 'Закрыть',
        onPress: () => {},
      }
    ]);
    return null;
  }
  return {
    uri: uri,
    name: 'photo.jpg',
    type: Platform.OS === 'ios' ? '' : 'image/jpeg',
  };
};

async function requestFilePermission() {
  const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
    title: 'Запрос доступа к файлам',
    message: 'Для прикрепления файлов необходимо предоставить доступ'
  });
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }
  return false;
}
