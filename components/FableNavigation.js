import React, {useState, useContext} from 'react'
import { View, TouchableOpacity,StyleSheet} from 'react-native'
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';

import FeatherIcon from 'react-native-vector-icons/Feather'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import EntypoIcon from 'react-native-vector-icons/Entypo'

import AudioSlider from './FableAudio/AudioSlider';

import AuthContext from '../contexts/authContext';
import * as RootNavigation from '../RootNavigation';
import Text from './MyText';
export default function FableNavigation(props) {
    const [visible, setVisible] = useState(false);
    const authCtx = useContext(AuthContext);

    const hideMenu = () => setVisible(false);

    const showMenu = () => setVisible(true);
    return (
        <>
        <View className="absolute mx-[32] h-[66px] bottom-[20px] left-[0] right-[0] px-[12] z-[99] flex flex-row bg-[#fff] rounded-[50px] justify-around items-center shadow">
            <EntypoIcon name="home" size={32} color="#262259" onPress={() => {RootNavigation.navigate('MainScreen'); props.cb?.()}}/>
            <FeatherIcon name="zoom-in" size={32} color="#706D8B" onPress={() => {RootNavigation.navigate('TopicScreen'); props.cb?.()}}/>
            <FontAwesomeIcon name="diamond" size={32} color="#706D8B" onPress={() => {RootNavigation.navigate('SuggestScreen'); props.cb?.()}}/>
            <MaterialIcon name="notifications-none" size={32} color="#706D8B" onPress={() => {RootNavigation.navigate('ActivityScreen'); props.cb?.()}}/>
            <Menu
                visible={visible}
                anchor={<FeatherIcon name="more-horizontal" size={32} color="#706D8B" onPress={showMenu}/>}
                onRequestClose={hideMenu}
            >
                <MenuItem textStyle={{color : '#262259', fontFamily : 'Nunito_400Regular'}} onPress={() => {RootNavigation.navigate('ProfileScreen', {id: authCtx.getUserId()}); props.cb?.()}}>Profile</MenuItem>
                <MenuDivider />
                <MenuItem textStyle={{color : '#262259', fontFamily : 'Nunito_400Regular'}}  onPress={() => {RootNavigation.navigate('ContactScreen'); props.cb?.()}}>Contact Us</MenuItem>
                <MenuItem textStyle={{color : '#262259', fontFamily : 'Nunito_400Regular'}}  onPress={() => {RootNavigation.navigate('TermScreen'); props.cb?.()}}>Term & Conditions</MenuItem>
                <MenuItem textStyle={{color : '#262259', fontFamily : 'Nunito_400Regular'}}  onPress={() => {RootNavigation.navigate('CopyrightScreen'); props.cb?.()}}>Copyright Policy</MenuItem>
                <MenuItem textStyle={{color : '#262259', fontFamily : 'Nunito_400Regular'}}  onPress={() => {RootNavigation.navigate('PrivacyScreen'); props.cb?.()}}>Private Policy</MenuItem>
                <MenuDivider />
                <MenuItem textStyle={{color : '#262259', fontFamily : 'Nunito_400Regular'}}  onPress={() => authCtx.logout()}>Log Out</MenuItem>
            </Menu>
        </View>
        </>
    )
}