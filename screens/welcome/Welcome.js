import { useState, useContext, useEffect } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AuthContext from '../../contexts/authContext';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Notifier, Easing, NotifierComponents } from 'react-native-notifier';
import { _signInWithGoogle } from '../../apis';
import DialogContext from '../../contexts/dialogContext';

export default function WelcomeScreen(props) {
  const authCtx = useContext(AuthContext);
  const diagCtx = useContext(DialogContext);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
 

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  GoogleSignin.configure({
    webClientId: "112397818545-lemjfgign8ivsnm4d4o2d5vkkpq53sou.apps.googleusercontent.com",
  });

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const userinfo = (await GoogleSignin.signIn()).user
   
    return userinfo;
   
  }

  function signin() {
    setLoading(true);
    onGoogleButtonPress().then((result)=>{
       _signInWithGoogle(result)
        .then((res) => {
            if (res.success === 1)
                authCtx.setUserId(res.userId);
            else{
              Alert.alert(res);
            }
            setLoading(false);
        })
        .catch((e) => {
          Notifier.showNotification({
            title: 'Warning',
            description: e.message,
            duration: 3000,
            showAnimationDuration: 800,
            showEasing: Easing.bounce,
            hideOnPress: true,
          });
          setLoading(false);
        })
    })
    .catch((e)=>{
      Notifier.showNotification({
        title: 'Warning',
        description: e.message,
        duration: 3000,
        showAnimationDuration: 800,
        showEasing: Easing.bounce,
        hideOnPress: true,
      });
      setLoading(false);
    })
  }
  /*
  async function signin() {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      return auth().signInWithCredential(googleCredential);
      /*
      .then((result)=>{
Alert.alert(googleCredential);
        Alert.alert("ok")
        Alert.alert(result);
        /*
        _signInWithGoogle(result.user)
        .then((res) => {
            if (res.success === 1)
                authCtx.setUserId(res.userId);
        })
        .catch((e) => {
          Notifier.showNotification({
            title: 'Warning',
            description: e.message,
            duration: 3000,
            showAnimationDuration: 800,
            showEasing: Easing.bounce,
            hideOnPress: true,
          });
        })
        
      //}).catch((e)=> Alert.alert(e));
      //      authCtx.setUserId("EqWMaLDl6t");

    } catch (e) {
      Notifier.showNotification({
        title: 'Warning',
        description: e.message,
        duration: 3000,
        showAnimationDuration: 800,
        showEasing: Easing.bounce,
        hideOnPress: true,
      });
    }
  }
*/

  return (
    <View style={{ fontFamily: 'Nunito_400Regular' }}>
      <View className="basis-1/6"></View>
      <View className="basis-1/4">

        <TouchableOpacity className="bg-[#6D61FD] h-[56] justify-center" style={{ borderRadius: 8, boxShadow: '0px 16px 40px rgba(34, 41, 46, 0.15)' }}
          onPress={() => navigation.navigate('PhoneVerifyOTP')}>
          <Text className="text-[16px] text-[#fff] pl-[10]" style={{ fontFamily: 'Nunito_400Regular' }}>Continue with Phone</Text>
        </TouchableOpacity>
        <View className="mt-[30]" />
        <TouchableOpacity className="bg-[#fff] h-[56] pl-[10] justify-center border-[#000] border-[1px]" style={{ borderRadius: 8 }}
          onPress={signin} >
          <View className="flex-row items-center">
            {(loading ?
              <ActivityIndicator
                size='small'
                visible={loading}
                textContent={'Loading...'}
                textStyle={{ color: '#6d61fd' }}
              /> : "")}
            <Text className="text-[16px] text-[#000]" style={{ fontFamily: 'Nunito_400Regular' }}>
              Continue with Google
            </Text>
          </View>
        </TouchableOpacity>
     
      </View>
    </View>
  );


}