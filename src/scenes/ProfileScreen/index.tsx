import ProfileScreen, { ProfileScreenNavigationProps } from './ProfileScreen';
import { connect } from 'react-redux';
import { AppDispatch, IReduxState } from '../../redux/store';
import { getPhotoAbonent, logout } from '../../redux/user/actions';
import { savePhotoAbonent } from '../../redux/user/api';

const mapStateToProps = (state: IReduxState): IProfileScreenStateProps => ({
  address: state.user.address,
  avatar: state.user.avatar,
  sbpId: state.user.sbpId,
  tspName: state.user.tspName,
  organization: state.user.organization,
  name: state.user.name,
  regimeAccess: state.user.regimeAccess,
});

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: ProfileScreenNavigationProps): IProfileScreenDispatchProps => ({
  openSettings: () => ownProps.navigation.push('SettingsScreen'),
  exit: () => dispatch(logout()),
  openAboutScreen: () => ownProps.navigation.push('AboutScreen'),
  openMapScreen: () => ownProps.navigation.push('MapScreen'),
  openSendMessageToBankScreen: () => ownProps.navigation.push('MessageToBankScreen'),
  loadAvatar: async (imageUri: string) => {
    try {
      await savePhotoAbonent(imageUri);
      await dispatch(getPhotoAbonent());
    } catch (err){
      console.error(err);
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);


