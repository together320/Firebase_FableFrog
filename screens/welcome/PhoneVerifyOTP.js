import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator , Alert} from 'react-native'
import { Notifier, Easing, NotifierComponents } from 'react-native-notifier';
import PhoneInput from 'react-native-phone-number-input';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth, app } from '../../services/firebase';
import { useNavigation } from '@react-navigation/native'

export default function PhoneVerifyOTP(props) {
  const navigation = useNavigation();
  const recaptchaVerifier = React.useRef(null);
  /* const recaptchaVerifier = React.useRef(null); */
  /* const attemptInvisibleVerification = false; */

  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [formattedValue, setFormattedValue] = useState("");
  const phoneInput = useRef(null);

  const firebaseConfig = app ? app.options : undefined;
  console.log(formattedValue)
  const signWithPhoneNumber = async () => {
    const checkValid = phoneInput.current?.isValidNumber(value);
   
    if (checkValid) {
      setLoading(true);
     
      try {
        const phoneProvider = new PhoneAuthProvider(auth);
        const verificationId = await phoneProvider.verifyPhoneNumber(
          formattedValue,
          recaptchaVerifier.current
        )
          
            setLoading(false);
            console.log(verificationId)
            navigation.navigate("PhoneVerify", { verificationid: verificationId })
    

      } catch (err) {
        Notifier.showNotification({
          title: 'Warning',
          description: 'something went wronge! try again later',
          duration: 3000,
          showAnimationDuration: 800,
          showEasing: Easing.bounce,
          hideOnPress: true,
        });
        console.log(err)
        setLoading(false)
      }

    }
    else {
      Notifier.showNotification({
        title: 'Warning',
        description: 'Please input correct phone number!',
        duration: 3000,
        showAnimationDuration: 800,
        showEasing: Easing.bounce,
        hideOnPress: true,
      });
      setLoading(false);
    }
  }
  return (
    <>
      <View className="basis-1/6"></View>
      <View className="flex flex-row ">
      <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        
        />
        <PhoneInput
          ref={phoneInput}
          defaultValue={value}
          defaultCode="US"
          containerStyle={{ width: '70%', borderTopLeftRadius: 8, borderBottomLeftRadius: 8, backgroundColor: 'transparent', borderWidth: 1, borderColor: '#706D8B' }}
          textInputStyle={{ color: "#262259", fontFamily: 'Nunito_400Regular' }}
          codeTextStyle={{ color: "#262259", fontFamily: 'Nunito_400Regular', marginLeft: -20, }}
          flagButtonStyle={{ color: "#262259", fontFamily: 'Nunito_400Regular', marginLeft: 0 }}
          onChangeText={(text) => {
            setValue(text);
          }}
          onChangeFormattedText={(text) => {
            setFormattedValue(text);
          }}
          autoFocus
        />
       
        <TouchableOpacity
          className="bg-[#6D61FD] flex-1 flex flex-row justify-center items-center"
          style={{ borderTopRightRadius: 8, borderBottomRightRadius: 8, borderWidth: 1, borderColor: '#706D8B' }}
          onPress={signWithPhoneNumber}
        >
          {(loading ?
            <ActivityIndicator
              size='large'
              visible={loading}
              textContent={'Loading...'}
              textStyle={{ color: '#6d61fd' }}
            /> : "")}
          <Text className="text-[#fff] px-[20] py-[5]" style={{ fontFamily: 'Nunito_400Regular' }}>
            Send OTP
          </Text>
        </TouchableOpacity>
        {/* {attemptInvisibleVerification && <FirebaseRecaptchaBanner />} */}
      </View>
    </>
  )
}