import { useState } from "react";
import { Alert } from "react-native";
import * as RootNavigation from '../RootNavigation'

import AuthContext from '../contexts/authContext';

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function AuthProvider(props){
    const [userId, setUserId] = useState("");

    const setUserIdHandler = (userId) => {
//		localStorage.setItem("FABLEFROG_USER", userId);
		setUserId(userId);
//		window.location.reload();
	}

	const isLogin = () => {
		if (userId === null || userId === "" || userId === "undefined" || userId === undefined)
            return false;
		return true;
	}

	const getUserId = () => {
		if (isLogin())
			return userId;
		return "";
	}

	const logout = async () => {
/* 		_logout()
		.then((res) => {
			localStorage.removeItem("FABLEFROG_USER");
			setUserId("");
			window.location.reload();
		}) */
		try {
			await GoogleSignin.signOut();
//			await auth().signOut();
			setUserId("");
		} catch (error) {
			console.log(error);
		}
       // setUserId("");
	}

	const goToProfile = () => {
        RootNavigation.navigate('ProfileScreen', {id: getUserId()});
	}

	let context = {
		userId,
		setUserId: setUserIdHandler,
		getUserId,
		isLogin,
		logout,
		goToProfile,
	};

	return (
		<AuthContext.Provider value={context}>
			{props.children}
		</AuthContext.Provider>
	);
}