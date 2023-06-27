import {View, TouchableOpacity, ScrollView} from 'react-native'
import Text from './MyText';

const TopicButton = ({ className, children, ...props }) => (
  <TouchableOpacity className={`${className}`} {...props}>{children}</TouchableOpacity>
)
export default function FableTopicButtons(props) {
  return (
    <ScrollView className="flex flex-1 mt-[20]">
      <View className="flex-row flex-wrap">
          {props.topics.map((topic, i) => {
              return <TopicButton key={i} className="h-[56] border-[#706D8B] border-[2px] px-[30] justify-center m-[10]" style={{borderRadius : 8}}><Text className="text-[#22292E] text-[16px]">{topic}</Text></TopicButton>
          })}
      </View>
    </ScrollView>
  );
}