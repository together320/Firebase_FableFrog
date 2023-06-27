import React, {useContext , useState} from 'react'
import { TextInput, Text, View, Pressable, StyleSheet , Alert} from 'react-native'
import AuthContext from '../../contexts/authContext';
import { useRoute , useNavigation} from '@react-navigation/native'
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { Notifier, Easing, NotifierComponents } from 'react-native-notifier';
import {auth} from "../../services/firebase"
import { _signInWithPhone } from '../../apis';
import DialogContext from '../../contexts/dialogContext';
export default function PhoneVerify(props) {
  const route = useRoute();
  const navigation = useNavigation();
  const [verificationCode, setverificationCode] = useState("");
  const authCtx = useContext(AuthContext);
  const diagCtx = useContext(DialogContext);
  const { verificationid } = route.params;
 // console.log("Verification id : " + props.route.params?.id);
  const verify = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationid, verificationCode);
      await signInWithCredential(auth, credential).
        then((result) => {
          _signInWithPhone(result.user)
          .then((res) => {
              if (res.success === 1)
                  authCtx.setUserId(res.userId);
          })
          .catch((e) => { 
              diagCtx.showError(e.message);
          })
        }).
        catch((e) => {
          
          Notifier.showNotification({
            title: 'Warning',
            description: 'something went wronge! try again later',
            duration: 3000,
            showAnimationDuration: 800,
            showEasing: Easing.bounce,
            hideOnPress: true,
          });
          console.log(e)
        });

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
    }
  }
  return (
    <>
      <View className="basis-1/6 flex flex-row flex-1 w-full">
        <TextInput style={styles.input} onChangeText={(v)=>setverificationCode(v)}/>
        <Pressable
              className="bg-[#6D61FD] w-[auto] px-[10] py-[5] h-[56] justify-center flex"
              style={styles.button}
              onPress={verify}
        >
            <Text className="text-[#fff]">Phone Verify</Text>
        </Pressable>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    flex : 1,
    height: 56,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderTopLeftRadius : 8,
    borderBottomLeftRadius : 8,
    fontSize: 16,
  },
  button : {
    borderTopRightRadius : 8,
    borderBottomRightRadius : 8
  }
});