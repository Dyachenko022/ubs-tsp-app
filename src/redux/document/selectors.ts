import { IReduxState } from '../store';

export interface IMergedDocumentState {
  sidRequest: string,
  groups: Array<IFieldsGroup>,
  values: IParameter[],
  listValues: Array<{
    name: string,
    value: any,
  }>,
  groupInput: string,
  nameForm: string,
  nameButton: string | null,
  linkInfo: string | null,
  linkContract: string | null,
  descriptionForm: string,
  pathImage: string,
  currentGroupIndex: number,
}

export function documentSelector(state: IReduxState): IMergedDocumentState {
  const { document } = state;
  const mergedGroups: Array<IFieldsGroup> = [];
  const mergedValues: IParameter[] = [];
  const mergedListValues: Array<{
    name: string,
    value: any,
  }> = [];

  document.requestBound.forEach((requestBoundData) => {
    mergedGroups.push(...requestBoundData.groups);
    mergedValues.push(...requestBoundData.values);
    mergedListValues.push(...requestBoundData.listValues);
  });

  const sidRequest = document.requestBound[document.requestBound.length - 1].sidRequest;

  return {
    currentGroupIndex: document.currentGroupIndex,
    sidRequest,
    groups: mergedGroups,
    values: mergedValues,
    listValues: mergedListValues,
    groupInput: document.groupInput,
    linkContract: document.linkContract,
    linkInfo: document.linkInfo,
    pathImage: document.pathImage,
    nameButton: document.nameButton,
    nameForm: document.nameForm,
    descriptionForm: document.descriptionForm,
  };
}
