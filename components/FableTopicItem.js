
import { useContext, useState, useEffect } from "react";
import {View, ImageBackground, StyleSheet, Image, TouchableOpacity, Platform, PixelRatio} from 'react-native';
import * as Progress from 'react-native-progress';
import * as RootNavigation from '../RootNavigation';
import * as FileSystem from 'expo-file-system';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { pixelRatio, styled } from "nativewind";
import ImageView from "react-native-image-viewing";
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from "expo-sharing";
import { FableCommentLarge, SecondaryText, FableItemText, FableItemTextLarge, FableTopicText, FableCommentText, FableTopicTextLarge } from "./FableText";
import Svg, { Defs, Rect, LinearGradient, Stop } from "react-native-svg";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import AntIcon from 'react-native-vector-icons/AntDesign'
import FeatherIcon from 'react-native-vector-icons/Feather'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import DialogContext from "../contexts/dialogContext";
import AuthContext from "../contexts/authContext";
import PlayLogo from "../assets/play-primary.svg";
import PauseLogo from "../assets/pause-primary.svg";

import { _like, _getSingleStory, _deleteFable, _report, _getComments } from "../apis";
import Text from "./MyText";


const FROM_COLOR = 'rgb(0, 0, 0)';
const TO_COLOR = 'rgb(0, 0, 0)';

const FableItemTopic = styled(View, 'pt-[2] pr-[8] text-[#000] bg-[#fff] rounded-[10px] border-[1px] border-[#C8C7D3]');
const FableItemBg = styled(View, '');

