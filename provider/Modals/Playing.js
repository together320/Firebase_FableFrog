
import { useState, useContext, useEffect } from 'react';
import { View } from 'react-native'
import BottomAudioSlider from '../../components/FableAudio/BottomAudioSlider';
import FableNavigation from '../../components/FableNavigation';


export default function Playing(props) {
  return (
    <>
    <View className={`rounded-t-[10px] absolute flex bottom-0 left-[0] right-[0] h-[310px] z-[5] bg-[#eeedf0] ${props.show ? 'block' : 'hidden'}`}>
      <BottomAudioSlider details={props.details} setShow={props.setShow}/> 
    </View>
    <FableNavigation cb={() => props.setShow(false)}/>
    </>
  )
}