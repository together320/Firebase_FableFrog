import React, {useState, useEffect} from 'react'
import { TextInput, View, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native'
import Text from '../../components/MyText'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import ContentHeader from '../../components/ContentHeader'
import FableTrending from '../../components/FableTrending'
import FableTopicContainer from '../../components/FableTopicContainer'
import FableNavigation from '../../components/FableNavigation'

export default function MainScreen(props) {
    const [value, setValue] = useState("Trending");
    const [loading, setLoading] = useState(false);
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
            scrollEventThrottle={400} keyboardShouldPersistTaps='handled'>
            <ContentHeader/>
            <View className="mt-[30] mb-[16]">
                <View className="flex-row justify-center items-center">
                    {
                        value === "Trending" ?
                        <>
                            <Text className="text-[15px] text-[#262259]">
                                On the Rise&nbsp;&nbsp;
                            </Text>
                            <MaterialIcon name="arrow-left" size={22} color="#706d8b"/>
                            <Text className="text-[15px] text-[#706D8B]" onPress={() => setValue("Following")}>&nbsp;&nbsp;Tracking</Text>
                        </>
                        :
                        <>
                            <Text className="text-[15px] text-[#706D8B]" onPress={() => setValue("Trending")}>
                                On the Rise&nbsp;&nbsp;
                            </Text>
                            <MaterialIcon name="arrow-right" size={22} color="#706D8B"/>
                            <Text className="text-[15px] text-[#262259]">&nbsp;&nbsp;Tracking</Text>
                        </>
                    }
                </View>
            </View>
            <FableTrending/>
            <View className="mt-[30]">
                <FableTopicContainer type="HOME" value={value} loading={loading} setLoading={setLoading}/>
            </View>
            <View className="h-[150]"/>
        </ScrollView>
    </View>
    <FableNavigation/>
    </>
    )
}