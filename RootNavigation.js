import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef()

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    console.log(name);
    console.log(params);
    navigationRef.navigate(name, params);
  }
}