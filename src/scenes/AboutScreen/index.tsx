import AboutScreen, { IAboutScreenProps } from './AboutScreen';
import { connect } from 'react-redux';
import { IReduxState } from '../../redux/store';

const mapStateToProps = (state: IReduxState) => ({
  links: state.settingsFront.tspMobileAppInfoForm,
  license: state.settingsFront.bankInfo.license,
  address: state.settingsFront.bankInfo.address,
  bankName: state.settingsFront.bankInfo.name,
});

export default connect(mapStateToProps)(AboutScreen);
