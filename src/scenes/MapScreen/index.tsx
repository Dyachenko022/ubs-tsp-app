import MapScreen from './MapScreen';
import { connect } from 'react-redux';
import { IReduxState } from '../../redux/store';

const mapStateToProps = (state: IReduxState) => ({
  points: state.settingsFront.mapPoints,
});

export default connect(mapStateToProps)(MapScreen);
