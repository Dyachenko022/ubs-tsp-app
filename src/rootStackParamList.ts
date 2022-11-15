export type RootStackParamList = {
  AuthScreen: undefined,
  PasswordEnterScreen: {
    login: string,
  },
  SelectTspScreen: {
    contracts: IContract[],
  },
  ConfirmSmsScreen: {
    mode: 'forgotPassword' | 'registerApp',
    login?: string,
    phone?: string,
    inn?: string,
  },
  CodeEnterScreen: undefined,
  AboutScreen: undefined,
  MapScreen: undefined,
  AuthTabs: undefined,
  AccountDetailsScreen: {
    accountId: number,
  },
  PdfViewerScreen: {
    file: string,
    headerTitle?: string,
  },
  RestrictionsDetailsScreen: { restrictions: Array<IRestriction> },
  AccountsSummaryScreen: undefined,
  QrCodeScreen: {
    mode: 'qrCode' | 'cashLink',
  },
  ExportDocumentsScreen: undefined,
  HistoryFilterScreen: undefined,
  ProfileScreen: undefined,
  SettingsScreen: undefined,
  MyTspScreen: undefined,
  NewOrderScreen: undefined,
  HistoryScreen: undefined,


  SubscriptionScreen: undefined,
  SubscriptionCreateScreen: undefined,

  MessagesScreen: undefined,
  ForgotPasswordScreen: { login: string, },
  LoadingScreen: undefined,
  PermanentQrCodeScreen: {
    mode: 'permanentQrCode' | 'cashLink',
  },
  MessageToBankScreen: undefined,
  NoInternetScreen: undefined,
  MessageModal: {
    message: IMessage,
    markAsRead: (guid: string) => void,
    getFiles: (guid: string) => Promise<[string[]]>,
  },
  AccountStatementScreen: {
    accountId?: number,
  },
  RefundScreen: {
    id: number,
    maxAmount: number,
  },
  GlobalLoader: undefined,
  ChangePasswordScreen: {
    fromLoginSaga?: boolean,
    successCallback? : () => void
  },
  CancelPaymentModal: {
    state: number,
    noteState: string,
    message: string,
    tspName: string,
    tspAddress: string,
    totalSum: number,
  }
};
