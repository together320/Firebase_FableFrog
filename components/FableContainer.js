import { View, Text, TouchableOpacity } from 'react-native'

import FableLogo from "../assets/logo.svg";
import FableTitle from './FableTitle';

export default function FableContainer(props) {
  return (
    <View className="flex flex-col h-screen w-full m-[0] p-[15] bg-[#FBFAFD]">
        <View className="basis-1/4"></View>
        <View className="basis-1/4">
            <FableLogo width={80} height={80} fill="white"/>
            <FableTitle title={props.title} content={props.content}/>
        </View>
        {props.subScreen}
    </View>
  );
}
