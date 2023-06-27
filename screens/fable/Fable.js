import React, {useState, useEffect} from 'react'
import { TextInput, View, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Text from '../../components/MyText'
import ContentHeader from '../../components/ContentHeader'
import FableTrending from '../../components/FableTrending'
import FableTopicContainer from '../../components/FableTopicContainer'
import FableNavigation from '../../components/FableNavigation'

export default function FableScreen(props) {
    const [loading, setLoading] = useState(false);
    const [randVal, setRandVal] = useState(0);

    useEffect(() => {
        setRandVal(props.route.params?.randVal);
    }, [props.route.params?.randVal])
    return (
    <>
    <View class="flex">
        <ScrollView className="flex flex-col h-screen px-[32] bg-[#FBFAFD]" keyboardShouldPersistTaps='handled'>
            <ContentHeader/>
            <View className="mt-[30]">
                <FableTopicContainer type="SINGLE" value={props.route.params?.id} loading={loading} setLoading={setLoading}
                randVal={randVal}/>
            </View>
        </ScrollView>
    </View>
    <FableNavigation/>
    </>
    )
}