import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import * as api from './api';
import { setFilePathsLink } from '../../utils/filePathsLink';
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';

interface ISettingsFrontReducer {
  tspMobileAppInfoForm: Array<{
    title: string,
    href: string,
  }>,
  mapPoints: Array<IMapPoint>,
  bankInfo: {
    name: string,
    phone: string,
    address: string,
    license: string,
  },
  tspAppInfo: {
    moscowRegion? : {
      phoneText: string,
      phoneLink: string,
    },
    allRegions?: {
      phoneText: string,
      phoneLink: string,
    },
    email: string,
  }
  serviceNotification: IServiceNotification | undefined,
  versionApp: IServiceNotification| undefined,
}

const initialState: ISettingsFrontReducer = {
  tspMobileAppInfoForm: [],
  mapPoints: [],
  bankInfo: {
    name: '',
    phone: '',
    address: '',
    license: '',
  },
  tspAppInfo: {
    moscowRegion: undefined,
    allRegions: undefined,
    email: 'test@mail.ru',
  },
  serviceNotification: undefined,
  versionApp: undefined,
};

const settingsFrontReducer = createSlice({
  name: 'settingsFront',
  initialState: initialState,
  reducers: {
    setSettingsFront: (state, action: PayloadAction<api.ISettingsFront>) => {
      state.tspMobileAppInfoForm = action.payload.tspMobileAppInfoForm;
      state.bankInfo = action.payload.bankInfo;
      state.tspAppInfo = action.payload.tspAppInfo;
    },
    setMapPoints: (state, action: PayloadAction<Array<IMapPoint>>) => {
      state.mapPoints = action.payload;
    },
    setServiceNotification: (state, action: PayloadAction<IServiceNotification | undefined>) => {
      state.serviceNotification = action.payload;
    },
    setVersionApp: (state, action: PayloadAction<IServiceNotification | undefined>) => {
      state.versionApp = action.payload;
    }
  }
});

export default settingsFrontReducer.reducer;

/**
 * Запрос settingsFrontSys и settingsFrontUsr, простановка filePathsLinks
 */
export function fetchSettingsFront() {
  return async (dispatch: AppDispatch) => {
    const settingsFront = await api.getSettingsFront();
    const filePathsLinks = settingsFront.api?.filePathsLinks;
    if (!filePathsLinks) throw new Error('Could not get filePathsLinks');
    setFilePathsLink({
      unloadFiles: filePathsLinks.unloadFiles,
      imageProducts: filePathsLinks.imageProducts,
      imageDocuments: filePathsLinks.imageDocuments,
      linkProductInfo: filePathsLinks.linkProductInfo,
      baseImage: filePathsLinks.baseImage,
    });
    dispatch(settingsFrontReducer.actions.setSettingsFront(settingsFront));
  };
}

export function fetchMapPoints() {
  return async (dispatch: AppDispatch) => {
    const mapPoints = await api.getMapPoints();
    dispatch(settingsFrontReducer.actions.setMapPoints(mapPoints));
  };
}

/**
 * Запрашивает файл /public/ServiceNotification.json и записыват его значения в редюсер
 * Этого файла может не быть, и это не является ошибкой, в этом случае ничего записано не будет,
 * но и Exception не будет выброшен
 */
export function fetchServiceNotification() {
  return async (dispatch: AppDispatch) => {
    try {
      const sv = await api.getServiceNotification();
      dispatch(settingsFrontReducer.actions.setServiceNotification(sv));
    } catch (e) {
      console.error(e);
      dispatch(settingsFrontReducer.actions.setServiceNotification(undefined));
    }
  };
}

/**
 * Запрашивает файл /public/VersionAppTsc.json и записыват его значения в редюсер
 * Этого файла может не быть, и это не является ошибкой, в этом случае ничего записано не будет,
 * но и Exception не будет выброшен
 */
export function fetchVersionApp() {
  return async (dispatch: AppDispatch) => {
    try {
      const versionApps = await api.getVersionApp();
      const thisAppVersion = DeviceInfo.getVersion();

      const minVersionApp = versionApps.reduce((accum: IVersionAppData | undefined, item) => {
        const v = Platform.OS === 'ios' ? item.versionAppIOS : item.versionAppAndroid;
        if (isVersionLess(thisAppVersion, v)) {
          if (accum) {
            if (isVersionLess(v, Platform.OS === 'ios' ? accum.versionAppIOS : accum.versionAppAndroid)) {
              accum = item;
            }
          } else {
            accum = item;
          }
        }
        return accum;
      }, undefined);
      let dataToBeSentToReducer: IServiceNotification | undefined = undefined;
      if (minVersionApp !== undefined) {
        dataToBeSentToReducer = {
          type: minVersionApp.action,
          logoApp: minVersionApp.logoApp,
          backgroundColorApp: minVersionApp.background,
          text: minVersionApp.text,
          actionName: minVersionApp.actionName,
        };
      }
      dispatch(settingsFrontReducer.actions.setVersionApp(dataToBeSentToReducer));
    } catch (e) {
      console.error(e);
      dispatch(settingsFrontReducer.actions.setVersionApp(undefined));
    }
  };
}

function isVersionLess(version1: string, version2: string)  {
  // Версии должны быть в формате x.x.x
  const getVersionPart = (array: string[], pos: number) => {
    if (array.length -1 < pos) return 0;
    else return Number(array[pos]);
  };

  const splitted1 = version1.split('.');
  const splitted2 = version2.split('.');

  const compareMajor = getVersionPart(splitted1, 0) - getVersionPart(splitted2, 0);
  if (compareMajor !== 0) return compareMajor < 0;

  const compareMinor = getVersionPart(splitted1, 1) - getVersionPart(splitted2, 1);
  if (compareMinor !== 0) return compareMinor < 0;

  const comparePatch = getVersionPart(splitted1, 2) - getVersionPart(splitted2, 2);
  if (comparePatch !== 0) return comparePatch < 0;

  return false;
}
