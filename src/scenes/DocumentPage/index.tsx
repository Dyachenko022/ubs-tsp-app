import { connect } from 'react-redux';
import DocumentPage from './DocumentPage';
import { AppDispatch, IReduxState } from '../../redux/store';
import { documentSelector } from '../../redux/document/selectors';
import { documentSaga } from '../../redux/document/saga';

const mapStateToProps = (state: IReduxState) => {
  const document = documentSelector(state);
  return document;
};

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: any) => ({
  fetchDocument: () => {
    const { sidRequest, sidDocument } = ownProps;
    dispatch({
      type: 'DOCUMENT_SAGA',
      payload: {
        sidRequest,
        sidDocument,
      }
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentPage);
