import React, {useState, useContext} from 'react'
import { TextInput, View, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, PixelRatio} from 'react-native'
import Text from '../../components/MyText'
import { PrimaryText } from '../../components/FableText'
import FableNavigation from '../../components/FableNavigation'
import FableTitle from '../../components/FableTitle'
import DialogContext from '../../contexts/dialogContext'

function Suggestions({item}) {
    const dialogCtx = useContext(DialogContext);
    return <View className="flex bg-[#eeedf0] w-full p-4 mb-6 rounded-[10px]">
        <PrimaryText onPress={() => {console.log(item.title);dialogCtx.showShareYourFable(item.title)}}
            className={`${PixelRatio.get() > 2 ? "text-[17px]" : "text-[14px]"}`}>
            {item.title}
        </PrimaryText>
    </View>
}

export default function SuggestScreen(props) {
    const details = [
        {
          "title": "What’s it like traveling to… living in XYZ",
          "id": "5ov1xsNEyJ"
        },
        {
          "title": "First time having sex stories",
          "id": "WvVuUV6wgb"
        },
        {
          "title": "Graduation day/first day of school stories",
          "id": "vPw654aYJC"
        },
        {
          "title": "Car hacks(carpool lane, handicap spot)",
          "id": "WhA5ch207E"
        },
        {
          "title": "What it’s like being a _____",
          "id": "UFuBEei9DR"
        },
        {
          "title": "What it’s like working at walmart/costco...etc",
          "id": "0EzkhirziF"
        },
        {
          "title": "Work stories",
          "id": "550tHDDBmX"
        },
        {
          "title": "What Call Me Maybe/Gangam Style Era was like in 2012",
          "id": "Y6eN7nYvEw"
        },
        {
          "title": "What it was like living in 2009/2010/2011, etc",
          "id": "lNiQLrVOSx"
        },
        {
          "title": "Elementary school stories",
          "id": "Tf1QFSgygX"
        },
        {
          "title": "Top 10 cereals and overall favorite cereal",
          "id": "ymZvLU9yZz"
        },
        {
          "title": "Top 10 favorite drinks and why",
          "id": "meDKvVna66"
        },
        {
          "title": "Showers or baths?",
          "id": "Gpy8vFOxgu"
        },
        {
          "title": "Your current closet",
          "id": "O0tapUr932"
        },
        {
          "title": "Favorite color.",
          "id": "hkvZgjvPsj"
        },
        {
          "title": "Favorite video game now",
          "id": "xiE1fT9Cle"
        },
        {
          "title": "Favorite video game as a child",
          "id": "vsL8gvIsge"
        },
        {
          "title": "Least favorite pokemon",
          "id": "stoRHeq5N8"
        },
        {
          "title": "Favorite pokemon",
          "id": "3F1YlEbfHK"
        },
        {
          "title": "Favorite vlog'er",
          "id": "gKiBQI7E8y"
        },
        {
          "title": "Recent YouTube videos you've watched…",
          "id": "CBVQLoGTDl"
        },
        {
          "title": "Favorite holiday",
          "id": "bYiGIg7JaR"
        },
        {
          "title": "Turning 10, 20, 30, 40, etc…",
          "id": "rjPE4q0qeU"
        },
        {
          "title": "Where do you want to be in 5 years?",
          "id": "eOM9SelFt6"
        },
        {
          "title": "What type of car do you have?",
          "id": "x0VDzWNhKK"
        },
        {
          "title": "What did you want to be as a child?",
          "id": "rJ77ADuyhv"
        },
        {
          "title": "Best friend growing up",
          "id": "aoF7wSHXH8"
        },
        {
          "title": "Least favorite high school teacher",
          "id": "UwNtwKZfaP"
        },
        {
          "title": "Favorite high school teacher ",
          "id": "zwn1nnvtEZ"
        }
      ];

    return (
    <>
    <View class="flex">
        <ScrollView className={`flex flex-col h-screen px-[32]  ${PixelRatio.get() > 2 ? "pt-[60]" : "pt-[20]"} m-[0] bg-[#FBFAFD]`}>
            <View className="mt-[50]"></View>
            <FableTitle title={"Suggestions"} content={"Need some ideas? Browse some of our fable suggestions!"}/>
            <View className="mt-[20]"></View>
            {
                details.map((item, i) => {
                    return <Suggestions key={i} item={item} />
                })
            }
        </ScrollView>
    </View>
    <FableNavigation/>
    </>
    )
}