export function FableTopicItem(props) {
    const dialogCtx = useContext(DialogContext);
    const authCtx = useContext(AuthContext);
    //-------------------------
    const [item, setItem] = useState(props.item);
    const [comments, setComments] = useState(false);
    const [details, setDetails] = useState(null);
    const [viewerOpen, setViewerOpen] = useState(false);
    //-----for popup menu------
    const [visible, setVisible] = useState(false);
    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);

    //-----for record play-----
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if(dialogCtx.playing == false)  setPlaying(false);
        else setPlaying(dialogCtx.playingStatus === true && dialogCtx.playingFable?.id === props.item.id);
    }, [dialogCtx.playingStatus, dialogCtx.playingFable, dialogCtx.playing])
    
    const refreshItem = () => {
        _getSingleStory(authCtx.getUserId(), item.id)
        .then((res) => {
            console.log("refreshed");
            setItem(res.story);
        })
    }

    const handleLike = () => {
        _like(authCtx.getUserId(), item.id)
        .then((res) => {
            refreshItem();
        })
    }

    useEffect(() => {
        if (comments)
            refreshComments();
    }, [comments]);

    const refreshComments = () => {
        setDetails(null);
        _getComments(authCtx.getUserId(), item.id)
        .then((res) => {
            setDetails(res.comments);
        })
    }

    //------for popup menu---
    const handleShare = () => {
        dialogCtx.showShare(item.title, `https://app.fablefrog.com/#/fable/${item.id}`);
    }

    const handleDownload = async () => {
        let audioParts = item.audioFile.split('.');
        let audioType = audioParts[audioParts.length - 1];

        const filename = `${item.title}.${audioType}`
        const fileUri = `${FileSystem.documentDirectory}${filename}`;
        console.log(fileUri);
 
        const callback = downloadProgress => {
            const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
            console.log(progress);
        };
        
        const downloadResumable = FileSystem.createDownloadResumable(
            item.audioFile,
            fileUri,
            {},
            callback
        );

        if (Platform.OS === 'ios') {
            const imageFileExts = ['jpg', 'png', 'gif', 'heic', 'webp', 'bmp'];
            if (isIos && imageFileExts.every(x => !downloadedFile.uri.endsWith(x))) {
                const UTI = 'public.item';
                const shareResult = await Sharing.shareAsync(downloadedFile.uri, {UTI});
            }
        } 
        else if (Platform.OS === 'android') {
            try {
                const { uri } = await downloadResumable.downloadAsync();
                console.log('Finished downloading to ', uri);
                try {
                    await MediaLibrary.requestPermissionsAsync();
                    const asset = await MediaLibrary.createAssetAsync(uri);
                    const album = await MediaLibrary.getAlbumAsync('Download');
                    if (album == null) {
                        await MediaLibrary.createAlbumAsync('Download', asset, false);
                    } else {
                        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
                    }
                    dialogCtx.showToast("Fable Audio Downloaded");
                } catch (e) {
                    handleError(e);
                }
            } catch (e) {
                console.error(e);
            }
        }
        hideMenu();
    }

    const handleReport = () => {
        _report(authCtx.getUserId(), item.id)
        .then((res) => {
            if (res.success === 1) {
                dialogCtx.showToast(res.message);
                refreshItem();
            }
            else
                dialogCtx.showError(res.message);
        })
        .catch((e) => {
            dialogCtx.showError(e.message);
        })
        hideMenu();
    }

    const handleDelete = () => {
        console.log("delete");
        _deleteFable(
            authCtx.getUserId(),
            item.id,
        )
        .then((res) => {
            console.log(res.success);
            if (res.success === 1) {
                dialogCtx.showToast(res.message);
                RootNavigation.navigate('ProfileScreen', {id: authCtx.getUserId(), randVal : Math.random()});
            }
            else
                dialogCtx.showError(res.message);
        })
        .catch((e) => {
            dialogCtx.showError(e.message);
        })
        hideMenu();
    }

    const renderContent = () => {
        return <>
            <View className="flex flex-col">
                <ImageBackground source={{uri: item.photo}} imageStyle={{ borderTopLeftRadius: 8, borderTopRightRadius : 8}} style={{flex: 1,resizeMode: 'cover',justifyContent: 'center'}}>
                    <Svg height="100%" width="100%" style={ StyleSheet.absoluteFillObject }>
                        <Defs>
                            <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <Stop offset="0" stopColor={ FROM_COLOR } stopOpacity={0}/>
                                <Stop offset="1" stopColor={ TO_COLOR } stopOpacity={0.86}/>
                            </LinearGradient>
                        </Defs>
                        <Rect width="100%" height="100%" fill="url(#grad)"/>
                    </Svg>
                    <View className="flex p-[12]">
                        <View className="flex-row">
                            <FableItemText className="text-[14px]" onPress={() => {dialogCtx.showBottomPlayer(false);RootNavigation.navigate('ProfileScreen', {id: item.authorId})}}>
                                {item.author}
                            </FableItemText>
                            <FableItemText className="ml-auto">
                                <MaterialIcon name="aspect-ratio" size={22} color="#fff" onPress={() => setViewerOpen(true)}/>
                            </FableItemText>
                        </View>
                        <View className="flex-row pt-[10]">
                            <FableItemTextLarge className="text-[20px]" onPress={() => {dialogCtx.showBottomPlayer(false);RootNavigation.navigate('FableScreen', {id: item.id, randVal : Math.random()})}}>
                                {item.title.length > 40 ? item.title.slice(0, 40) + "..." : item.title}
                            </FableItemTextLarge>
                        </View>
                        <View className="pt-[96]" />
                        <View className="flex flex-row items-center">
                            <View className="ml-[4] mr-[20] flex flex-row items-center">
                                <AntIcon name="hearto" size={25} color={item.isLikedByMe ? "#f00" : "#fff"} onPress={handleLike}/>
                                <FableItemText className="ml-[8] text-[15px]">
                                    {item.likes}
                                </FableItemText>
                            </View>
                            <View className="ml-[4] mr-[20] flex flex-row items-center">
                                <MaterialCommunityIcon name="comment-outline" size={25} color="#fff"/>
                                <FableItemText className="ml-[8] text-[15px]">
                                    {item.reply}
                                </FableItemText>
                            </View>
                            <View className="ml-[4] mr-[20] flex flex-row items-center">
                                <AntIcon name="playcircleo" size={25} color="#fff"/>
                                <FableItemText className="ml-[8] text-[15px]">
                                    {item.view}
                                </FableItemText>
                            </View>
                            <View className="ml-auto">
                                <Menu
                                    visible={visible}
                                    anchor={<FeatherIcon name="more-horizontal" size={20} color="#fff" onPress={showMenu}/>}
                                    onRequestClose={hideMenu}
                                >
                                    <MenuItem textStyle={{fontFamily : 'Nunito_400Regular'}} onPress={handleShare}><MaterialIcon name="share"color="#262259"/>&nbsp;&nbsp;Share</MenuItem>
                                    {authCtx.getUserId() !== item.authorId && (
                                        <MenuItem style={{fontFamily : 'Nunito_400Regular'}} onPress={handleReport}>
                                            <AntIcon name="exclamationcircleo" color="#262259"/>&nbsp;&nbsp;{item.isReportedByMe === false ? "Report" : "Unreport"}
                                        </MenuItem>
                                    )}
                                    <MenuItem textStyle={{fontFamily : 'Nunito_400Regular'}} onPress={handleDownload}><MaterialIcon name="file-download" color="#262259"/>&nbsp;&nbsp;Download</MenuItem>
                                    {authCtx.getUserId() === item.authorId && (
                                        <MenuItem textStyle={{fontFamily : 'Nunito_400Regular'}} onPress={handleDelete}>
                                            <MaterialIcon name="delete-outline" color="#262259"/>&nbsp;&nbsp;Delete
                                        </MenuItem>
                                    )}
                                </Menu>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
            
        </>
    }

    const renderFooter = () => {
        return <SecondaryText>
            {
                comments ? 
                <FableCommentText className="w-full flex px-6 py-[10px]" onPress={() => {setComments(false);dialogCtx.showBottomPlayer(false)}}>
                    <MaterialIcon name="close"/>
                    &nbsp;&nbsp;Close
                </FableCommentText>
                : 
                <FableCommentText className="w-full flex px-6 py-[10px]"  onPress={() => setComments(true)}>
                    Your reply here...
                </FableCommentText>
            }
        </SecondaryText>
    }

    const renderComment = () => {
        if (comments === false) return "";
        if (details === null) return "";

        const handleClick = () => {
            dialogCtx.showPostComment(item.id, refreshComments);
        }

        console.log("comment rendered");

        return <View className={`flex px-[10] ${PixelRatio.get() > 2 ? "py-[16]" : "py-[4]"} justify-center`}>
            {
                details.length === 0 ?
                <>
                    <FableCommentLarge className={`pb-[2] text-[#706d8b] ${PixelRatio.get() > 2 ? "text-[27px] pt-[10]" : "text-[16px] pt-[0]"}`}>
                        Comments not found.
                    </FableCommentLarge>
                    <FableCommentText className={`pb-[2] text-[#706d8b] ${PixelRatio.get() > 2 ? "text-[17px]" : "text-[12px]"}`}>
                        Be the first to leave an audio comment.
                    </FableCommentText>
                </>
                :
                details.map((item, i) => {
                    const playing = (dialogCtx.playingStatus === true && dialogCtx.playingFable?.id === item.id)
                    return <View key={i} className="flex flex-row mb-[5]">
                        <View className="flex rounded-[8px] mr-[5]">
                            <Image 
                                source={{uri : item.photo}}
                                className="w-[80px] h-[80px] rounded-[10px] bg-[#00000020]"
                            />
                        </View>
                        <View className="flex px-[4] py-[2] justify-center mr-[5]">
                            <SecondaryText className="pb-[2] text-[13px] text-[#706d8b]">
                                {item.author}
                            </SecondaryText>
                            <SecondaryText className=" text-[13px] text-[#706d8b]">{item.time}</SecondaryText>
                        </View>
                        <TouchableOpacity className="flex my-auto items-center" onPress={() => dialogCtx.setPlaying(item, !playing)}>
                            {
                                playing ?
                                <MaterialIcon name="pause-circle-filled" size={50} color="#706d8b"/>
                                :
                                <MaterialIcon name="play-circle-filled" size={50} color="#706d8b"/>
                            }
                        </TouchableOpacity>
                    </View>
                })
            }
            <View className={`flex-row ${PixelRatio.get() > 2 ? "pt-4" : "pt-1"} mr-[20]`}>
                <FableCommentText className={`w-full mr-auto flex flex-col justify-center text-[#6d6d6d]`}>
                    Press the mic icon to record a reply...
                </FableCommentText>
                 <MaterialIcon name="mic" size={24} color="#6d61fd" onPress={handleClick}/>
            </View>
        </View>
    }
    
    return <FableItemBg className="mb-[20]">
            <View className="rounded-t-[10px] relative">
                <View>
                    { renderContent() }
                </View>
                <View className="absolute top-[40%] right-[40px]">
                    {!playing ? <PlayLogo width={60} height={60} fill="white" onPress={() => {dialogCtx.setPlaying(item, !playing);}}/> : 
                    <PauseLogo width={60} height={60} fill="white" onPress={() => {dialogCtx.setPlaying(item, !playing);}}/>}
                    {/* <AntIcon name="playcircleo" size={58} color="#fff"  onPress={() => dialogCtx.setPlaying(item, !playing)}/> */}
                </View>
                
            </View>
            <View className="rounded-b-[10px] flex bg-[#EEEDF0] pl-[20]">
                <View className={`flex flex-row items-center ${PixelRatio.get() > 2 ? "h-[56]" : "h-[40]"}`}>
                    {renderFooter()}
                </View>
                {renderComment()}
            </View>
            {viewerOpen && (
                <ImageView
                images={[{uri : item.photo}]}
                imageIndex={0}
                visible={viewerOpen}
                onRequestClose={() => setViewerOpen(false)}
                />
            )}
        </FableItemBg>
}

