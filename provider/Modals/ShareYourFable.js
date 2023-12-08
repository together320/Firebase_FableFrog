
import { useState, useContext, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Animated, ScrollView, PixelRatio, Dimensions} from 'react-native';
import {
    LineChart
  } from 'react-native-chart-kit';
import Text from '../../components/MyText';
import * as ImagePicker from 'expo-image-picker';
import * as RootNavigation from '../../RootNavigation';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { PrimaryText} from '../../components/FableText';
import { FableShareInput } from '../../components/FableInput';
import DialogContext from '../../contexts/dialogContext';
import AuthContext from '../../contexts/authContext';
import AudioSlider from '../../components/FableAudio/AudioSlider'
import { Modal} from '../../components/Modal'
import { pixelRatio, styled } from 'nativewind';
import {Slider} from '@miblanchard/react-native-slider';
import {_getTopics, _getSubTopics, _postFable} from '../../apis';
import {
    Audio, InterruptionModeAndroid, InterruptionModeIOS
  } from "expo-av";

const FableShareButton = styled(Text, 'px-[5px] py-[10px] bg-[#fbfafd] text-[#262259] flex text-center items-center justify-center rounded-[28px] border-[1px] border-[#6d61fd] text-[13px] mr-[2px]');

const Button = ({ className, children, ...props }) => (
    <TouchableOpacity className={`${className}`} {...props}>{children}</TouchableOpacity>
)

function FableShareToggle(props) {
    return <View className="mr-[4] mb-[4] rounded-[240px]">
        <Button className={`rounded-[60px] bg-[#6d61fd] py-[10] ${props.selected ? 'bg-[#6d61fd]' : 'bg-[#706d8b20]'}`}
        {...props}>
            <Text className={`${props.selected ? 'text-[#eeedf0]' : 'text-[#262259]'} text-[13px] tracking-[0.5px] px-[16] py-[4]`}>{props.value.title}</Text>
        </Button>
    </View>
}

const str_pad_left = (string, pad, length) => {
    return (new Array(length + 1).join(pad) + string).slice(-length);
}
const convertNumberToTime = (total_milli_seconds) => {
    if (total_milli_seconds < 0) {
        return '00:00'
    }
    let total_seconds = total_milli_seconds / 1000;
    total_seconds = Number((total_seconds).toFixed(0));

    let hours = Math.floor(total_seconds / 3600);
    let seconds_left = total_seconds - hours * 3600;
    let minutes = Math.floor(seconds_left / 60);
    let seconds = seconds_left - minutes * 60;

    let finalTime = str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds, '0', 2);
    return finalTime
}

