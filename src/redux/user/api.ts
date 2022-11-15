import { Platform } from 'react-native';
import { post } from '../../utils/apiFabric';
import { mergeLink } from '../../utils/filePathsLink';

interface IAuthBaseReq {
  username: string,
  password: string,
  source: 'MobileApplicationTSC',
}

export interface IAuthBaseRes extends IBaseResponse {
  contracts: IContract[],
  jwt: string,
}

interface IAuthContractReq {
  id: number,
}

export interface IAuthContractRes extends IBaseResponse{
  regimeConfirmation: number,
  regimeConfirmationLogin: number,
  expireDatePassword: string,
  changePassword: number,
  fullname: string,
  username: string,
  lastIp: string,
  lastDate: string,
  nameabonent: string,
  regimeAccess: RegimeAccess,
}

interface IReAccessReq {
  numPhone: string,
  inn: string,
  login: string,
}

interface IReAccessRes extends IBaseResponse {
  jwt: string,
  liveTime: number,
  phoneSending: string,
  dateGenerate: string,
}

interface IGetCodeSmsReq {
  type: string,
  name: string,
}

export interface IGetCodeSmsRes extends IBaseResponse {
  liveTime: number,
  phoneSending: string,
  dateGenerate: string,
}

interface IConfirmReq {
  code: string,
}

interface IRegistrationAppReq {
  uid: string,
  name: string,
  code: string,
}

interface IAuthCodeReq {
  uid: string,
  code: string,
  source: 'MobileApplicationTSC',
}

export interface IAuthCodeRes extends IBaseResponse {
  jwt: string,
}

export interface IParamContractClientRes extends IBaseResponse {
  clientName: string,
  addressReg: string,
  idTspSbp: string,
  nameTSP: string,
  listNds: Array<{nds: string}>,
  setNds: number,
  regimeaccess: string,
}

interface IChangePasswordReq {
  password: string,
}

export interface IGetPhotoAbonentResponse extends IBaseResponse {
  foto: string,
}

export async function authBase(username: string, password: string): Promise<IAuthBaseRes> {
  return post<IAuthBaseReq, IAuthBaseRes>('users/auth/base', {username, password, source: 'MobileApplicationTSC'}
    , false, false);
}

export function authContract(id: number): Promise<IAuthContractRes> {
  return post<IAuthContractReq, IAuthContractRes>('users/auth/contract', { id });
}

export function getCodeSms(type: string, name: string): Promise<IGetCodeSmsRes> {
  return post<IGetCodeSmsReq, IGetCodeSmsRes>('users/getCodeSMS', { type, name });
}

export function confirm(code: string): Promise<IBaseResponse> {
  return post<IConfirmReq, IBaseResponse>('users/confirm', { code });
}

export function registrationApp(uid: string, name: string, code: string): Promise<IBaseResponse> {
  return post<IRegistrationAppReq, IBaseResponse>('registrationApp', { uid, name, code});
}

export function authCode(uid: string, code: string): Promise<IBaseResponse> {
  return post<IAuthCodeReq, IAuthCodeRes>('users/auth/code', {uid, code, source: 'MobileApplicationTSC' }, false, false);
}

export function paramContractClient(): Promise<IParamContractClientRes> {
  return post<unknown, IParamContractClientRes>('tsc/paramContract', {});
}

export async function getPhotoAbonent(): Promise<IGetPhotoAbonentResponse> {
  const response = await post<unknown, IGetPhotoAbonentResponse>('users/getFotoAbonent', {});
  response.foto = mergeLink(response.foto, 'unloadFiles');
  return response;
}

export function changePassword(password: string) {
  return post<IChangePasswordReq, IBaseResponse>('users/changePassword', { password });
}

export function savePhotoAbonent(photoUri: string) {
  const formData = new FormData();
  formData.append('file', {
    uri: photoUri,
    name: 'user_avatar.jpg',
    type: Platform.OS === 'ios' ? '' : 'image/jpeg',
  });
  return post<FormData, IBaseResponse>('saveFotoAbonent', formData);
}

export function restoreAccess(numPhone: string, login: string, inn: string) {
  return post<IReAccessReq, IReAccessRes>('reAccess', {
    numPhone,
    inn,
    login,
  }, false, false);
}

export function confirmRestoreAccess(code: string): Promise<IBaseResponse> {
  return post<IConfirmReq, IBaseResponse>('reAccess/confirm', { code });
}
