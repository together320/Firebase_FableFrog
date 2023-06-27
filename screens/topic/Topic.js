import React, {useState, useContext, useEffect} from 'react'
import { View, ScrollView, PixelRatio} from 'react-native'
import Text from '../../components/MyText'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import { FableTopicKindItem } from '../../components/FableTopicItem'
import FableNavigation from '../../components/FableNavigation'

import { FableCommentText } from '../../components/FableText'
import DialogContext from '../../contexts/dialogContext'

import { _getTopics, _getSubTopics } from '../../apis/stories'
  
export default function TopicScreen(props) {
    const dialogCtx = useContext(DialogContext);
    const [topic, setTopic] = useState(null);
    const [details, setDetails] = useState(null);
    
    useEffect(() => {
      if (topic === null) {
        setDetails(null);
        _getTopics().then((res) => {
          setDetails(res)});
      }
      else {
        setDetails(null);
        _getSubTopics(topic.id)
        .then((res) => {
            setDetails(res);
        })
    }
    }, [topic])

    const renderSubHeader = () => {
        if(topic !== null)
            return <View className="flex-row mt-[10] items-center">
                <MaterialIcon name="arrow-back" size={24} onPress={() => setTopic(null)} color="#262259"/>
                <FableCommentText className="text-[#262259] tracking-[0.5px] ">
                    &nbsp;&nbsp;&nbsp;{topic.title}
                </FableCommentText>
            </View>
    }
    return (
    <>
    <View class="flex">
        <ScrollView className="flex flex-col h-screen px-[32] m-[0] bg-[#FBFAFD]">
            <View className={`${PixelRatio.get() > 2 ? "mt-[110]" : "mt-[70]"}`}></View>
            <View className="flex flex-row">
                <View className="flex-1 justify-center items-center">
                    <Text className="text-[#262259] text-[17px]">Topics&nbsp;&nbsp;&nbsp;<FontAwesomeIcon name="search-plus" size={20} color="#262259"/></Text>
                </View>
                <MaterialIcon name="info-outline" size={20} color="#706d8b" onPress={() => {dialogCtx.setShowPopup(true)}}/>
            </View>
            { renderSubHeader() }
            <View className="mt-[40]">
            </View>
            {
                topic === null ?
                details?.topics?.map((detail, i) => {
                    return <View className="flex-col" key={i} onStartShouldSetResponder={() => true}
                    onResponderRelease={() => {setTopic(detail);}}>
                            <FableTopicKindItem item={detail} />
                    </View>
                }) : details?.topics?.map((detail, i) => {
                  return <View className="flex-col" key={i} onStartShouldSetResponder={() => true}
                  onResponderRelease={() => {props.navigation.navigate('TopicViewScreen', {id: detail.id})}}>
                          <FableTopicKindItem item={detail} />
                  </View>
              })
            }
        </ScrollView>
    </View>
    <FableNavigation/>
    </>
    )
}