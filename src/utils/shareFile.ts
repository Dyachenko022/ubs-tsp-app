import { PermissionsAndroid, Platform } from 'react-native';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import ReactNativeBlobUtil from 'react-native-blob-util';

/**
 * Функция "Поделиться" для Андроида и iOS. Promise будет отклонен, если пользователь
 * отменит раздачу файла.
 * @param fileUrl - ссылка на файл
 */
export async function shareFile(fileUrl: string) {
  const fileName = fileUrl.split('/').pop() || 'unknown.dat';
  const res = await ReactNativeBlobUtil.config({
    fileCache: true,
    path: `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/${fileName}`,
  })
    .fetch('GET', fileUrl);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  let mimeType = res.info().headers['Content-Type'] as string;
  if(mimeType === undefined)
    mimeType = res.info().headers['content-type'] as string;

  if (Platform.OS === 'android') {
    const res = await ReactNativeBlobUtil.fetch('GET', fileUrl);
    const base64 = res.base64() as string;
    // Здесь может быть Content-Type... Надо протестировать...
    const allowedStorage = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );

    if (allowedStorage) {
      await Share.open({
        url: `data:${mimeType};base64,${base64}`,
        title: 'Документ'
      });
    }
  } else {
    const filePath = res.path();
    try {
      await Share.open({
        title: fileName,
        type: 'application/pdf',
        url: filePath
      });
    } finally {
      await RNFS.unlink(filePath);
    }
  }
}

/**
 * Функция "Поделиться" для Андроида и iOS. Параметр - base64 картинки. Promise будет отклонен, если пользователь
 * отменит раздачу файла.
 */
export async function shareImageBase64(base64: string, title = 'Документ') {
  await Share.open({
    url: base64,
    type: 'application/png',
    title: 'Документ'
  });
}
