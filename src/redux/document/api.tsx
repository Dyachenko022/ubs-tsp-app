import { post } from '../../utils/apiFabric';
import DeviceInfo from 'react-native-device-info';
import { FileData } from '../../components/FileUpload';
import { Platform } from 'react-native';

interface IListContractForDocsReq {
  type: 7,
}

interface IListContractForDocsRes extends IBaseResponse {
  contracts: Array<{
    accountNumber: string,
    balance: number,
    code: string,
    contractNumber: number,
    currency: string,
    description: string,
    isMultiCurrency: boolean,
    logo: string,
  }>,
}

interface IExecuteReq {
  sidDocument: string,
  sidRequest: string,
  idDocument?: number,
  parameters: Array<IParameter>,
}

export interface IExecuteRes extends IBaseResponse {
  inputFields: Array<IFieldsGroup>,
  listValues: Array<{
    name: string,
    value: any,
  }>,
  values: Array<IParameter>,
  groupInput: string,
  sidRequest: string,
  nameForm: string,
  nameButton: string | null,
  linkInfo: string | null,
  linkContract: string | null,
  descriptionForm: string,
  pathImage: string,
}

export function listContractForDocs() {
  return post<IListContractForDocsReq, IListContractForDocsRes>('listContractForDocs', {
    type: 7,
  });
}

export function execute(sidRequest: string, sidDocument: string, requestParameters: IParameter[]) {
  const parameters: IParameter[] = [...requestParameters,
    {value: DeviceInfo.getUniqueId(), type: 'string', name: 'Источник создания', typeColumns: null}
  ];
  const paramId = (parameters.find((item) => item.name === 'Идентификатор документа'));

  const data: IExecuteReq = {
    sidDocument,
    sidRequest,
    parameters,
  };

  if (paramId) {
    data.idDocument = paramId.value as number;
  }

  return post<IExecuteReq, IExecuteRes>(`execute/${sidRequest}`, data);
}

export async function addDocumentFiles(id: number, files: Array<FileData>) {
  const formData = new FormData();
  formData.append('id', id);
  files.forEach((file) => {
    formData.append('files[]', {
      uri: file.uri,
      name: file.fileName,
      type: file.type,
    });
  });
  return post<FormData, IBaseResponse>('addDocumentFiles', formData);
}
