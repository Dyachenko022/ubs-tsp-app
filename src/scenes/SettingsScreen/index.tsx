import SettingsScreen from './SettingsScreen';
import { connect } from 'react-redux';
import { AppDispatch, IReduxState } from '../../redux/store';
import { setTheme } from '../../redux/theme/actions';
import { saveSettings } from '../../utils/settingsHelper';
import { changeNds, setThemeSettings } from '../../redux/settings/actions';
import { Appearance } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../rootStackParamList';

type OwnNavigationProp = StackNavigationProp<RootStackParamList, 'PermanentQrCodeScreen'>;
type OwnProps  = {
  navigation: OwnNavigationProp
};

type DispatchProps = {
  dispatch: AppDispatch
};

const mapStateToProps = (state:IReduxState): ISettingsScreenStateProps => ({
  regimeAccess: state.user.regimeAccess,
  settings: state.settings,
  ndsList: state.settings.ndsList,
  nds: state.settings.nds,
});

const mergeProps = (stateProps: ISettingsScreenStateProps, dispatchProps: DispatchProps, ownProps: OwnProps)  => {

  const { dispatch } = dispatchProps;
  return {

    ...stateProps,
    ...ownProps,

    setNds: (nds: string) => {
      void dispatch(changeNds(Number.parseFloat(nds.substring(0, nds.length -1))));
    },
    openPermanentQrCodeScreen: () => {
      ownProps.navigation.push('PermanentQrCodeScreen', { mode: 'permanentQrCode'});
    },
    openCreateCashLink: () => {
      ownProps.navigation.push('PermanentQrCodeScreen', { mode: 'cashLink'});
    },
    openChangePasswordScreen: () => {
      ownProps.navigation.push('ChangePasswordScreen', {});
    },
    setTheme: async (theme: 'auto' | 'dark' | 'light') => {
      const newSettings: ISettings = {
        ...stateProps.settings,
        useAutoTheme: theme === 'auto',
        useDarkTheme: theme === 'dark',
      };
      if (newSettings.useAutoTheme) {
        newSettings.useDarkTheme = false;
      }
      dispatch(setThemeSettings(newSettings.useAutoTheme, newSettings.useDarkTheme));
      if (newSettings.useAutoTheme) {
        if (Appearance.getColorScheme() === 'dark') {
          dispatch(setTheme('dark'));
        } else {
          dispatch(setTheme('light'));
        }
      } else if (newSettings.useDarkTheme) {
        dispatch(setTheme('dark'));
      } else {
        dispatch(setTheme('light'));
      }
      await saveSettings(newSettings);
    }
  };
};

export default connect(mapStateToProps, (dispatch) => ({ dispatch }), mergeProps)(SettingsScreen);
