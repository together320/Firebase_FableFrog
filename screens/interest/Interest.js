import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import FableTitle from '../../components/FableTitle'
import FableSearch from '../../components/FableSearch'
import Text from '../../components/MyText'
import FableTopicButtons from '../../components/FableTopicButtons'
export default function InterestScreen(props) {
  const topics = ["Comedy", "Love and Dating", "Learning", "Sports", "Game", "Life Hacks", "Technology", "Family", "Foods", "Health",
  "Comedy", "Love and Dating", "Learning", "Sports", "Game", "Life Hacks", "Technology", "Family", "Foods", "Health",
  "Comedy", "Love and Dating", "Learning", "Sports", "Game", "Life Hacks", "Technology", "Family", "Foods", "Health","Comedy", "Love and Dating", "Learning", "Sports", "Game", "Life Hacks", "Technology", "Family", "Foods", "Health"
];
  return (
    <View className="flex-1 h-screen w-full m-[0] p-[15] bg-[#FBFAFD]">
        <View style={{justifyContent:'space-around'}}>
            <Text className="ml-[auto] h-[120]">Skip</Text>
            <FableTitle title="Select Your Topics" content="Get personalized content reccomendations"/>
            <FableSearch/> 
        </View>
        <FableTopicButtons topics={topics}/>
        <TouchableOpacity className="bg-[#6D61FD] mb-[10] items-center justify-center h-[56] mb-[40] mt-[20]" style={{ borderRadius: 8, boxShadow: '0px 16px 40px rgba(34, 41, 46, 0.15)' }}
        onPress={() => props.navigation.navigate('MainScreen')}>
            <Text className="text-[16px] text-[#fff] pl-[10]">Next</Text>
        </TouchableOpacity>
  </View>
    // <View className="flex flex-1 flex-col h-screen w-full m-[0] p-[15] bg-[#FBFAFD]">
    //     <Text className="ml-[auto] h-[120]">Skip</Text>
    //     <FableTitle title="Select Your Topics" content="Get personalized content reccomendations"/>
    //     <FableSearch/>
    //     <FableTopicButtons style={{flex:1,alignItems:'center',justifyContent:'center',alignSelf:'stretch',backgroundColor:'blue',margin:5}}/>
    //     <TouchableOpacity className="bg-[#6D61FD] mb-[10] items-center justify-center" style={{ borderRadius: 8, boxShadow: '0px 16px 40px rgba(34, 41, 46, 0.15)' }}
    //     onPress={() => props.navigate('PhoneVerifyOTP')}>
    //         <Text className="text-[16px] text-[#fff] pl-[10]">Next</Text>
    //     </TouchableOpacity>
    // </View>
  )
}