
import { useState, useContext, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import * as RootNavigation from '../../RootNavigation';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Text from '../../components/MyText';
import DialogContext from '../../contexts/dialogContext';
import AuthContext from '../../contexts/authContext';
import AudioSlider from '../../components/FableAudio/AudioSlider'
import { Modal} from '../../components/Modal'
import { styled } from 'nativewind';
import {Slider} from '@miblanchard/react-native-slider';
import {
    LineChart
  } from 'react-native-chart-kit';

import {_postComment} from '../../apis';
import {
    Audio, InterruptionModeAndroid, InterruptionModeIOS
  } from "expo-av";

const Button = ({ className, children, ...props }) => (
    <TouchableOpacity className={`${className}`} {...props}>{children}</TouchableOpacity>
)

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

export default function PostComment(props) {
    /*------------------Dialog Provider-----------*/
    const dialogCtx = useContext(DialogContext);
    const authCtx = useContext(AuthContext);
    /*--------------------------------------------*/
    const [step, setStep] = useState(0);
    const [voice, setVoice] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [soundDb, setSoundDb] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    /*------------------Audio--------------------*/
    const AudioRecorder = useRef(new Audio.Recording());

    const [RecordedURI, SetRecordedURI] = useState("");             //Is used for audio record url
    const [AudioPermission, SetAudioPermission] = useState(false);      //Is used for audio record permission
    const [IsRecording, SetIsRecording] = useState(false);      //Is used for handling recording status
    const [recordCb, setRecordCb] = useState(null);             //stop recording, then change step so record object completely destroyed

    const [durationMillis, setDurationMills] = useState(0);     //Is used for handling current playing position
    /*-------------------------------------------*/

    useEffect(() => {           //render then get permission
        GetPermission();
      }, []);
    
    useEffect(()=>{
        if(props.show)
            setStep(0);
    }, [props.show])

    useEffect(() => {
        console.log(voice);
    }, [voice])

    useEffect(() => {
        if(step == 0){
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
                setStep(1);
                setVoice(100);
            }
            SetIsRecording(false);
            setRecordCb(() => cb);
        } catch (error) {}
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
        if(step === 0){
            return (<>
                <View className="flex flex-row pt-[30] pb-[30] items-center justify-center">
                    <MaterialIcon name="mic" size={50} color={`${!IsRecording ? '#6D61FD' : '#cf222e'}`}/>
                    <Text className="ml-[20] font-normal text-[40px] text-[#262259]">{convertNumberToTime(durationMillis)}</Text>
                </View>
                <View className="flex flex-row items-center justify-center">
                    <MyBezierLineChart />
                </View>
                <View className="flex pt-[10]">
                    <TouchableOpacity className="bg-[#6D61FD] h-[50] justify-center items-center w-[50%] ml-auto" style={{ borderRadius: 8 }}
                    onPress={IsRecording ? StopRecording : StartRecording}>
                        <View className="flex-row">
                            <Text className="text-[16px] text-[#fff]">{IsRecording ? "Stop Recording" : "Start Recording"}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </>)
        }
        if(step === 1){
            const handlePost = () => {
                setUploading(true);
                _postComment(
                    authCtx.getUserId(),
                    props.id,
                    RecordedURI,
                    voice
                )
                .then((res) => {
                    if (res.success === 1) {
                        props.cb();
                    }
                    else
                        dialogCtx.showError(res.message);
                    props.setShow(false);
                })
                .catch((e) => {
                    dialogCtx.showError(e.message);
                })
            }

            return (<>
                <View className="flex pt-[20] pb-[10]">
                     <AudioSlider audio={RecordedURI} step={step} show={props.show} voice={voice}/>
                </View>
                
                <View className="flex flex-col pt-[10]">
                    <View className="flex pt-[10] px-[40]">
                    <Text className="text-[#262259] text-[">Voice Changer:</Text>
                    </View>
                    <View className="flex flex-row pt-[5] items-center px-[40]">
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
                </View>
                <View className="flex flex-row pt-[20]">
                    <View className="flex-1"/>
                    <TouchableOpacity className="bg-[#6D61FD] h-[40] justify-center items-center w-fit px-[10px] mr-[10]" style={{ borderRadius: 8 }}
                    onPress = {() => setStep(0)}
                    >
                        <Text className="text-[16px] text-[#fff]">Record again</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-[#6D61FD] h-[40] justify-center items-center w-fit px-[10px] ml-auto" style={{ borderRadius: 8 }}
                    onPress = {handlePost}>
                        {uploading ? 
                            <ActivityIndicator
                                //visibility of Overlay Loading Spinner
                                visible={uploading}
                                //Text with the Spinner
                                textContent={'Loading...'}
                                //Text style of the Spinner Text
                                textStyle={{color: '#FFF'}}
                            /> : ""}
                        <Text className="text-[16px] text-[#fff]">Post</Text>
                    </TouchableOpacity>
                </View>
            </>)
        }
    }

    const handleCloseModal = () => {StopRecording(); props.setShow(false)};
    
    return (
      <Modal isVisible={true} closeModal={handleCloseModal}>
        <Modal.Container>
            <Modal.Header closeModal={handleCloseModal}/>
            <Modal.Body>
                <View className="flex">
                    {renderByStep()}
                </View>
            </Modal.Body>
        </Modal.Container>
      </Modal>
    )
}