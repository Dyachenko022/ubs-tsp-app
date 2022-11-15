import React from 'react';
import { IMergedDocumentState } from '../../redux/document/selectors';
import { Modal, SafeAreaView } from 'react-native';

interface IDocumentPageProps extends IMergedDocumentState {
  fetchDocument: () => void,
  isLoading: boolean,
}

export default class DocumentPage extends React.Component<IDocumentPageProps, any> {
  constructor(props: IDocumentPageProps) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchDocument();
  }

  render() {
    return (
      <SafeAreaView>
        <Modal visible={this.props.isLoading} />
        {this.props.groups}
      </SafeAreaView>
    );
  }

}
