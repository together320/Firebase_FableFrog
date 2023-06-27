import React, { useState, useRef, useEffect } from "react";
import {
    TouchableOpacity,
    View,
    Easing
} from "react-native";
import { Audio } from 'expo-av';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import {Slider} from '@miblanchard/react-native-slider';

import sleep from './sleep';
import DigitalTimeString from './DigitalTimeString';
import Text from "../MyText";
const TRACK_SIZE = 4;
const THUMB_SIZE = 20;

const DEFAULT_VALUE = 0.2;

export default function AudioSlider(props) {
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isSeeking, setSeeking] = useState(false);
    
    const AudioPlayer = useRef(new Audio.Sound());

    useEffect(() => {
        load();
    }, [])
    // Stop the audio when the component unmounts
    // (not exactly what you asked re React Router, but similar idea)
    useEffect(() => {
        return () => {
            unload();
        }
    }, [])

    useEffect(() => {
        if(AudioPlayer.current._loaded){
            if (props.voice === undefined || props.voice === null)
                AudioPlayer.current.setRateAsync(1);
            if (props.voice >= 100)
                AudioPlayer.current.setRateAsync(1 + props.voice / 500, false, 'Low');
            else
                AudioPlayer.current.setRateAsync(props.voice / 300 + 0.7, false, 'High');
        }
    }, [props.voice])

    onPressPlayPause = async () => {
        if (playing) {
            await this.pause();
            return
        }
        await this.play();
    }

    play = async () => {
        const audioStatus = await AudioPlayer.current.getStatusAsync();
        if (audioStatus.isLoaded && audioStatus.isPlaying === false) {
            await AudioPlayer.current.setVolumeAsync(1);
            await AudioPlayer.current.playFromPositionAsync(currentTime);
            console.log(audioStatus.durationMillis);
            setDuration(audioStatus.durationMillis);
            setPlaying(true);
        }
    }

    pause = async () => {
        const audioStatus = await AudioPlayer.current.getStatusAsync();

        if (audioStatus.isLoaded) {
            if (audioStatus.isPlaying === true) {
                await AudioPlayer.current.pauseAsync();
                AudioPlayer.current.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
                setPlaying(false);
            }
        }
    }

    stop = async() => {
        const audioStatus = await AudioPlayer.current.getStatusAsync();

        if (audioStatus.isLoaded) {
            pause();
            AudioPlayer.current.setPositionAsync(0);
            setPlaying(false);
        }
    }
    
    const unload = async () => {
        try {
          await AudioPlayer.current.unloadAsync();
        } catch (e) {}
    };

    const load = async() => {
        if(props.audio != ""){
            try {
                await unload();

                await Audio.setAudioModeAsync({allowsRecordingIOS: false});
                await AudioPlayer.current.loadAsync({ uri: props.audio }, {}, true);
                AudioPlayer.current.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);

                const audioStatus = await AudioPlayer.current.getStatusAsync();
                setDuration(audioStatus.durationMillis);
            } catch (e) {
                console.log(e)
            }
        }
    }

    _onPlaybackStatusUpdate = status => {
        if (status.isLoaded && status.isPlaying) {
            setCurrentTime(status.positionMillis);
            setDuration(status.durationMillis);
            setPlaying(true);
        } else {
            if(status.didJustFinish){
                setPlaying(false);
                setCurrentTime(0);
            }
          if (status.error) {
            console.log(`FATAL PLAYER ERROR: ${status.error}`);
          }
        }
    };

    _onSeekSliderValueChange = value => {
        if (!isSeeking) {
          setSeeking(true);
          pause();
        }
      };
    
    _onSeekSliderSlidingComplete = async value => {
        setSeeking(false);
        const seekPosition = value * duration;
        setCurrentTime(seekPosition);
        AudioPlayer.current.playFromPositionAsync(seekPosition);
    };
    
    _getSeekSliderPosition = () => {
        if (
            duration != 0
        ) {
          return (
            currentTime * 1.0 /
            duration
          );
        }
        return 0;
    }

    return (
        <View
            style={{
                flex: 0,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'stretch',
                paddingHorizontal : 15,
            }}
        >
            
            <View className="flex-row bg-[#fff] rounded-[25px] px-[10] mb-[10]">
                <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingRight: THUMB_SIZE,
                            zIndex: 2
                        }}
                        onPress={this.onPressPlayPause}
                    >
                    {
                        playing
                            ?
                            <MaterialIcons name="pause" size={20} color="black" />
                            :
                            <Entypo name="controller-play" size={20} color="black" />
                    }
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
                    <Slider
                        minimumValue={0}
                        maximumValue={1}
                        tapToSeek={true}
                        value={_getSeekSliderPosition()}
                        onValueChange={_onSeekSliderValueChange}
                        onSlidingComplete={_onSeekSliderSlidingComplete}
                        maximumTrackTintColor="#706d8b"
                        minimumTrackTintColor="#6d61fd"
                        thumbStyle={{backgroundColor: '#6d61fd',
                            borderRadius: 12 / 2,
                            height: 12,
                            shadowColor: 'black',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.35,
                            shadowRadius: 2,
                            width: 12,}}
                        trackStyle={{borderRadius: 3,
                            height: 5,}}
                    />
                </View>
            </View>
            <View style={{
                    flex: 0,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal : 15
                }}>
                    <DigitalTimeString time={currentTime} />
                    <DigitalTimeString time={duration} />
            </View>
        </View>
    );

}