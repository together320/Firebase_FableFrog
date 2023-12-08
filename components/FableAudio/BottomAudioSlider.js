import React, { useState, useRef, useEffect, useContext } from "react";
import {
    TouchableOpacity,
    View,
    Image,
    Easing
} from "react-native";
import { SecondaryText, PrimaryText } from "../FableText";
import { Audio } from 'expo-av';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import {Slider} from '@miblanchard/react-native-slider';
import { _trackUser } from "../../apis";
import DialogContext from "../../contexts/dialogContext";
import AuthContext from "../../contexts/authContext";
import DigitalTimeString from './DigitalTimeString';
import PlayLogo from "../../assets/play-secondary.svg";
import PauseLogo from "../../assets/pause-secondary.svg";
import Text from "../MyText";
import { styled } from 'nativewind'

const speeds = [
    {title: "Normal", speed: 1},
    {title: "X1.5", speed: 1.5},
    {title: "X2", speed: 2},
    {title: "X2.5", speed: 2.5},
    {title: "X3", speed: 3},
]

const InvertButton = styled(TouchableOpacity, 'px-[20] py-[10] rounded-[8px] border-[2px] border-[#6d61fd] text-[#6d61fd]');

export default function BottomAudioSlider(props) {
    const dialogCtx = useContext(DialogContext);
    const authCtx = useContext(AuthContext);
    let playing = false;
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isTracked, setTracked] = useState(false);
    const AudioPlayer = useRef(new Audio.Sound());
    
    let isSeeking = false;
    const [speed, setSpeed] = useState(0);

    //mount
    useEffect(() => {
        try {
            setTracked(props.details.following);
            load()
        } catch (e) {
            console.log(e)
        }
    }, [props.details])

    //unmount
    useEffect(() => {
        return () => {
            console.log("unloaded");
            unload();
        }
    }, [])


    //speed control
    useEffect(() => {
        if(AudioPlayer.current._loaded && (props.details.voice == 100 || props.details.voice < 3))
            AudioPlayer.current.setRateAsync(speeds[speed].speed, true);
        console.log(speeds[speed].speed);
    }, [speed])
    

    useEffect(() => {
        playing = dialogCtx.playingStatus;
        console.log(playing);
        if(dialogCtx.playingStatus == true)
            play();
        else
            pause();
    }, [dialogCtx.playingStatus])

    const handleSpeed = () => {
        setSpeed((speed + 1) % speeds.length);
    }


    onPressPlayPause = async () => {
        if (dialogCtx.playingStatus) {
            await this.pause();
            return
        }
        await this.play();
    }

    play = async () => {
        const audioStatus = await AudioPlayer.current.getStatusAsync();

        if (audioStatus.isLoaded && audioStatus.isPlaying === false) {
            if(AudioPlayer.current._loaded){
                if (props.details.voice === undefined || props.details.voice === null)
                    AudioPlayer.current.setRateAsync(1);
                if (props.details.voice > 100)
                    AudioPlayer.current.setRateAsync(1 + props.details.voice / 500, false, 'Low');
                else if(props.details.voice == 100 || props.details.voice < 3)
                    AudioPlayer.current.setRateAsync(speeds[speed].speed, true);
                else
                    AudioPlayer.current.setRateAsync(props.details.voice / 300 + 0.7, false, 'High');       
            }

            if(currentTime == duration)
                await AudioPlayer.current.playFromPositionAsync(0);
            else    await AudioPlayer.current.playFromPositionAsync(currentTime);
            await AudioPlayer.current.setVolumeAsync(1);
            setDuration(audioStatus.durationMillis);
            dialogCtx.setPlayingStatus(true);
        }
    }

    pause = async () => {
        const audioStatus = await AudioPlayer.current.getStatusAsync();

        if (audioStatus.isLoaded) {
            if (audioStatus.isPlaying === true) {
                await AudioPlayer.current.pauseAsync();
                AudioPlayer.current.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
                dialogCtx.setPlayingStatus(false);
            }
        }
    }

    stop = async() => {
        const audioStatus = await AudioPlayer.current.getStatusAsync();

        if (audioStatus.isLoaded) {
            pause();
            dialogCtx.setPlayingStatus(false);
        }
    }
    
    const unload = async () => {
        try {
          await AudioPlayer.current.unloadAsync();
        } catch (e) {}
    };

    const load = async() => {
        if(props.details.audioFile != ""){
              try {
                console.log("load file : " + props.details.audioFile);
                await unload();
                AudioPlayer.current = new Audio.Sound();
                await Audio.setAudioModeAsync({allowsRecordingIOS: false});
                setCurrentTime(0);
                AudioPlayer.current.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);

                await AudioPlayer.current.loadAsync({ uri: props.details.audioFile }, {shouldPlay : playing, volume : 1.0}, false);
                    if (props.details.voice === undefined || props.details.voice === null)
                        AudioPlayer.current.setRateAsync(1);
                    if (props.details.voice > 100)
                        AudioPlayer.current.setRateAsync(1 + props.details.voice / 500, false, 'Low');
                    else if(props.details.voice == 100 || props.details.voice < 3)
                        AudioPlayer.current.setRateAsync(speeds[speed].speed, true);
                    else
                        AudioPlayer.current.setRateAsync(props.details.voice / 300 + 0.7, false, 'High');       
                /* const audioStatus = await AudioPlayer.current.getStatusAsync();
                setDuration(audioStatus.durationMillis); */
                setSpeed(0);
                await this.play();
            } catch (e) {
                console.log(e)
            }
        }
    }

    _onPlaybackStatusUpdate = status => {
        if (status.isLoaded && status.isPlaying) {
            setCurrentTime(status.positionMillis);
            setDuration(status.durationMillis);
            /* dialogCtx.setPlayingStatus(true); */
        }
        else {
            if(status.didJustFinish){
                setCurrentTime(status.durationMillis);
                dialogCtx.setPlayingStatus(false);
            }
          if (status.error) {
            console.log(`FATAL PLAYER ERROR: ${status.error}`);
          }
        }
    };

    _onSeekSliderValueChange = value => {
        if (!isSeeking) {
            isSeeking = true;
            pause();
        }
      };
    
    _onSeekSliderSlidingComplete = async value => {
        isSeeking = false;
        const seekPosition = value * duration;
        console.log("slider value : " + value + ", " + "seekPosition : " + seekPosition + ", " + "duration : " + duration);
        setCurrentTime(seekPosition);
        AudioPlayer.current.playFromPositionAsync(seekPosition);
        dialogCtx.setPlayingStatus(true);
//        props.setPlaying(true);
    };
    
    _getSeekSliderPosition = () => {
        if (duration != 0) {
          return (
            currentTime * 1.0 / duration
          );
        }
        return 0;
    }

    const handleTrack = () => {
        console.log('tracked');
        _trackUser(props.details.authorId, authCtx.getUserId())
        .then((res) => {
            console.log(res);
            if (res.success === 1)
                setTracked(res.isSubscribed)
            else
                dialogCtx.showError(res.message);
        })
        .catch((e) => {
            dialogCtx.showError(e.message);
        })
    }

    return (
        <>
        <View className="flex-row">
            <Image 
                source={{uri : props.details.photo}}
                className="w-[80px] h-[80px] rounded-tl-[10px] bg-center bg-cover relative"
            />
            <View className="flex h-[80px] ml-[20] mr-auto justify-center pt-[10px]">
                <View className="flex-row">
                    <SecondaryText className="text-[13px] text-[#706d8b]">{props.details.author}</SecondaryText>
                </View>
                <View className="flex-row mt-[10]">
                    {
                        authCtx.getUserId() === props.details.authorId ? "" :
                        authCtx.isLogin() === false ? "" :
                        isTracked ?
                        <InvertButton className="flex !border-none border-[0px] !px-[0px]" onPress={handleTrack}>
                            <Text className="text-[#6d61fd] !text-[17px]">Untrack</Text>
                        </InvertButton> :
                        <TouchableOpacity className="flex-row py-[10] rounded-[8px] !border-none border-[#6d61fd] !px-[0px]" onPress={handleTrack}>
                            <Text className="text-[#6d61fd] !text-[17px]">+ Track</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
            <View className="flex pt-[10] pr-[10]">
            {dialogCtx.playingStatus ? <PauseLogo width={60} height={60} onPress={onPressPlayPause}/>:
                <PlayLogo width={60} height={60} onPress={onPressPlayPause}/>}
            </View>
            <View className="flex pt-[10] pr-[10]">
                <SecondaryText onPress={() => {props.setShow(false)}}>
                    <MaterialIcon name="close" size={20} color="#706d8b"/>
                </SecondaryText>
            </View>
          </View>
      <View className="flex flex-row px-6 pt-4 items-center">
          <PrimaryText className="w-[60%]">{props.details.title.length > 30 ? props.details.title.slice(0, 30) + "..." : props.details.title}</PrimaryText>
          <TouchableOpacity onPress={handleSpeed} className="rounded-[8px] px-[20] py-[10] border-[1px] !w-[40%] border-[#706d8b] bg-[#00000000] justify-center items-center">
                <View className="flex-row">
                    <Text className="text-[16px] text-[#706d8b]">{speeds[speed].title}</Text>
                </View>
            </TouchableOpacity>
      </View>
      <View className="w-full px-6 h-[32px]">
          <View
            style={{
                flex: 0,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'stretch',
                paddingHorizontal : 6,
            }}
        >
            <View className="flex-row">
                <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
                
                <Slider
                    minimumValue={0}
                    maximumValue={1}
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
                }}>
                    <DigitalTimeString time={currentTime} />
                    <DigitalTimeString time={duration} />
            </View>
        </View>
      </View>
      </>
        
    );

}