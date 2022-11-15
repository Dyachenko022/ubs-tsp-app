import { NativeModules } from 'react-native';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const nativeBankTheme = NativeModules.BankTheme as IBankThemeNative;


const bankTheme: IBankTheme =  {

  serverUrl: nativeBankTheme.serverUrl,
  appName: nativeBankTheme.appName,
  
  latitude: nativeBankTheme.latitude,
  longitude: nativeBankTheme.longitude,

  setThemeType: (themeType: 'dark' | 'light' | 'auto') => {
    if (Platform.OS === 'ios') {
      nativeBankTheme.setNativeThemeType(themeType);
    } else {
      void AsyncStorage.setItem('settings-theme', themeType);
    }
  },

  loadThemeType: async () => {
    if (Platform.OS === 'ios') {
      const themeType = await nativeBankTheme.loadNativeThemeType();
      return themeType;
    } else {
      return AsyncStorage.getItem('settings-theme');
    }
  },

  colors: {
    textDark: nativeBankTheme.colors.textDark,
    textLight: nativeBankTheme.colors.textLight,
    textGray: '#B2B9C6',
    link: nativeBankTheme.colors.link,
    buttonFilled: nativeBankTheme.colors.buttonFilled,
    gradientDark: nativeBankTheme.colors.gradientDark,
    gradientLight: nativeBankTheme.colors.gradientLight,
  },

  images: {
    loginPageImage: { uri:  Platform.OS === 'ios' ? 'loginPage-image' : 'asset:/loginPage/image.png' },
    loginPageLogo: { uri: Platform.OS === 'ios' ? 'loginPage-logo': 'asset:/loginPage/logo.png' },
    loginPageCallIcon: { uri: Platform.OS === 'ios' ? 'loginPage-callIcon' : 'asset:/loginPage/callIcon.png' },
    loginPageInfoIcon: { uri: Platform.OS === 'ios' ? 'loginPage-infoIcon' : 'asset:/loginPage/infoIcon.png' },
    loginPageMapIcon: { uri: Platform.OS === 'ios' ? 'loginPage-mapIcon' : 'asset:/loginPage/mapIcon.png' },
    loadingPageImage: { uri:  Platform.OS === 'ios' ? 'loadingPage-image' : 'asset:/loadingPage/image.png' },
  }
};

declare const BankTheme: IBankTheme;
export default bankTheme;
