import React, {useState, useRef, useEffect, useContext} from 'react'
import { TextInput, View, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, ImageBackground} from 'react-native'
import Text from '../../components/MyText'
import * as ImagePicker from 'expo-image-picker';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { styled } from 'nativewind'
import { PrimaryTextLarge, FableItemBg, SecondaryText, FableComment, PrimaryTextSmall } from '../../components/FableText'
import FableTopicContainer from '../../components/FableTopicContainer'
import FableNavigation from '../../components/FableNavigation'
import { _getProfile, _uploadProfile, _uploadCover, _trackUser } from '../../apis'
import DialogContext from '../../contexts/dialogContext';
import AuthContext from '../../contexts/authContext';
const InvertButton = styled(TouchableOpacity, 'px-[20] py-[10] rounded-[8px] border-[2px] border-[#6d61fd] text-[#6d61fd]');

export default function ProfileScreen(props) {
    const dialogCtx = useContext(DialogContext);
    const authCtx = useContext(AuthContext);
    const [id, setId] = useState("");
    const [randVal, setRandVal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isMe, setIsMe] = useState(false);

    const profileRef = useRef(null);
    const coverRef = useRef(null);

    //-----for popup menu------
    const [visible, setVisible] = useState(false);
    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);

    const [details, setDetails] = useState(null);

    useEffect(()=>{
        console.log(props.route.params?.id);
        console.log(props.route.params?.randVal);
        setId(props.route.params?.id);
        setRandVal(props.route.params?.randVal);
    }, [props.route.params?.id, props.route.params?.randVal])

    useEffect(() => {
        setIsMe(authCtx.getUserId() === id);
        refreshProfile();
    }, [id, randVal])

    const refreshProfile = () => {
        console.log("getting profile : " + id);
        if(id == "")    return;
        _getProfile(id, authCtx.getUserId())
        .then((res) => {
            console.log(res.CoverImage);
            setDetails(res);
        })
        .catch((e) => {});
    }

    const handlePlayVoice = () => {
        console.log("play voice sample");
        dialogCtx.playVoiceSample(details.username, "Voice Sample", details.avatar, details.introFile);
    }
    const renderPlayVoice = () => {
        if (typeof(details?.introFile) !== "string")
                return "";
        return <TouchableOpacity className="flex flex-row items-center" onPress={handlePlayVoice}>
            <Text className="text-[#6d61fd]">
                Play Voice Sample&nbsp;&nbsp;
            </Text>
            <MaterialIcon className="ml-[5]" name="play-circle-outline" size={20} color="#6d61fd"/>
        </TouchableOpacity>
    }

    const handleUploadProfile = async() => {
        if(!isMe)   return;
        console.log("uploading profile");
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            _uploadProfile(id, result.assets[0].uri)
            .then((res) => {
                if (res.success === 1)
                    refreshProfile();
            })
        }
    }

    const handleUploadCover = async () => {
        if(!isMe)   return;
        console.log("uploading cover");
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            _uploadCover(id, result.assets[0].uri)
            .then((res) => {
                if (res.success === 1)
                    refreshProfile();
            })
        }
    }

    const handleTrackUser = () => {
        _trackUser(id, authCtx.getUserId())
        .then((res) => {
            refreshProfile();
        })
    }

    const renderOtherProfile = () => {
        return <View className="pb-8">
                <View className="flex flex-row">
                    <PrimaryTextLarge className="mr-auto">
                        {details?.username}
                    </PrimaryTextLarge>
                    <View className="ml-8">
                        {details?.following ?
                        <InvertButton className="ml-8" onPress={handleTrackUser}>
                            <Text className="text-[#6d61fd]">Untrack</Text>
                        </InvertButton> :

                        <TouchableOpacity className="ml-8 flex flex-row items-center px-[20] py-[10] rounded-[8px] border-[2px] border-[#6d61fd] " onPress={handleTrackUser}>
                            <MaterialIcon className="ml-[5]" name="add" size={18} color="#6d61fd"/>
                            <Text className="text-[#6d61fd]">Track</Text>
                        </TouchableOpacity>}
                    </View>
                </View>
                <FableComment className="my-2">
                    {details?.userBio}
                </FableComment>
                <View className="flex flex-row">
                  <View className="mr-4 flex-row items-center">
                      <Text className="mr-1 text-[#6D6D6D]">Tracked by</Text>
                      <Text className="pl-1 text-[#6d61fd]">
                          {details?.trackedBy}
                      </Text>
                  </View>
                  {renderPlayVoice()}
                </View>
          </View>
    }

    const renderMyProfile = () => {
        const handleOpenSettings = () => {
            console.log("handle open");
            hideMenu();
            dialogCtx.showEditProfile(details, refreshProfile);
        }

        const handleAddVoiceSample = () => {
            console.log("add voice");
            hideMenu();
            dialogCtx.showAddVoiceSample(refreshProfile);
        }

        return <View className="pb-8">
                <View className="flex flex-row">
                    <PrimaryTextLarge className="mr-auto">
                        {details?.username}
                    </PrimaryTextLarge>
                    <PrimaryTextLarge className="ml-8">
                    <Menu
                        visible={visible}
                        anchor={<FeatherIcon name="more-horizontal" size={32} color="#262259" onPress={showMenu}/>}
                        onRequestClose={hideMenu}
                    >
                        <MenuItem textStyle={{fontFamily : 'Nunito_400Regular', color : '#262259'}} onPress={handleOpenSettings}>Settings</MenuItem>
                        <MenuItem textStyle={{fontFamily : 'Nunito_400Regular', color : '#262259'}} onPress={handleAddVoiceSample}>{details?.introFile === null ? "Add a short voice sample" : "Update a short voice sample"}</MenuItem>
                    </Menu>
                    </PrimaryTextLarge>
                </View>
                <FableComment className="my-2">
                    {details?.userBio}
                </FableComment>
                <View className="flex mt-2">
                {/* <View className="mr-4">
                    <Text className="mr-4 text-[#6D6D6D]">Tracked by</Text>
                    <Text className="pl-1 text-[#6D6D6D]">
                        {details?.trackedBy}
                    </Text>
                </View> */}
                {renderPlayVoice()}
                </View>
        </View>
    }

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 0;
        return layoutMeasurement.height + contentOffset.y ==
          contentSize.height - paddingToBottom;
    };

    return (
    <>
    <View class="flex">
        <ScrollView className="flex flex-col h-screen px-[32] bg-[#FBFAFD]" onScroll={({nativeEvent}) => {
                if (isCloseToBottom(nativeEvent)) {
                    console.log("ScrollView -> setloading true");
                    setLoading(true);
                }
            }}
            scrollEventThrottle={400}>
            <TouchableOpacity className="flex pb-[30] pt-[40]" onPress={handleUploadCover}>
                { details?.CoverImage !== "/dummy_cover.png" ?
                    <ImageBackground source={{uri: details?.CoverImage}} imageStyle={{ borderRadius : 8}}
                    style={{flex: 1,resizeMode: 'cover',justifyContent: 'center'}} >
                        <View className="rounded-[10px] min-h-[220px]">
                        </View>
                        <TouchableOpacity className="flex justify-center items-center pb-[50]" onPress={handleUploadProfile}>
                            {
                                details?.avatar !== "/dummy_user.jpg" ?
                                    <Image 
                                    source={{uri : details?.avatar}}
                                    className="absolute w-[128px] h-[128px] rounded-[99px] bg-[#00000020]"
                                    /> :
                                    <Image 
                                    source={require('./dummy_user.jpg')}
                                    className="absolute w-[128px] h-[128px] rounded-[99px] bg-[#00000020]"
                                    /> 
                            }
                        </TouchableOpacity>
                    </ImageBackground> : 
                    <ImageBackground source={require('./dummy_cover.png')} imageStyle={{ borderRadius : 8}}
                    style={{flex: 1,resizeMode: 'cover',justifyContent: 'center'}}>
                        <View className="rounded-[10px] min-h-[220px]">
                        </View>
                        <TouchableOpacity className="flex justify-center items-center pb-[50]" onPress={handleUploadProfile}>
                            {
                                details?.avatar !== "/dummy_user.jpg" ?
                                    <Image 
                                    source={{uri : details?.avatar}}
                                    className="absolute w-[128px] h-[128px] rounded-[99px] bg-[#00000020]"
                                    /> :
                                    <Image 
                                    source={require('./dummy_user.jpg')}
                                    className="absolute w-[128px] h-[128px] rounded-[99px] bg-[#00000020]"
                                    /> 
                            }
                        </TouchableOpacity>
                    </ImageBackground>
                }
            </TouchableOpacity>
            <View className='h-[30]'/>
            {
            isMe ?
                <>
                    { renderMyProfile() }
                </> :
                renderOtherProfile()
            }
            <View>
                <FableTopicContainer type="PROFILE" value={id} loading={loading} setLoading={setLoading} randVal={randVal}/>
            </View>
            <View className="h-[150]"/>
        </ScrollView>
    </View>
    <FableNavigation/>
    </>
    )
}