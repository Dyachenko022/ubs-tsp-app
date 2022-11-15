import { get } from '../../utils/apiFabric';

export interface ISettingsFront {
  tspMobileAppInfoForm: Array<{
    title: string,
    href: string,
  }>,
  bankInfo: {
    name: string,
    phone: string,
    address: string,
    license: string,
  },
  api: {
    filePathsLinks: {
      unloadFiles: string,
      imageProducts: string,
      imageDocuments: string,
      linkProductInfo: string,
      baseImage: string,
    }
  },
  tspAppInfo: {
    moscowRegion? : {
      phoneText: string,
      phoneLink: string,
    },
    allRegions?: {
      phoneText: string,
      phoneLink: string,
    },
    email: string,
  }
}

export async function getSettingsFront() {
  const settingsFrontSys = await get<Dictionary<any>>('/public/settingsFrontSys.json');
  const settingsFrontUsr = await get<Dictionary<any>>('/public/settingsFrontUsr.json');
  /*const settingsFrontSys = {
    api: {filePathsLinks:{unloadFiles:'',imageProducts:'',imageDocuments:'',linkProductInfo:'',baseImage:''},},
  };
  const settingsFrontUsr = {
    tspMobileAppInfoForm: [{title:'abc', href:''}],
    bankInfo: {name:'bank',phone:'123',address: 'addr',license:'lic' },
    tspAppInfo: {
      moscowRegion:{phoneText:'123',phoneLink:''},
      allRegions:{phoneText:'123',phoneLink:''},
      email:''
    }
  }; //TEST OFFLINE */
  return { ...settingsFrontSys, ...settingsFrontUsr } as ISettingsFront;
}

export function getMapPoints() {
  /*var a = [{
    id: 1,
    location: '123,123',
    name: '123123',
    address: '123123',
    working: '123',
    director: '123',
    services: '123',
    phone: '123',
    logo: '123',
    type: '123'
  }]; 
  return a; //TEST OFFLINE */
  
  return get<Array<IMapPoint>>('/public/MobileListPointService.json');
}

export function getVersionApp() {
  //return []; //TEST OFFLINE
  return get<Array<IVersionAppData>>('/public/VersionAppTsc.json');
}

export function getServiceNotification() {
  //return ''; //TEST OFFLINE
  return get<IServiceNotification>('/public/ServiceNotification.json');
}
