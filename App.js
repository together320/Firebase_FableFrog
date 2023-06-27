import { useCallback } from 'react';
import DialogProvider from './provider/dialogProvider';
import AuthProvider from './provider/authProvider';
import RootNavigator from './Navigator';
import { NotifierWrapper } from 'react-native-notifier';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

//import { useFonts } from 'expo-font';
import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold
} from '@expo-google-fonts/nunito';

export default function App() {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold
  });

  if(!fontsLoaded){
    console.log("unloaded");
    return;
  }
  console.log("loaded");
  return (
    <AuthProvider>
      <NotifierWrapper>
        <DialogProvider>
            <RootNavigator/> 
            <Toast config={toastConfig}/>
        </DialogProvider>
      </NotifierWrapper>
    </AuthProvider>
  )
}

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftWidth : 0, paddingTop : 15, paddingBottom : 18, height : 70, backgroundColor : '#0e5e0e'}}
      text1Style={{
        fontFamily : 'Nunito_400Regular',
        fontSize: 15,
        color : 'white'
      }}
      text2Style={{
        fontFamily : 'Nunito_400Regular',
        fontSize: 13,
        color : 'white'
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftWidth : 0, paddingTop : 15, paddingBottom : 18, height : 70, backgroundColor : '#ff9800'}}
      text1Style={{
        fontFamily : 'Nunito_400Regular',
        fontSize: 15,
        color : 'white'
      }}
      text2Style={{
        fontFamily : 'Nunito_400Regular',
        fontSize: 13,
        color : 'white'
      }}
    />
  )
};