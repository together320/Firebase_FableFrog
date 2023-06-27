
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

import {_postVoice} from '../../apis';
import {
    Audio
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

export default function AddVoiceSample(props) {
    /*------------------Dialog Provider-----------*/
    const dialogCtx = useContext(DialogContext);
    const authCtx = useContext(AuthContext);
    /*--------------------------------------------*/
    const [step, setStep] = useState(0);
    const [uploading, setUploading] = useState(false);
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
        if(step == 0){
            setDurationMills(0);
            SetIsRecording(false);
        }
        if(step == 1){

        }
    }, [step])

    useEffect(() => {
        if(RecordedURI != ""){
            handlePost();
        }
    }, [RecordedURI])

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

    //post recorded voice sample
    const handlePost = async() => {
        console.log("Voice Sample : " + RecordedURI);
        _postVoice(authCtx.getUserId(), RecordedURI)
        .then((res) => {
            if (res.success === 1){
                console.log("success");
                props.cb();
                props.setShow(false);
            }
            else
                dialogCtx.showError(res.message);
        })
        .catch((e) => {
            dialogCtx.showError(e.message);
        })
    }
    // Function to start recording
    const StartRecording = async () => {
        try {
            // Check if user has given the permission to record
            if (AudioPermission === true) {
                try {
                    // Prepare the Audio Recorder
                    await AudioRecorder.current.prepareToRecordAsync(
                        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
                    );
                    AudioRecorder.current.setOnRecordingStatusUpdate(({ durationMillis, isRecording, isDoneRecording }) => {if(isRecording) setDurationMills(durationMillis)});

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

            // Get the recorded URI here
            const result = AudioRecorder.current.getURI();
            if (result) SetRecordedURI(result);

            // Reset the Audio Recorder
            AudioRecorder.current.setOnRecordingStatusUpdate(null);
            AudioRecorder.current = new Audio.Recording();

            const cb = () => {
                setStep(1);
                setUploading(true);
                
            }
            SetIsRecording(false);
            setRecordCb(() => cb);
        } catch (error) {}
    };

    const renderByStep = () => {
        if(step === 0){
            return (<>
                <View className="flex flex-row pt-[40] pb-[10] items-center justify-center">
                    <MaterialIcon name="mic" size={50} color={`${!IsRecording ? '#6D61FD' : '#cf222e'}`}/>
                    <Text className="ml-[20] font-normal text-[40px] text-[#262259]">{convertNumberToTime(durationMillis)}</Text>
                </View>
                <View className="flex pt-[30]">
                    <TouchableOpacity className="bg-[#6D61FD] h-[50] justify-center items-center w-[50%] ml-auto" style={{ borderRadius: 8 }}
                    onPress={IsRecording ? StopRecording : StartRecording}>
                        <View className="flex-row">
                            {uploading ? 
                            <ActivityIndicator
                                //visibility of Overlay Loading Spinner
                                size='small'
                                visible={uploading}
                                //Text with the Spinner
                                textContent={'Loading...'}
                                //Text style of the Spinner Text
                                textStyle={{color: '#FFF'}}
                            /> : ""}<Text className="text-[16px] text-[#fff]">{IsRecording ? "Finish Recording" : "Start Recording"}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </>)
        }
        if(step === 1){
            return (<>
                <View className="flex flex-row pt-[40] pb-[10] items-center justify-center">
                    <MaterialIcon name="mic" size={50} color={`${!IsRecording ? '#6D61FD' : '#cf222e'}`}/>
                    <Text className="ml-[20] font-normal text-[40px] text-[#262259]">{convertNumberToTime(durationMillis)}</Text>
                </View>
                <View className="flex pt-[30]">
                    <TouchableOpacity className="bg-[#6D61FD] h-[50] justify-center items-center w-[50%] ml-auto" style={{ borderRadius: 8 }}>
                        <View className="flex-row">
                            {uploading ? 
                            <ActivityIndicator
                                //visibility of Overlay Loading Spinner
                                size='small'
                                visible={uploading}
                                //Text with the Spinner
                                textContent={'Loading...'}
                                //Text style of the Spinner Text
                                textStyle={{color: '#FFF'}}
                            /> : ""}<Text className="text-[16px] text-[#fff]">{"Uploading"}</Text>
                        </View>
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