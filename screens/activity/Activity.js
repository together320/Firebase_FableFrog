import React, {useState, useEffect, useContext} from 'react'
import { View, ScrollView, Image, PixelRatio} from 'react-native'
import { PrimaryText, PrimaryTextLarge, SecondaryText } from '../../components/FableText'
import FableNavigation from '../../components/FableNavigation'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { _getUserActivity } from '../../apis'
import Text from '../../components/MyText'
import AuthContext from '../../contexts/authContext'
function Activity({item}) {
    return  <View className="flex flex-row mb-[15] items-center">
                <View className="flex rounded-[10px] mr-auto">
                    {
                    item.photo == '/dummy_user.jpg' ? <Image 
                    source={require('./dummy_user.jpg')}
                    className="w-[70px] h-[70px] rounded-[10px] bg-[#00000020]"
                    /> :
                    
                    <Image 
                        source={{uri : item.photo}}
                        className="w-[70px] h-[70px] rounded-[10px] bg-[#00000020]"
                    />
                    }
                </View>
                <View className="flex flex-1 justify-center ml-[30]">
                    <View className="flex-row">
                        <PrimaryText className={`text-[#6D6D6D] ${PixelRatio.get() > 2 ? "text-[17px]" : "text-[15px]"}`}>
                            {item.description.replace(/<.*?>/g, "")}
                        </PrimaryText>
                    </View>
                    <View className="flex-row items-center">
                        <MaterialIcon name="access-time" size={20} color="#6D6D6D"/>
                        <SecondaryText className='ml-[10] text-[#6D6D6D]'>{item.time}</SecondaryText>
                    </View>
                </View>
            </View>
}


export default function ActivityScreen(props) {
  const authCtx = useContext(AuthContext);
  const [details, setDetails] = useState(null);

    useEffect(() => {
        _getUserActivity(authCtx.getUserId())
        .then((res) => {
          setDetails(res);
        })
    }, []);

    return (
    <>
    <View class="flex">
        <ScrollView className={`flex flex-col h-screen px-[32] ${PixelRatio.get() > 2 ? "pt-[60]" : "pt-[20]"} m-[0] bg-[#FBFAFD]`}>
            <View className="mt-[50]"></View>
            <Text className={`text-[#262259] ${PixelRatio.get() > 2 ? "text-[31px]" : "text-[24px]"} tracking-widest pb-[10]`} style={{ fontFamily: 'Nunito_700Bold'}}>Recent user Activity{'\n'}</Text>
            {
                details?.stories.map((item, i) => {
                    return <Activity key={i} item={item} />
                })
            }
            <View className="h-[120]"/>
        </ScrollView>
    </View>
    <FableNavigation/>
    </>
    )
}