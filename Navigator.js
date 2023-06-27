import {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './RootNavigation';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import FableContainer from './components/FableContainer';

import WelcomeScreen from './screens/welcome/Welcome';
import PhoneVerifyOTP from './screens/welcome/PhoneVerifyOTP';
import PhoneVerify from './screens/welcome/PhoneVerify';

import InterestScreen from './screens/interest/Interest';
import MainScreen from './screens/main/Main';
import SuggestScreen from './screens/suggest/Suggest';
import TopicScreen from './screens/topic/Topic';
import TopicViewScreen from './screens/topicview/TopicView';
import ProfileScreen from './screens/profile/Profile';
import FableScreen from './screens/fable/Fable';
import ContactScreen from './screens/contact/Contact';
import TermScreen from './screens/term/Term';
import PrivacyScreen from './screens/privacy/Privacy';
import ActivityScreen from './screens/activity/Activity';
import CopyrightScreen from './screens/copyright/Copyright';
import AuthContext from './contexts/authContext';
const Stack = createNativeStackNavigator()

export default function RootNavigator() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer ref={navigationRef}>
        {authCtx.isLogin() ? 
        <Stack.Navigator
            initialRouteName="MainScreen"
            screenOptions={{  
            headerShown: false,
            }}
        >
            <Stack.Screen name="MainScreen">
            {(props) => <MainScreen {...props}/>}
            </Stack.Screen>
            <Stack.Screen name="SuggestScreen">
            {(props) => <SuggestScreen {...props}/>}
            </Stack.Screen>
            <Stack.Screen name="TopicScreen">
            {(props) => <TopicScreen {...props}/>}
            </Stack.Screen>
            <Stack.Screen name="TopicViewScreen">
            {(props) => <TopicViewScreen {...props}/>}
            </Stack.Screen>
            <Stack.Screen name="ProfileScreen">
            {(props) => <ProfileScreen {...props}/>}
            </Stack.Screen>
            <Stack.Screen name="FableScreen">
            {(props) => <FableScreen {...props}/>}
            </Stack.Screen>
            <Stack.Screen name="ContactScreen">
            {(props) => <ContactScreen {...props}/>}
            </Stack.Screen>
            <Stack.Screen name="TermScreen">
            {(props) => <TermScreen {...props}/>}
            </Stack.Screen>
            <Stack.Screen name="CopyrightScreen">
            {(props) => <CopyrightScreen {...props}/>}
            </Stack.Screen>
            <Stack.Screen name="PrivacyScreen">
            {(props) => <PrivacyScreen {...props}/>}
            </Stack.Screen>
            <Stack.Screen name="ActivityScreen">
            {(props) => <ActivityScreen {...props}/>}
            </Stack.Screen>
        </Stack.Navigator> : 
        <Stack.Navigator
            initialRouteName="WelcomeScreen"
            screenOptions={{  
            headerShown: false,
            }}
        >
            <Stack.Screen name="WelcomeScreen">
            {(props) => <FableContainer {...props} title="Welcome to FableFrog" content="Record and share audio with your friends" subScreen={<WelcomeScreen navigate={props.navigation.navigate}/>} />}
            </Stack.Screen>
            <Stack.Screen name="PhoneVerifyOTP">
            {(props) => <FableContainer {...props} title="Phone Verification" content="In order to login from phone, you must verify your phone number with a verification code." subScreen={<PhoneVerifyOTP navigate={props.navigation.navigate}/>} />}
            </Stack.Screen>
            <Stack.Screen name="PhoneVerify">
            {(props) => <FableContainer {...props} title="Phone Verification" content="In order to login from phone, you must verify your phone number with a verification code." subScreen={<PhoneVerify navigate={props.navigation.navigate}/>} />}
            </Stack.Screen>
        </Stack.Navigator>
        }
    </NavigationContainer>
  )
}