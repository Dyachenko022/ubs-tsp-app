import GlobalPopup from './GlobalPopup';
import { connect } from 'react-redux';
import { hidePopup } from '../../redux/globalPopup/actions';
import { AppDispatch, IReduxState } from '../../redux/store';

const mapStateToProps = (state: IReduxState) => ({
  shown: state.globalPopup.shown,
  text: state.globalPopup.text,
  type: state.globalPopup.type,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  close: () => dispatch(hidePopup()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GlobalPopup);
