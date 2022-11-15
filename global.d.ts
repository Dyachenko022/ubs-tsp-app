interface IBankThemeColors {
  textLight: string,
  textDark: string,
  link: string,
  buttonFilled: string,
  gradientLight: string[][],
  gradientDark: string[][],
  textGray: string,
}

type Awaited<T> = T extends PromiseLike<infer U> ? U : T;
type AsyncResult<T extends (...args: any) => any> =  Awaited<ReturnType<T>>;

interface IServiceNotification {
  type: number,
  logoApp: string,
  backgroundColorApp: string,
  text: string,
  actionName: string,
}

interface IVersionAppData {
  versionAppIOS: string,
  versionAppAndroid: string,
  logoApp: string,
  background: string,
  text: string,
  actionName: string,
  action: number,
}

interface KVP<K, V> {
  key: K,
  value: V,
}

type LayoutType = 'auth' | 'loading' | 'private';

type AnalyticsDataArray = Array<{
  income: number,
  outcome: number,
  namePeriod: string,
}>

interface AbonentListEntry {
  login: string,
  abonentName: string,
  contractId: number,
  useShortCode: boolean,
  uid: string,
}

type PopupType = 'error' | 'warn' | 'success';

interface IImageUri {
  uri: string,
}

interface IBankThemeNative {
  colors: IBankThemeColors,
  appName: string,
  serverUrl: string,
  latitude: string,
  longitude: string,
}

interface IBankTheme extends IBankThemeNative {
  setThemeType: (themeType: 'dark' | 'light' | 'auto') => void,
  loadThemeType: () => Promise<'dark' | 'light' | 'auto'>,
  appName: string,
  images: {
    loginPageImage: IImageUri,
    loginPageLogo: IImageUri,
    loginPageMapIcon: IImageUri,
    loginPageInfoIcon: IImageUri,
    loginPageCallIcon: IImageUri,
    loadingPageImage: IImageUri,
  }
}

interface IBaseResponse {
  codeResult: number,
  textResult: string,
}

interface IContract {
  id: number,
  name: string,
  image: string,
}

declare class RequestException extends Error implements IBaseResponse {
  public readonly codeResult: number;
  public readonly textResult: string;


}

declare type ThemeType = 'light' | 'dark';

declare type RegimeAccess = 'Кассир' | 'Бухгалтер' | 'Администратор';

interface ISettings {
  useAutoTheme: boolean,
  useDarkTheme: boolean,
}

interface IThemeable {
  theme: ThemeType,
}

interface IParameter {
  name: string,
  type: string,
  typeColumns: string | Array<string> | null,
  value: any,
}

interface IDocumentField {
  sid: string,
  name: string,
  inputType: string,
  readOnly: boolean,
  mask: string,
  minSize: number,
  maxSize: number,
  action: string
  condition: string,
  comment: string,
}

interface IFieldsGroup {
  group: string,
  fields: Array<IDocumentField>,
}

interface ITspData {
  id: number,
  name: string,
}

interface IAccountDetails {
  id: number,
  balance: number,
  numAccount: string,
  accountName: string,
  state: string,
  dateOpen: string,
  productName: string,
  restrictions: Array<IRestriction>,
  currencyName: string,
  currency: string,
}

interface IRestriction {
  dateSet: string,
  description: string,
  amount: number,
  numDecision: string,
  dateDecision: string,
}


interface IOperationData {
  id: number,
  date: string,
  payerName: string,
  payerPhone: string,
  description: string,
  sum: number,
  image: string,
  state: number,
  stateName: string,
  numAccount: string,
  canBeRefunded: boolean,
  type: string,
}

interface IOperationDataPresentable extends IOperationData {
  dateDocument: Date,
  formattedDate: string,
}

interface IDateGroupedOperationData {
  title: string,
  unixEpoch: number,
  data: IOperationDataPresentable[],
}

interface IDocumentsFilter {
  period: 'Неделя' | 'Месяц' | 'Год' | 'Все',
  typeOperations?: 'Оплата' | 'Возврат',
  sumFrom?: number,
  sumTo?: number,
  state?:  'Завершена' | 'В процессе' | 'Отбракована',
  identyOfOperation?: string,
  searchString?: string,
}

