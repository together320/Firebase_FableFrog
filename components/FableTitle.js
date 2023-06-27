import {View, PixelRatio} from 'react-native'
import FableLogo from "../assets/logo.svg";
import Text from './MyText';

export default function FableTitle(props) {
  return (
    <View>
        <Text className={`text-[#262259] ${PixelRatio.get() > 2 ? "text-[31px]" : "text-[24px]"} tracking-widest`} style={{ fontFamily: 'Nunito_700Bold'}}>{props.title}</Text>
        <Text className={`text-[#262259] ${PixelRatio.get() > 2 ? "text-[16px]" : "text-[14px]"} font-thim pt-[15]`} style={{ fontFamily: 'Nunito_400Regular'}}>{props.content}</Text>
    </View>
  );
}
