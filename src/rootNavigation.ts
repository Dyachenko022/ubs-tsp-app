import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params: any = undefined) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function getCurrentRoute() {
  if (navigationRef.isReady()) {
    return navigationRef.getCurrentRoute()?.name;
  }
  return '';
}

export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}

export function reset(name: 'AuthScreen' | 'LoadingScreen' | 'MyTspScreen') {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 1,
      routes: [{
        name,
      }]
    });
  }
}
