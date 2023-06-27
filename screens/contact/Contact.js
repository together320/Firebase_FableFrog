import React, {useState, useContext} from 'react'
import { TextInput, View, StyleSheet, TouchableOpacity, Image, ScrollView, Alert} from 'react-native'
import { PrimaryText } from '../../components/FableText'
import FableNavigation from '../../components/FableNavigation'
import FableTitle from '../../components/FableTitle'
import DialogContext from '../../contexts/dialogContext'
import { FableContactInput } from '../../components/FableInput'
import { _contactUs } from '../../apis'
import Text from '../../components/MyText'
export default function ContactScreen(props) {
    const dialogCtx = useContext(DialogContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSend = () => { 
        if(name == "" || email == "" || message == ""){
            dialogCtx.showWarning("Input Error!");
            return;
        }
        _contactUs(name, email, message)
        .then((res) => {
            console.log("contact success");
            dialogCtx.showToast(res.email)
        })
        .catch((err) => {
            dialogCtx.showError(err)
        })
    }

    return (
    <>
    <View class="flex">
        <View className="flex flex-col h-screen px-[32]  m-[0] bg-[#FBFAFD]">
            <View className="mt-[56]"></View>
            <FableTitle title={"Contact our Service"} content={"Need help? Got a question?\nJust send us a message an we will get back to you as soon as possible."}/>
            <View className="mt-[20]"></View>
            <View className="pb-[4] flex">
                <FableContactInput
                    placeholder="Full Name *"
                    value={name}
                    onChangeText={setName}
                />
                <FableContactInput
                    placeholder="Email Address *"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            <View className="pb-8">
                <FableContactInput
                    multiline={true}
                    style={{textAlignVertical: 'top' }}
                    rows={4}
                    placeholder="Your Message"
                    value={message}
                    onChangeText={setMessage}
                />
            </View>
            <TouchableOpacity className="bg-[#6D61FD] h-[50] justify-center items-center w-[50%]" style={{ borderRadius: 8 }} onPress={handleSend}>
                <View className="flex-row">
                    <Text className="text-[16px] text-[#fff]">Contact Us</Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
    <FableNavigation/>
    </>
    )
}