export function FableSearchItem({item}) {
    const renderContent = () => {
        return <>
            <View className="flex-row py-[10] relative">
                <ImageBackground source={{uri: item.cover}} imageStyle={{ borderRadius : 8}}
                    style={{flex: 1,resizeMode: 'cover',justifyContent: 'center'}}>
                    <Svg height="100%" width="100%" style={ StyleSheet.absoluteFillObject }>
                        <Defs>
                            <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <Stop offset="0" stopColor={ FROM_COLOR } stopOpacity={0}/>
                                <Stop offset="1" stopColor={ TO_COLOR } stopOpacity={0.86}/>
                            </LinearGradient>
                        </Defs>
                        <Rect rx={10} ry={10} lx={10} ly={10} width="100%" height="100%" fill="url(#grad)"/>
                    </Svg>
                    <View className="flex mt-[65]" />
                    <View className="flex-row">
                        <FableItemText className="mb-[15] pl-[15]">
                            {item.username}
                        </FableItemText>
                    </View>
                    <View className="flex-row">
                        <FableItemTextLarge className="pl-[15]">
                            {item.title.length > 40 ? item.title.slice(0, 40) + "..." : item.title}
                        </FableItemTextLarge>
                    </View>
                    <View className="flex-row flex-wrap pl-[15] mt-[20]">
                    {
                        item.topics.map((topic, i) => {
                            return <FableItemTopic key={i} className="mr-[2] mt-[2] border-[0px] rounded-[8px] text-[#6D6D6D]">
                                <Text className="py-[2] px-[8] text-[#494667]">{topic}</Text>
                            </FableItemTopic>
                        })
                    }
                    </View>
                    <View className="flex mt-[15]" />
                </ImageBackground>
            </View>
        </>
    }

    return <>
            { renderContent() }
            </>
}