export default function ShareYourFable(props) {
    /*------------------Dialog Provider-----------*/
    const dialogCtx = useContext(DialogContext);
    const authCtx = useContext(AuthContext);
    /*--------------------------------------------*/
    const [soundDb, setSoundDb] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    /*--------------------------------------------*/
    const fileRef = useRef(null);
    
    const [uploading, setUploading] = useState(false);
    const [topics, setTopics] = useState(null);
    const [subTopics, setSubTopics] = useState(null);

    const [step, setStep] = useState(0);
    const [record, setRecord] = useState(false);
    
    const [isUrl, setIsUrl] = useState(true);

    const [title, setTitle] = useState("");
    const [tempFile, setTempFile] = useState(null);
    const [voice, setVoice] = useState(100);
    const [topic, setTopic] = useState(null);
    const [subTopic, setSubTopic] = useState([]);
    const [imageUrl, setImageUrl] = useState(null);
    const [url, setUrl] = useState("https://app.fablefrog.com/dummy_cover.png");
    const [query, setQuery] = useState("");
    const [result, setResult] = useState([]);

    /*----------------Post Fable Picture-------*/

    /*------------------Topic-------------------*/
    useEffect(() => {
        _getTopics()
        .then((res) => {
            setTopics(res.topics);
        })
    }, []);

    useEffect(() => {
        if (query === "")
            setResult([]);
        else {
            /*fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&per_page=6&nojsoncallback=1&format=json&extras=url_m&api_key=9950947ed7d7f851721516b5115160be&text=${query}`)
            .then((res) => res.json())
            .then((res) => {
                setResult(res.photos.photo);
            })*/
            fetch(`https://api.unsplash.com/search/photos/?per_page=6&client_id=Z6i7uRBdIwjSl3nKq_NC2ILj7uDkU-10tLKxR7HJjPs&query=${query}`)
            .then((res) => res.json())
            .then((res) => {
                setResult(res.results);
            })
            
        }
    }, [query])
    
    useEffect(() => {
        setSubTopics(null);
        if (topic !== null) {
            _getSubTopics(topic.id)
            .then((res) => {
                setSubTopics(res.topics);
            })
        }
    }, [topic])
    /*------------------Audio--------------------*/
    const AudioRecorder = useRef(new Audio.Recording());
    const AudioPlayer = useRef(new Audio.Sound());

    const [RecordedURI, SetRecordedURI] = useState("");             //Is used for audio record url
    const [AudioPermission, SetAudioPermission] = useState(false);      //Is used for audio record permission
    const [IsRecording, SetIsRecording] = useState(false);      //Is used for handling recording status
    const [IsPLaying, SetIsPLaying] = useState(false);          //Is used for handling playing status
    const [recordCb, setRecordCb] = useState(null);             //stop recording, then change step so record object completely destroyed

    const [durationMillis, setDurationMills] = useState(0);     //Is used for handling current playing position
    /*-------------------------------------------*/

    useEffect(() => {           //render then get permission
        GetPermission();
      }, []);


    useEffect(() => {
        _getTopics()
        .then((res) => {
            setTopics(res.topics);
        })
    }, []);
    
    useEffect(()=>{
        setTitle(props.title);
    }, [props.title])

    useEffect(()=>{
        if(props.show)
            setStep(0);
    }, [props.show])

    useEffect(() => {
        if(step == 1){
            setDurationMills(0);
            setSoundDb([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            SetIsRecording(false);
        }
    }, [step])

    useEffect(() => {           //recording & recordcb changed then call recordcb
        if (IsRecording === false && recordCb !== null) {
            recordCb();
        }
    }, [IsRecording, recordCb])
    
    // Function to get the audio permission
    const GetPermission = async () => {
        const getAudioPerm = await Audio.requestPermissionsAsync();
        SetAudioPermission(getAudioPerm.granted);
    };

    // Function to start recording
    const StartRecording = async () => {
        try {
            // Check if user has given the permission to record
            if (AudioPermission === true) {
                try {
                    // Prepare the Audio Recorder
                    await Audio.setAudioModeAsync({
                        allowsRecordingIOS: true,
                        interruptionModeIOS : InterruptionModeIOS.MixWithOthers,
                        playsInSilentModeIOS: true,
                        shouldDuckAndroid: true,
                        interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
                        playThroughEarpieceAndroid: false,
                        staysActiveInBackground: true,
                    });
                    await AudioRecorder.current.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY)
                    /* await AudioRecorder.current.prepareToRecordAsync(
                        JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY = {
                            android: {
                              extension: '.m4a',
                              outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
                              audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
                              sampleRate: 44100,
                              numberOfChannels: 2,
                              bitRate: 128000,
                          },
                          ios: {
                              extension: '.m4a',
                              outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
                              audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MIN,
                              sampleRate: 44100,
                              numberOfChannels: 2,
                              bitRate: 128000,
                              linearPCMBitDepth: 16,
                              linearPCMIsBigEndian: false,
                              linearPCMIsFloat: false,
                          },
                          }))
                    ); */
                    AudioRecorder.current.setProgressUpdateInterval(50);
                    AudioRecorder.current.setOnRecordingStatusUpdate(({ metering, durationMillis, isRecording, isDoneRecording }) => {
                        if(isRecording){
                            setDurationMills(durationMillis);
                            console.log(metering);
                            setSoundDb(([first, ...others]) => [...others, metering + 194]);
                        }
                    });

                    // Start recording
                    await AudioRecorder.current.startAsync();
                    SetIsRecording(true);
                } catch (error) {
                    console.log(error);
                }
            } else {
                // If user has not given the permission to record, then ask for permission
                GetPermission();
            }
        } catch (error) {}
    };

    // Function to stop recording
    const StopRecording = async () => {
        try {
            // Stop recording
            await AudioRecorder.current.stopAndUnloadAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
            });
            // Get the recorded URI here
            const result = AudioRecorder.current.getURI();
            if (result) SetRecordedURI(result);

            // Reset the Audio Recorder
            AudioRecorder.current.setOnRecordingStatusUpdate(null);
            AudioRecorder.current = new Audio.Recording();

            const cb = () => {
                setStep(2);
                setVoice(100);
            }
            SetIsRecording(false);
            setRecordCb(() => cb);
        } catch (error) {}
    };

   /*  // Function to play the recorded audio
    const PlayRecordedAudio = async () => {
        try {
            // Load the Recorded URI
            await AudioPlayer.current.loadAsync({ uri: RecordedURI }, {}, true);

            // Get Player Status
            const playerStatus = await AudioPlayer.current.getStatusAsync();
            console.log("Duration" + playerStatus.durationMillis);
            // Play if song is loaded successfully
            if (playerStatus.isLoaded) {
                if (playerStatus.isPlaying === false) {
                    AudioPlayer.current.playAsync();
                    SetIsPLaying(true);
                }
            }
        } catch (error) {}
    };

    // Function to stop the playing audio
    const StopPlaying = async () => {
        try {
            //Get Player Status
            const playerStatus = await AudioPlayer.current.getStatusAsync();

            // If song is playing then stop it
            if (playerStatus.isLoaded === true)
            await AudioPlayer.current.unloadAsync();

            SetIsPLaying(false);
        } catch (error) {}
    }; */

    const handleClose = () => {
    };

    const MyBezierLineChart = () => {
        return (
          <>
            <LineChart
              data={{
                datasets: [
                  {
                    data: soundDb,
                  },
                ],
              }}
              width={220} // from react-native
              height={220}
              yAxisLabel={''}
              chartConfig={{
                backgroundColor: '#1cc910',
                backgroundGradientFrom: '#eff3ff',
                backgroundGradientTo: '#efefef',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 255) => `rgba(125, 125, 125, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </>
        );
      };
    
    const renderByStep = () => {
        if (step === 0) {
            return (<>
                    <View className="flex pt-[20] pb-[10]">
                        <PrimaryText>Give your fable a title:</PrimaryText>
                    </View>
                    <View className="flex pt-[10] pb-[10]">
                        <FableShareInput
                        value={title}
                        onChangeText={setTitle}
                        className="mb-4"
                        placeholder="Write a few words about your fable..."
                        />
                    </View>
                    <View className="flex pt-[10]">
                        <TouchableOpacity className="bg-[#6D61FD] h-[50] justify-center items-center w-[50%] ml-auto" style={{ borderRadius: 8 }}
                        onPress={() => {
                            if (title === "")
                                dialogCtx.showWarning("Input Fable Title");
                            else{
                                setDurationMills(0); setStep(1);setSoundDb([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);}}}>
                            <View className="flex-row">
                                <Text className="text-[16px] text-[#fff]">Continue</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </>)
        }
        if(step === 1){
            return (<>
                <View className={`flex flex-row ${PixelRatio.get() > 2 ? "pt-[20px]" : "pt-[10px]"} pb-[10] items-center justify-center`}>
                    <MaterialIcon name="mic" size={50} color={`${!IsRecording ? '#6D61FD' : '#cf222e'}`}/>
                    <Text className="ml-[20] font-normal text-[40px] text-[#262259]">{convertNumberToTime(durationMillis)}</Text>
                </View>
                <View className="flex flex-row items-center justify-center">
                    <MyBezierLineChart />
                </View>
                <View className={`flex ${PixelRatio.get() > 2 ? "pt-[20px]" : "pt-[10px]"}`}>
                    <TouchableOpacity className="bg-[#6D61FD] h-[50] justify-center items-center w-[50%] ml-auto" style={{ borderRadius: 8 }}
                    onPress={IsRecording ? StopRecording : StartRecording}>
                        <View className="flex-row">
                            <Text className="text-[16px] text-[#fff]">{IsRecording ? "Stop Recording" : "Start Recording"}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </>)
        }
        if(step === 2){
            return (<>
                <View className="flex pt-[20] pb-[10]">
                    {/* <AudioSlider audio={"https://parsefiles.back4app.com/JDHDpDyXmZHpD6jKwVj3Ld2L6LcgZtKBzvQ3VaqM/fbc83eb94836ce658b0368978412e394_recorder.wav"} step={step} show={props.show}
                    voice={voice}/> */}
                     <AudioSlider audio={RecordedURI} step={step} show={props.show} voice={voice}/>
                </View>
                <View className="flex pt-[10]">
                    <Text className="text-[#262259]">Voice Changer:</Text>
                </View>
                <View className="flex flex-row pt-[5] items-center px-[27px]">
                    <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
                        <Slider
                            minimumValue={0}
                            maximumValue={200}
                            value={voice}
                            onValueChange={(v) => setVoice(v)}
                            maximumTrackTintColor="#706d8b"
                            minimumTrackTintColor="#262259"
                            thumbStyle={{backgroundColor: '#262259',
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
                {/* <View className="flex flex-row pt-[10] items-center">
                    <View className="w-[20%]"/>
                    <View className="flex">
                        <Text>Voice Changer:</Text>
                    </View>
                    <TouchableOpacity className="flex flex-col items-center pl-[20]" onPress={() => setVoice(voice !== 1 ? 1 : 0)}>
                        <Image 
                            source={require('../../assets/voice-changer.png')}  
                            style={{width: 50, height: 50, borderRadius: 50/ 2, borderWidth : (voice == 1 ? 2 : 0), borderColor : '#6d61fd'}} 
                        />
                        <Text>Voice 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex pl-[20]" onPress={() => setVoice(voice !== 2 ? 2 : 0)}>
                        <Image 
                            source={require('../../assets/voice-changer.png')} 
                            style={{width: 50, height: 50, borderRadius: 50/ 2, borderWidth : (voice == 2 ? 2 : 0), borderColor : '#6d61fd'}} 
                        />
                        <Text>Voice 2</Text>
                    </TouchableOpacity>
                </View> */}
                <View className="flex flex-row pt-[20]">
                    <View className="flex-1"/>
                    <TouchableOpacity className="bg-[#6D61FD] h-[40] justify-center items-center w-fit mr-[10]" style={{ borderRadius: 8 }}
                    onPress = {() => setStep(1)}
                    >
                        <Text className="text-[16px] text-[#fff] px-[10px]">Record again</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-[#6D61FD] h-[40] justify-center items-center w-fit ml-auto" style={{ borderRadius: 8 }}
                    onPress = {() => setStep(3)}>
                        <Text className="text-[16px] text-[#fff] px-[10px]">Continue</Text>
                    </TouchableOpacity>
                </View>
            </>)
        }
        if(step == 3){
            const handleTopicChange = (value) => {
                setSubTopic([]);
                setTopic(value);
            }

            const handleSubTopicChange = (value) => {
                let _subTopic = [...subTopic];
                if (subTopic.includes(value))
                    _subTopic = _subTopic.filter(ele => ele !== value)
                else
                    _subTopic.push(value);
                setSubTopic(_subTopic);
            }

            const handleNext = () => {
                if (subTopic.length === 0)
                    dialogCtx.showWarning("Select Fable Topics");
                else
                    setStep(4);
            }
            return (<>
                    <View className="flex pt-[20] pb-[10]">
                        <PrimaryText>Topics</PrimaryText>
                    </View>
                    <View className="h-[90%]">
                        <ScrollView>
                            {
                                topic === null ? 
                                <>
                                    <View className="flex flex-row flex-wrap">
                                    {
                                        topics?.map((item, i) => {
                                            return <FableShareToggle key={i}
                                                value={item}
                                                selected={topic === item}
                                                onPress={() => handleTopicChange(item)}
                                            />
                                        })
                                    }
                                    </View>
                                </>
                                :
                                <>
                                    <View className="flex flex-row flex-wrap">
                                        <FableShareToggle
                                            value={topic}
                                            selected={true}
                                            onPress={() => handleTopicChange(null)}
                                        />
                                    </View>
                                    <View className="flex-row my-4">
                                        <PrimaryText>Sub Topics:</PrimaryText>
                                    </View>
                                    
                                        <View className= "flex flex-row flex-wrap">
                                        {subTopics?.map((item, i) => {
                                            return <FableShareToggle key={i}
                                                value={item}
                                                selected={subTopic.includes(item)}
                                                onPress={() => handleSubTopicChange(item)}
                                            />
                                        })}
                                        </View>
                                    
                                </>
                            }
                        </ScrollView>
                    </View>
                    <View className="flex pt-[10]">
                        <TouchableOpacity className="bg-[#6D61FD] h-[50] justify-center items-center w-[50%] ml-auto" style={{ borderRadius: 8 }}
                        onPress = {handleNext}>
                            <View className="flex-row">
                                <Text className="text-[16px] text-[#fff]">Continue</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
            </>)
        }
        if(step == 4){
            const handleUpload = async () => {
                let result = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true,
                    quality: 1,
                });
            
                if (!result.canceled) {
                    console.log(result.assets[0].uri);
                    setImageUrl(result.assets[0].uri);
                    setIsUrl(false);
                } else {
                    setIsUrl(true);
                    setUrl("https://app.fablefrog.com/dummy_cover.png");
                    console.log("did not select image");
                }
                console.log('handle upload');
            }

            const handleSearch = () => {
                setIsUrl(true);
                setUrl("");
                setQuery("");
                setImageUrl("");
            }

            const handleSubmit = () => {
                if (title === "") {
                    dialogCtx.showWarning("Input Fable Title");
                    setStep(0);
                    return;
                }

                if (RecordedURI === "") {
                    dialogCtx.showWarning("Record your fable");
                    setStep(1);
                    return;
                }

                if (subTopic.length === 0) {
                    dialogCtx.showWarning("Select Fable Topics");
                    setStep(3);
                    return;
                }

                if (url === "" && imageUrl === "")
                    dialogCtx.showWarning("Select Fable Cover Photo");
                else {
                    setUploading(true);
                    _postFable(
                        authCtx.getUserId(),
                        title,
                        voice,
                        RecordedURI,
                        subTopic,
                        imageUrl,
                        url,
                        isUrl
                    )
                    .then((res) => {
                        setUploading(false);
                        if (res.success === 1) {
                            dialogCtx.showToast(res.message);
                            RootNavigation.navigate('ProfileScreen', {id: authCtx.getUserId()});
                        }
                        else
                            dialogCtx.showError(res.message);
                    })
                    .catch((e) => {
                        dialogCtx.showError(e.message);
                    })
                }
            }

            return (<>
                    <View className="flex">
                        <View className="flex-row pt-[20] pb-[10]">
                        {
                            (isUrl === true && url === "") ? "" :
                            (
                                isUrl ? <Image style={{resizeMode: 'cover',justifyContent: 'center'}}
                                className="h-[160px] w-full mb-4  rounded-[20px] bg-[#00000020]"
                                source={{uri : url}}/> :
                            <Image style={{resizeMode: 'cover',justifyContent: 'center'}}
                            className="h-[160px] w-full mb-4  rounded-[20px] bg-[#00000020]"
                            source={{uri : imageUrl}}/>
                            )
                        }
                        </View>
                        <View className="flex-row">
                            <PrimaryText>Cover Photo</PrimaryText>
                        </View>
                        <View className="flex-row justify-center items-center">
                            <FableShareToggle
                                value={{title :'Upload Picture'}}
                                selected={false}
                                onPress={handleUpload}
                            />
                            <FableShareToggle
                                value={{title:'Search Picture'}}
                                selected={false}
                                onPress={handleSearch}
                            />
                        </View>
                        <View className="flex-row pt-[10] pb-[10]">
                            {
                                isUrl === false || url == "https://app.fablefrog.com/dummy_cover.png" || url != "" ? "" :
                                <View className="flex">
                                    <View className="flex-row items-center">
                                        <MaterialIcon name="search" size={25} color="#706d8b"/>
                                        <FableShareInput
                                        className="text-[15px] pl-[10] text-[#706d8b]"
                                        value={query}
                                        onChangeText={setQuery}
                                        placeholder="Search Image"
                                        />
                                    </View>
                                    <View className="h-[200px]">
                                        <ScrollView>
                                            <View className="flex flex-row flex-wrap justify-center">
                                            {
                                                result.map((item, i) => {
                                                    return <TouchableOpacity key={i} className="w-[30%] m-[5]" onPress={() => {console.log(item.urls.regular);setUrl(item.urls.regular)}}>
                                                            <Image style={{width: '100%', height: 160, borderRadius: 10, resizeMode: 'cover',justifyContent: 'center'}}
                                                            source={{uri : item.urls.regular}}/>
                                                        </TouchableOpacity>
                                                })
                                            }
                                            </View>
                                        </ScrollView>
                                    </View>
                                </View>
                            }
                        </View>
                    </View>
                    {
                    uploading ? 
                    <View className="flex pt-[10]">
                        <View className="flex-row bg-[#6D61FD] h-[50] justify-center items-center w-[50%] ml-auto" style={{ borderRadius: 8 }}>
                            <ActivityIndicator
                                //visibility of Overlay Loading Spinner
                                visible={uploading}
                                //Text with the Spinner
                                textContent={'Loading...'}
                                //Text style of the Spinner Text
                                textStyle={{color: '#FFF'}}
                            />
                            <Text className="text-[16px] text-[#fff] pl-[5]">Uploading</Text>
                        </View>
                    </View>
                    :
                    <View className="flex pt-[10]">
                        <TouchableOpacity className="bg-[#6D61FD] h-[50] justify-center items-center w-[50%] ml-auto" style={{ borderRadius: 8 }}
                        onPress={handleSubmit}>
                            <View className="flex-row">
                                <Text className="text-[16px] text-[#fff]">Post Fable</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    }
            </>)
        }
    }

    const handleCloseModal = () => {StopRecording(); props.setShow(false)};
    
    return (
      <Modal isVisible={true} closeModal={handleCloseModal}>
        <Modal.Container>
            <Modal.Header closeModal={handleCloseModal}/>
            <Modal.Body>
                <View className="flex max-h-[80%]">
                    <View className="flex-row ml-[-10px] w-[300px] overflow-x-auto">
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}>
                            <FableShareButton className={`w-[70px] h-[40px] ${Dimensions.get("window").width > 380 ? "px-[10px]" : ""} ${step == 0 ? 'border-[1px]' : 'border-[0px]'} ${PixelRatio.get() > 2 ? "text-[13px]" : "text-[13px]"}`} onPress={() => setStep(0)}>
                                Title
                            </FableShareButton>
                            <FableShareButton className={`w-[70px] h-[40px] ${Dimensions.get("window").width > 380 ? "px-[10px]" : ""} ${step == 1 || step == 2 ? 'border-[1px]' : 'border-[0px]'}`} onPress={() => setStep(1)}>
                                Recording
                            </FableShareButton>
                            <FableShareButton className={`w-[70px] h-[40px] ${Dimensions.get("window").width > 380 ? "px-[10px]" : ""} ${step == 3 ? 'border-[1px]' : 'border-[0px]'}`} onPress={() => setStep(3)}>
                                Topics
                            </FableShareButton>
                            <FableShareButton className={`w-[100px] h-[40px] ${Dimensions.get("window").width > 380 ? "px-[10px]" : ""} ${step == 4 ? 'border-[1px]' : 'border-[0px]'}`} onPress={() => setStep(4)}>
                                Cover&nbsp;Photo
                            </FableShareButton>
                        </ScrollView>
                    </View>
                    {renderByStep()}
                </View>
            </Modal.Body>
        </Modal.Container>
      </Modal>
    )
}

const styles = StyleSheet.create({
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    text: {
      fontSize: 16,
      fontWeight: "400",
      textAlign: "center",
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: "80%",
    },
    input: {
      paddingTop: 10,
      borderColor: "grey",
      borderBottomWidth: 2,
    },
    button: {
      flexDirection: "row",
      flex: 1,
      backgroundColor : "#f00"
    }
});