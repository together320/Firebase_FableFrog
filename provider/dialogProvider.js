
import { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { Notifier, Easing, NotifierComponents } from 'react-native-notifier';
import ShareYourFable from './Modals/ShareYourFable';
import ShowPopup from './Modals/ShowPopup';
import ShowSharing from './Modals/ShowSharing';
import Playing from './Modals/Playing';
import ProfileSetting from './Modals/ProfileSetting';
import PostComment from './Modals/PostComment';
import AddVoiceSample from './Modals/AddVoiceSample';
import DialogContext from '../contexts/dialogContext';

import { _playFable } from '../apis';
export default function DialogProvider(props) {
	//----For record & play
	const [shareYourFable, setShareYourFable] = useState(false);

	//----Topics -> show popup
	const [showPopup, setShowPopup] = useState(false);

	//-----For sharing through whatsapp, facebook , twitter
	const [isSharing, setSharing] = useState(false);
	const [shareTitle, setShareTitle] = useState("");
	const [shareUrl, setShareUrl] = useState("");

	//-----For Postin Voice Sample
	const [addVoiceSample, setAddVoiceSample] = useState(false);
	//-----For fable play------
	const [playing, setPlaying] = useState(false);
	const [playingFable, setPlayingFable] = useState(null);
	const [playingStatus, setPlayingStatus] = useState(false);

	const [fableTitle, setFableTitle] = useState("");

	//-----For Record & Play
	const showShareYourFable = (title) => {
		setFableTitle(title);
		setShareYourFable(true);
	}

	//----For Post Recording--
	const [postComment, setPostComment] = useState(false);
	const [postCommentId, setPostCommentId] = useState("");
	const [postCommentCb, setPostCommentCb] = useState(null);

	//-----For Edit Profile
	const [editProfile, setEditProfile] = useState(false);
	const [editProfileDetails, setEditProfileDetails] = useState(null);
	const [editProfileCb, setEditProfileCb] = useState(null);
	
	//----------------
	useEffect(() => {
		if(playing == false)
			setPlayingStatus(false);
	}, [playing])
	//-----toast------
	const showWarning = (message) => {
		/* Notifier.showNotification({
			title: 'Warning!',
			description: message,
			duration: 3000,
			Component: NotifierComponents.Alert,
			componentProps: {
			  alertType: 'warn',
			},
			showAnimationDuration: 800,
			showEasing: Easing.bounce,
			hideOnPress: true,
		}); */
		Toast.show({
			type: 'error',
			text1: 'Warning!',
			text2: message,
			position : 'bottom',
			bottomOffset : 100
		});
	}

	const showError = (message) => {
		// Notifier.showNotification({
		// 	title: 'Error!',
		// 	description: message,
		// 	duration: 3000,
		// 	Component: NotifierComponents.Alert,
		// 	componentProps: {
		// 	  alertType: 'error',
		// 	},
		// 	showAnimationDuration: 800,
		// 	showEasing: Easing.bounce,
		// 	hideOnPress: true,
		// });
		Toast.show({
			type: 'error',
			text1: 'Error!',
			text2: message,
			position : 'bottom',
			bottomOffset : 100
		});
	}

	const showToast = (message) => {
		// Notifier.showNotification({
		// 	title: 'Success!',
		// 	description: message,
		// 	duration: 3000,
		// 	Component: NotifierComponents.Alert,
		// 	componentProps: {
		// 	  alertType: 'success',
		// 	},
		// 	showAnimationDuration: 800,
		// 	showEasing: Easing.bounce,
		// 	hideOnPress: true,
		// });
		Toast.show({
			type: 'success',
			text1: 'Success!',
			text2: message,
			position : 'bottom',
			bottomOffset : 100
		});
	}
	//----profile editor--
	const showEditProfile = (details, cb) => {
		setEditProfile(true);
		setEditProfileDetails(details);
		setEditProfileCb(() => cb);
	}

	//-----music player---
	const setPlayingHandler = (fable, playing) => {
		if (playingFable === null || playingFable.id !== fable.id) {
			console.log("requesting play count");
			_playFable(fable.id);
		}

		setPlayingFable(fable);
		setPlayingStatus(playing);
		setPlaying(true);
	}

	//-----sharing through whatsapp, facebook, twitter
	const showShare = (title, url) => {
		setSharing(true);
		setShareTitle(title);
		setShareUrl(url);
	}

	//-----profile play voice sample
	const playVoiceSample = (author, title, photo, audioFile) => {
		setPlaying(true);
		setPlayingFable({
			id: "",
			author,
			title,
			photo,
			audioFile
		});
		setPlayingStatus(true)
	}

	//-----Post Recording dialog----
	const showPostComment = (id, cb) => {
		setPostCommentId(id);
		setPostCommentCb(() => cb);
		setPostComment(true);
	}

	//-----Post Voice Sample----
	const showAddVoiceSample = (cb) => {
		setAddVoiceSample(true);
		setEditProfileCb(() => cb);
	}

	let context = {
		showShareYourFable,
		setShowPopup,
		showEditProfile,
		showShare,
		setPlaying: setPlayingHandler,
		showBottomPlayer : setPlaying,
		showWarning,
		showError,
		showToast,
		playVoiceSample,
		showPostComment,
		showAddVoiceSample,
		setPlayingStatus,
		playingStatus,
		playingFable,
		playing
	};

	return (
		<DialogContext.Provider value={context}>
			{props.children}
			{shareYourFable ? <ShareYourFable title={fableTitle} show={shareYourFable} setShow={setShareYourFable} /> : ""}
			<ShowPopup show={showPopup} setShow={setShowPopup}/>
			<ShowSharing show={isSharing} setShow={setSharing} title={shareTitle} url={shareUrl}/>
			<ProfileSetting show={editProfile} setShow={setEditProfile} details={editProfileDetails} cb={editProfileCb} />
			{playing === false ? "" :<Playing show={playing} setShow={setPlaying} details={playingFable} setDetails={setPlayingFable} className="absolute z-[0]"/>}
			{postComment === false ? "" : <PostComment show={postComment} setShow={setPostComment} id={postCommentId} cb={postCommentCb} />}
			{addVoiceSample === false ? "" : <AddVoiceSample show={addVoiceSample} setShow={setAddVoiceSample} cb={editProfileCb}/>}
		</DialogContext.Provider>
	);
};