interface IOrderEntry {
  itemName: string,
  price: number,
  count: number,
}

interface IMapPoint {
  id: number,
  location: string,
  name: string,
  address: string,
  working: string,
  director: string,
  services: string,
  phone: string,
  logo: string,
  type: string
}

interface IMessage {
  guid: string,
  hasAttachments: boolean
  text: string,
  time: string,
  title: string,
  type: 'messageIn' | 'messageOut',
  unread: boolean,
}

// Screens

interface IAuthScreenStateProps extends IThemeable {
  shortCodeUsed: boolean,
  versionAppNotification: IServiceNotification | undefined,
  serviceNotification: IServiceNotification | undefined,
}

interface IAuthScreenDispatchProps {
  onClickForgot: () => void,
  onClickMap: () => void,
  onClickInfo: () => void,
  onClickAuth: (login: string) => Promise<void>,
  onSelectAbonent: (abonent: AbonentListEntry) => Promise<void>,
  onStopUsingShortCode: () => Promise<void>,
  onLoginByCode: (code: string) => Promise<unknown>,
}

interface IAuthScreenProps extends IAuthScreenStateProps, IAuthScreenDispatchProps {}

interface IPasswordEnterScreen {
  onPressAuth: (password: string) => void,
  onPressForgot: () => void,
}

interface ICodeEnterScreenProps {
  onCodeEnter: (code: string) => void,
  skipCode: () => void,
  onExitPressed: () => void,
}

interface IConfirmSmsCodeStateProps {
  liveTime: number,
  phoneSending: string,
  dateGenerate: string,
  mode: string,
}

interface IConfirmSmsCodeDispatchProps {
  refreshCode: () => Promise<void>,
  confirmCode: (code: string) => void,
}

interface ISelectTspScreen {
  onSelectTsp: (id: number) => void,
  contracts: IContract[],
}

interface IMyTspScreenStateProps {
  avatar: string,
  accounts: IAccountDetails[],
  documents: IOperationData[],
  regimeAccess: RegimeAccess,
  countUnreadMessages: number,
  name: string,
}

interface IMyTspScreenDispatchProps {
  openNewOrderScreen: () => void,
  openHistoryScreen: () => void,
  openSubscriptionScreen: () => void,
  openAccountsSummaryScreen: () => void,
  openProfileScreen: () => void,
  openAccountDetails: (account: IAccountDetails) => void,
  openMessagesScreen: () => void,
  requestStatement: () => void,
  openReceipt: (idDocument: number) => Promise<void>,
  openRefund: (id: number, maxAmount: number) => void,
  fetchNewMessages: () => void,
}

interface IBankAccountsScreenProps extends IMyTspScreenStateProps, IMyTspScreenDispatchProps { }

interface IAccountDetailsScreenProps {
  account: IAccountDetails,
  onPressRestrictionsDetails: () => void,
  setNewAccountName: (name: string) => Promise<void>,
  onPressShowAccountDetails: () => Promise<void>,
  getStatement: () => void,
}

interface INewOrderScreenStateProps {
  nds: number,
  items: IOrderEntry[],
  totalSum: number,
  ndsSum: number,

  /*type?: string,
  subscrPurpose?: string, 
  subscrPayerId?: string,*/

  subscriptions: ISubscriptionData[],
}

interface INewOrderScreenDispatchProps {
  placeOrder: (withCashLink: boolean, items: IOrderEntry[], nds: number, totalSum: number,
               type?: string, subscrPurpose?: string, subscrPayerId?: string, subscrId?: number) => void,
  setItems: (items: IOrderEntry[]) => void,
  getSubscriptions: (searchString: string) => void,
}

interface IQrCodeScreenStateProps {
  isCashLink: boolean,
  mode: string,
  totalSum: number,
  qrCodeBase64: string,
  qrCodeStatus: 'pending' | 'success' | 'failure' | 'successPay' | 'successPayAndSubscr' | 'failureSubscr',
  qrCodeFailureText: string,
  tspName: string,
  tspAddress: string,
}

interface IQrCodeScreenDispatchProps {
  onClose: (mode: string) => void,
}

interface IProfileScreenStateProps {
  avatar: string,
  name: string,
  organization: string,
  address: string,
  sbpId: string,
  tspName: string,
  regimeAccess: RegimeAccess,
}

