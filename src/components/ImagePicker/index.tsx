import React, { useCallback } from 'react';
import { ActionSheet } from 'react-native-ui-lib';
import { pictureFromCamera, pictureFromLibrary } from './getImage';
import { Alert } from 'react-native';

interface IImagePickerProps {
  visible: boolean,
  onDismiss: () => void,
  onImagePick: (fileUri: string) => void,
}

export default function ImagePicker(props: IImagePickerProps) {

  const makePhoto = useCallback(async () => {
    try {
      const response = await pictureFromCamera();
      if (response.assets[0]) {
        props.onImagePick(response.assets[0].uri);
      } else {
        props.onDismiss();
      }
    } catch (ex) {
      Alert.alert('Ошибка', ex.message);
    }
  }, []);

  const usePhotoFromLibrary = useCallback(async () => {
    try {
      const response = await pictureFromLibrary();
      if (response.assets[0]) {
        props.onImagePick(response.assets[0].uri);
      } else {
        props.onDismiss();
      }
    } catch (ex) {
      Alert.alert('Ошибка', ex.message);
    }
  }, []);

  return (
    <ActionSheet
      title={'Выберите источник фотографии'}
      useNativeIOS={true}
      destructiveButtonIndex={2}
      options={[
        {label: 'Сдеать фото', onPress: makePhoto,},
        {label: 'Выбрать из библиотеки', onPress: usePhotoFromLibrary },
        {label: 'Отмена', onPress: props.onDismiss}
      ]}
      visible={props.visible}
      onDismiss={props.onDismiss}
    />
  );
}
