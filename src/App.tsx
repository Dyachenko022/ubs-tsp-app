import React from 'react';
import { Colors, Typography } from 'react-native-ui-lib';
import NetInfo, { NetInfoState, NetInfoSubscription } from '@react-native-community/netinfo';
import Root from './Root';
import BankTheme from './bankTheme';
import { store }from './redux/store';
import { Provider } from 'react-redux';
import { Appearance, AppState, AppStateStatus, NativeModules, Platform } from 'react-native';
import { setTheme } from './redux/theme/actions';
import { PortalProvider } from '@gorhom/portal';
import { loadSettings } from './utils/settingsHelper';
import { setThemeSettings } from './redux/settings/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout, setShortCodeUsed } from './redux/user/actions';
import GlobalPopup from './components/GlobalPopup';
import BackgroundTimer from 'react-native-background-timer';
import { BACKGROUND_TIMEOUT } from './utils/K';
import { fetchSettingsFront, fetchMapPoints, fetchServiceNotification, fetchVersionApp  } from './redux/settingsFront/reducer';
import { getCurrentRoute, goBack, navigate } from './rootNavigation';

Typography.loadTypographies({
  heading: {fontSize: 26, fontWeight: '700'},
  heading2: {fontSize: 21, fontWeight: '700'},
  subheading: {fontSize: 20, fontWeight: '400'},
  body: {fontSize: 18, fontWeight: '400'},
  small: {fontSize: 14, fontWeight: '400'},
});


Colors.loadSchemes({
  light: {
    backgroundColor: 'white',
    textColor: BankTheme.colors.textLight,
    linkColor: 'green',
  },
  dark: {
    backgroundColor: '##222222',
    textColor: '#FFFFFF',
    linkColor: BankTheme.colors.link,
  }
});

Appearance.addChangeListener((d) => {
  void AsyncStorage.getItem('settings-useAutoTheme').then((useAutoTheme) => {
    if (useAutoTheme === 'true' && (d.colorScheme === 'light' || d.colorScheme === 'dark')) {
      store.dispatch(setTheme(d.colorScheme));
    }
  });
});

const splashScreen = NativeModules.SplashScreen;

export default class App extends React.Component<unknown, any> {
  inactivityTimer: number | null = null;
  netInfoEvents: NetInfoSubscription | undefined;

  constructor(props: unknown) {
    super(props);
    this.state = {
      loaded: false,
    };
    this.netInfoEvents = NetInfo.addEventListener(this.handleNetworkStateChange);
    void store.dispatch(fetchMapPoints());
    void Promise.all([
      this.loadSettings(),
      this.loadSettingsFront(),
      store.dispatch(fetchVersionApp()),
      store.dispatch(fetchServiceNotification()),
    ])
      .then(() => {
        if (Platform.OS === 'android') {
          splashScreen.hide();
        }
        this.setState({ loaded: true });
      });
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
    this.netInfoEvents?.();
  }

  handleNetworkStateChange = (info: NetInfoState) => {
    const route = getCurrentRoute();
    if (!info.isConnected) {
      if (route && route !== 'NoInternetScreen') {
        navigate('NoInternetScreen');
      }
    } else {
      if (route === 'NoInternetScreen') {
        goBack();
      }
    }
  }

  handleAppStateChange = (nexAppState: AppStateStatus) => {
    if (nexAppState === 'background') {
      if (Platform.OS === 'ios') {
        BackgroundTimer.start();
      }
      this.inactivityTimer = BackgroundTimer.setTimeout(this.inactivityTimeout, BACKGROUND_TIMEOUT);
    } else {
      BackgroundTimer.clearTimeout(this.inactivityTimer!);
      if (Platform.OS === 'ios') {
        BackgroundTimer.stop();
      }
      if(store.getState().settings.useAutoTheme) {
        store.dispatch(setTheme(Appearance.getColorScheme() === 'dark' ? 'dark' : 'light'));
      }
    }
  }

  inactivityTimeout = () => {
    if (Platform.OS === 'ios') {
      BackgroundTimer.stop();
    }
    store.dispatch(logout());
  }

  loadSettingsFront = async () => {
    await store.dispatch(fetchSettingsFront());
    return true;
  }

  loadSettings = async () => {
    try {
      const settings = await loadSettings();
      store.dispatch(setThemeSettings(settings.useAutoTheme, settings.useDarkTheme));
      if (settings.useAutoTheme) {
        store.dispatch(setTheme(Appearance.getColorScheme() === 'dark' ? 'dark' : 'light'));
      } else if (settings.useDarkTheme) {
        store.dispatch(setTheme('dark'));
      } else {
        store.dispatch(setTheme('light'));
      }
      const codeUsed = await AsyncStorage.getItem('isCodeUsed');
      if (codeUsed === '1') {
        await store.dispatch(setShortCodeUsed(true));
      }
    } catch (ex) {
      console.error(ex);
    }
    return true;
  }

  render() {
    if (!this.state.loaded) return null;
    return (
      <Provider store={store}>
        <PortalProvider>
          <GlobalPopup />
          <Root />
        </PortalProvider>
      </Provider>
    );
  }
}