interface IProfileScreenDispatchProps {
  exit: () => void,
  openSettings: () => void,
  openAboutScreen: () => void,
  openMapScreen: () => void,
  openSendMessageToBankScreen: () => void,
  loadAvatar: (imageUri: string) => Promise<void>,
}

interface ISettingsScreenStateProps {
  regimeAccess: RegimeAccess,
  settings: ISettings,
  ndsList: number[],
  nds: number,
}

interface ISettingsScreenDispatchProps {
  setNds: (nds: string) => void,
  setTheme: (theme: 'auto' | 'dark' | 'light') => Promise<void>,
  openPermanentQrCodeScreen: () => void,
  openCreateCashLink: () => void,
  openChangePasswordScreen: () => void,
}

interface ISettingsScreenProps extends ISettingsScreenStateProps, ISettingsScreenDispatchProps {}

interface IMessagesScreenStateProps {
  isLoading: boolean,
  filterType: 'incoming' | 'sent',
  messages: IMessage[],
}

interface IMessagesScreenDispatchProps {
  changeMessagesType: (filterType: 'incoming' | 'sent') => void,
  updateMessages: () => void,
  loadMoreMessages: (numPages: number) => void,
  onPressMessage: (message: IMessage) => void,
  openSendMessageToBankScreen: () => void,
}

interface ISubscriptionData {
  id: number,
  date: string,
  state: number,
  stateName: string,
  description: string,
  correspCode: string,
}

interface ISubscriptionsFilter {
  searchString?: string,
}

interface ISubscriptionScreenStateProps {
  loading: boolean,
  countSubscriptions: number,
  filter: ISubscriptionsFilter,
  subscriptions: ISubscriptionData[],
  regimeAccess: RegimeAccess,
}

interface ISubscriptionScreenDispatchProps {
  getSubscriptions: (numPage: number) => void,
  getSubscriptionsWithSearch: (searchString: string) => void,
  openFilterScreen: () => void,
  deleteSubscription: (id:number) => void,
  openCreateSubscriptionScreen: () => void,
}

interface ISubscriptionDataPresentable extends ISubscriptionData {
  dateDocument: Date,
  formattedDate: string,
}

interface ISubscriptionCreateScreenStateProps {
  subscrPurpose: string,
  subscrPayerId: string,
}

interface ISubscriptionCreateScreenDispatchProps {
  makeSubscrQrCode: (subscrPurpose: string, subscrPayerId: string) => void,
}

interface IHistoryScreenStateProps {
  loading: boolean,
  countOpers: number,
  filter: IDocumentsFilter,
  documents: IOperationData[],
  regimeAccess: RegimeAccess,
}

interface IHistoryScreenDispatchProps {
  getDocuments: (numPage: number) => void,
  getDocumentsWithSearch: (searchString: string) => void,
  openFilterScreen: () => void,
  openExportDocumentsScreen: () => void,
  openRefund: (id: number, maxAmount: number) => void,
  openReceipt: (idDocument: number) => void,
}

interface IHistoryFilterScreenStateProps {
  filter: IDocumentsFilter,
}

interface IHistoryFilterScreenDispatchProps {
  close: () => void,
  applyFilter: (filter: IDocumentsFilter) => void,
}

type UirFile = {
  uri: string,
  isFile: boolean
}

interface IPermanentQrCodeScreenDispatchProps {
  requestPermanentQrCode: (qrCodeMoney: number, description: string) => Promise<UirFile>,
  onSendQrCodePress: (qrCodeSource: UirFile) => void,
}

type TypeOfFile = 'PDF' | 'XLS';
type TypeOfPeriod =  'Неделя' | 'Месяц' | 'Год' |'Все';
type TypeOfDocument = 'Все' | 'Оплата' | 'Возврат';
type TypeOfStatus = 'Все' | 'Завершена' | 'В процессе' | 'Отбракована';

interface IExportDocumentsScreenProps {
  close: () => void,
  extractDocuments: (typeOfFile: TypeOfFile, period: TypeOfPeriod, typeOfDocument: TypeOfDocument,
                     status: TypeOfStatus ) => Promise<void>,
}
