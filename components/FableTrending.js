import { useContext, useState, useEffect } from "react";
import {View, TextInput, TouchableOpacity, ScrollView, StyleSheet, Button, Image, Alert} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { _subscribeTopic } from "../apis";
import { _getTrending } from "../apis";
import { PrimaryText, SecondaryTextSmall, SecondaryText, FableComment, FableCommentText, FableTopicText } from "./FableText";
import Text from "./MyText";
import AuthContext from "../contexts/authContext";
export default function FableTrending(props) {
    const authCtx = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [details, setDetails] = useState(null);

    const handleTrack = (item) => {
      console.log("handle track called");
        _subscribeTopic(authCtx.getUserId(), item.id, false)
        .then((res) => {
            if (res.success === 1) {
                setOpen(false);
            }
            else
                dialogCtx.showError(res.message);
        })
        .catch((e) => {
            dialogCtx.showError(e.message);
        })
    }

    useEffect(() => {
        if (open) {
            setDetails(null);
            _getTrending(authCtx.getUserId())
            .then((res) => {
                setDetails(res);
            })
        }
    }, [open])

    const renderTopic = (item, i) => {
        return <View className="flex flex-row mt-[32]" key={i}>
            <View className="flex-1 justify-center">
                <FableTopicText className="text-[#262259]">
                    {item.title}
                </FableTopicText>
            </View>
            <View className="flex-1 flex-row">
                <View className="basis-1/2 flex-row items-center">
                    <MaterialIcon name="people" size={14} color="#706d8b"/>
                    <FableTopicText  style={{ fontFamily: 'Nunito_400Regular'}}>
                        &nbsp;&nbsp;{item.users}
                    </FableTopicText>
                </View>
                <View className="basis-1/2 items-center">
                    <FableTopicText className="text-[#706d8b]" onPress={() => handleTrack(item)}>
                        Track
                    </FableTopicText>
                </View>
            </View>
    </View>
    }

    return (
        <View className="w-[240px]  mx-[auto] flex flex-col z-[10] h-[56]">
            <TouchableOpacity className="rounded-[8px] border-[1px] border-[#706D8B] flex flex-col justify-center h-[56]" onPress={() => {setOpen(!open)}}>
                <View className="absolute self-center flex flex-row items-center justify-center">
                    <Text className="text-[17px] text-[#262259]">Trending&nbsp;&nbsp;</Text>
                    <MaterialIcon name="whatshot" size={24} color="#262259"/>
                </View>
                <View className="self-end mr-[20]">
                    {open ? <FontAwesomeIcon name="chevron-up" size={10} color="#706D8B"/> : <FontAwesomeIcon name="chevron-down" size={10} color="#706D8B"/>}
                </View>
            </TouchableOpacity>
            {open &&
            <View className="top-[-12px] z-[20] bg-[#fff] px-[24] rounded-b-[8px] border-[1px] border-[#706D8B] border-t-[0]">
                {details?.topics?.map((item, i) => {
                    return renderTopic(item, i);
                })}
                <View className="h-[32]"/>
            </View>
            }
        </View>
    )
}