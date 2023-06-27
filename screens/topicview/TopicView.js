import React, {useState, useEffect, useContext} from 'react'
import { Image, View, StyleSheet, TouchableOpacity, ImageBackground, ScrollView} from 'react-native'
import Text from '../../components/MyText'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Svg, { Defs, Rect, LinearGradient, Stop } from "react-native-svg";
import { PrimaryText } from '../../components/FableText'
import ContentHeader from '../../components/ContentHeader'
import { styled } from 'nativewind'
import FableTopicContainer from '../../components/FableTopicContainer'
import FableNavigation from '../../components/FableNavigation'
import DialogContext from '../../contexts/dialogContext';
import AuthContext from '../../contexts/authContext';
import { _subscribeTopic, _getSingleSubTopic } from '../../apis';
const FROM_COLOR = 'rgb(0, 0, 0)';
const TO_COLOR = 'rgb(0, 0, 0)';

const Button = ({ className, children, ...props }) => (
    <TouchableOpacity className={`${className}`} {...props}>{children}</TouchableOpacity>
)

function FableShareToggle(props) {
    return <View className="mr-[4] mb-[4] rounded-[240px]">
        <Button className={`rounded-[60px] bg-[#6d61fd] py-[10] ${props.selected ? 'bg-[#6d61fd]' : 'bg-[#706d8b20]'}`}
        {...props}>
            <Text className={`${props.selected ? 'text-[#eeedf0]' : 'text-[#262259]'} text-[13px] tracking-[0.5px] px-[16] py-[4]`}>{props.value.title}</Text>
        </Button>
    </View>
}

const InvertButton = styled(TouchableOpacity, 'px-[20] py-[10] rounded-[8px] border-[2px] border-[#6d61fd] text-[#6d61fd]');

export default function TopicViewScreen(props) {
    const dialogCtx = useContext(DialogContext);
    const authCtx = useContext(AuthContext);
    const [id, setId] = useState("kiJ3Zvf7SE");
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setId(props.route.params?.id);
    }, [props.route.params?.id])

    useEffect(() => {
        refreshTopic();
    }, [id])

    const refreshTopic = () => {
        _getSingleSubTopic(authCtx.getUserId(), id)
        .then((res) => {
            if (res.success === 1)
                setDetails(res);
        })
    }

    const handleChangeTopic = (item) => {
        setDetails(null);
        props.navigation.navigate('TopicViewScreen', {id: item.id})
    }

    const handleTrack = () => {
        console.log("handle track");
        _subscribeTopic(authCtx.getUserId(), id, true)
        .then((res) => {
            if (res.success === 1){
                refreshTopic();
            }
            else
                dialogCtx.showError(res.message);
        })
        .catch((e) => {
            dialogCtx.showError(e.message);
        })
    }

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 0;
        return layoutMeasurement.height + contentOffset.y ==
          contentSize.height - paddingToBottom;
    };

    return (
    <>
    <View class="flex">
        <ScrollView className="flex flex-col h-screen px-[32] bg-[#FBFAFD]" onScroll={({nativeEvent}) => {
                if (isCloseToBottom(nativeEvent)) {
                    console.log("ScrollView -> setloading true");
                    setLoading(true);
                }
            }}
            scrollEventThrottle={400}>
            <ContentHeader/>
            <View className="h-[56]"></View>
            <View className="flex flex-row flex-wrap">
                {
                    details?.topics.map((item, i) => {
                        return <FableShareToggle key={i}
                            value={item}
                            selected={id === item.id}
                            onPress={() => handleChangeTopic(item)}
                        />
                    })
                }
            </View>
            <View className="h-[16]"></View>
            <View className="flex">
                <Image 
                    source={{uri : details?.image}}
                    style={{resizeMode: 'cover',justifyContent: 'center'}}
                    className="rounded-[20px] bg-[#00000020]"
                />
                <ImageBackground source={{uri: details?.image}} imageStyle={{ borderRadius : 10}}
                style={{flex: 1,resizeMode: 'cover',justifyContent: 'center'}}>
                    <Svg height="100%" width="100%" style={ StyleSheet.absoluteFillObject }>
                        <Defs>
                            <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <Stop offset="0" stopColor={ FROM_COLOR } stopOpacity={0.12}/>
                                <Stop offset="1" stopColor={ TO_COLOR } stopOpacity={0.12}/>
                            </LinearGradient>
                        </Defs>
                        <Rect rx={10} ry={10} lx={10} ly={10} width="100%" height="100%" fill="url(#grad)"/>
                    </Svg>
                    <View className="rounded-[10px] min-h-[220px]">
                    </View>
                </ImageBackground>
            </View>
            <View className="h-[40]"></View>
            <View className="pb-[10]">
              <View className="flex flex-row items-center">
                    <PrimaryText className="mr-auto w-[70%]">
                        {details?.title}
                    </PrimaryText>
                    <View className="ml-8">
                        {details?.isTracking ?
                        <InvertButton className="ml-8" onPress={handleTrack}>
                            <Text className="text-[#6d61fd]">Untrack</Text>
                        </InvertButton> :

                        <TouchableOpacity className="ml-8 flex flex-row items-center px-[20] py-[10] rounded-[8px] border-[2px] border-[#6d61fd] " onPress={handleTrack}>
                            <MaterialIcon className="ml-[5]" name="add" size={18} color="#6d61fd"/>
                            <Text className="text-[#6d61fd]">Track</Text>
                        </TouchableOpacity>}
                    </View>
              </View>
            </View>
            <View className="mt-[30]">
                <FableTopicContainer type="TOPIC" value={id} loading={loading} setLoading={setLoading}/>
            </View>
            <View className="h-[100]"/>
        </ScrollView>
    </View>
    <FableNavigation/>
    </>
    )
}