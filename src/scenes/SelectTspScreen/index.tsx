import SelectTspScreen, { NavigationProp } from './SelectTspScreen';
import { connect } from 'react-redux';
import { AppDispatch, IReduxState } from '../../redux/store';
import { RootStackParamList } from '../../rootStackParamList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AUTH_SELECT_CONTRACT } from '../../redux/user/types';

type OwnProps  = {
  navigation: NavigationProp
} & NativeStackScreenProps<RootStackParamList, 'SelectTspScreen'>;

const mapStateToProps = (state: IReduxState, ownProps: OwnProps) => ({
  contracts: ownProps.route.params.contracts,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onSelectTsp: (id: number) => {
    dispatch({type: AUTH_SELECT_CONTRACT, payload: { id }});
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectTspScreen);