export function FableTopicKindItem({item}) {
    const renderContent = () => {
        return <>
            <View className="flex">
                <ImageBackground source={{uri: item.img}} imageStyle={{ borderRadius : 10}} style={{flex: 1,resizeMode: 'cover',justifyContent: 'center'}}>
                    <View className="rounded-[10px] absolute left-0 top-0 right-0 bottom-0 bg-[#00000070] "/>
                    {
                        PixelRatio.get() > 2 ?
                            <View className="px-[16] pt-[80] pb-[16] flex-row">
                                <FableTopicTextLarge className="text-[#fbfafd] w-[70%] tracking-[1px] pt-[10]">
                                    {item.title}
                                </FableTopicTextLarge>
                                <FableTopicText className="text-[#fbfafd] w-[25%] ml-auto tracking-[0.5px] pt-[10]">
                                    {item.participates} Participates
                                </FableTopicText>
                            </View> : 
                            <View className="px-[16] pt-[80] pb-[16] flex flex-col">
                            <FableTopicTextLarge className="text-[#fbfafd] tracking-[1px] pt-[10] !text-[20px]">
                                {item.title}
                            </FableTopicTextLarge>
                            <FableTopicText className="text-[#fbfafd] tracking-[0.5px] pt-[10] !text-[16px]">
                                {item.participates} Participates
                            </FableTopicText>
                        </View>
                    }
                </ImageBackground>
            </View>
        </>
    }

    return <FableItemBg className="mb-[20]">
    <View className="rounded-t-[10px]">
        <View>
            { renderContent() }
        </View>
    </View>
</FableItemBg>
}