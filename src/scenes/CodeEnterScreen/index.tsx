import CodeEnterScreen, { NavigationProp } from './CodeEnterScreen';
import { connect } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { setShortCode } from '../../redux/user/actions';

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: NavigationProp) : ICodeEnterScreenProps => ({
  onExitPressed: () => ownProps.navigation.popToTop(),
  onCodeEnter: (code: string) => dispatch(setShortCode(code)),
  skipCode: () => dispatch(setShortCode('')),
});

export default connect(null, mapDispatchToProps)(CodeEnterScreen);
