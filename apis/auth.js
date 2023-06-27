import { location } from './config';
import { Alert } from 'react-native'
export const _signInWithGoogle = async (user) => {
    try {
        const formData = new URLSearchParams();
        formData.append('PROVIDER', 'GOOGLE');
        formData.append('EMAIL', user.email);
        formData.append('ID', user.id);
        formData.append('FULL-NAME', user.name);
        formData.append('DP', user.photo);

        const response = await fetch(
            `${location}/api/auth.php`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData.toString(),
            },
        );
        const responseJson = await response.json();
        return responseJson;
    } catch(e) {
        return e;
    }
}

export const _signInWithPhone = async (user) => {
    try {
        const formData = new URLSearchParams();
        formData.append('PROVIDER', 'PHONE');
        formData.append('PHONE', user.phoneNumber);
        formData.append('ID', user.uid);

        const response = await fetch(
            `${location}/api/auth.php`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData.toString(),
            },
        );
        const responseJson = await response.json();
        return responseJson;
    } catch(e) {
        return e;
    }
}

export const _trackUser = async (userId, ownerId) => {
    try {
        const formData = new URLSearchParams();
        formData.append('WHICH', 'TRACK-USER');
        formData.append('ID', ownerId);
        formData.append('USER', userId);

        const response = await fetch(
            `${location}/api/auth.php`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData.toString(),
            },
        );
        const responseJson = await response.json();
        return responseJson;
    } catch(e) {
        return e;
    }
}

export const _subscribeTopic = async (userId, topic, isSubTopic) => {
    try {
        const formData = new URLSearchParams();
        formData.append('WHICH', 'SUBSCRIBE-TOPIC');
        formData.append('ID', userId);
        formData.append('TOPIC', topic);
        formData.append('ISSUBTOPIC', isSubTopic);

        const response = await fetch(
            `${location}/api/auth.php`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData.toString(),
            },
        );
        const responseJson = await response.json();
        return responseJson;
    } catch(e) {
        return e;
    }
}

export const _getProfile = async (userId, ownerId) => {
    try {
        const formData = new URLSearchParams();
        formData.append('WHICH', 'PROFILE');
        formData.append('ID', userId);
        formData.append('USER', ownerId);

        const response = await fetch(
            `${location}/api/auth.php`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData.toString(),
            },
        );
        const responseJson = await response.json();
        return responseJson;
    } catch(e) {
        return e;
    }
}

export const _updateProfile = async (userId, userName, userBio, fbLink, twitterLink, instaLink, linkedinLink) => {
	try {
        const formData = new URLSearchParams();
        formData.append('WHICH', 'UPDATE-PROFILE');
        formData.append('ID', userId);
        formData.append('userName', userName);
        formData.append('fullName', '');
        formData.append('userBio', userBio);
        formData.append('fbLink', fbLink);
        formData.append('twitterLink', twitterLink);
        formData.append('instaLink', instaLink);
        formData.append('linkedinLink', linkedinLink);

        const response = await fetch(
            `${location}/api/auth.php`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData.toString(),
            },
        );
        const responseJson = await response.json();
        return responseJson;
    } catch(e) {
        return e;
    }
}

export const _getUserActivity = async (userId) => {
    try {
        const formData = new URLSearchParams();
        formData.append('WHICH', 'USER-ACTIVITY');
        formData.append('ID', userId);
        const response = await fetch(
            `${location}/api/auth.php`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData.toString(),
            },
        );
        const responseJson = await response.json();
        return responseJson;
    } catch(e) {
        return e;
    }
}
 
export const _uploadProfile = async (userId, imageUrl) => {
    console.log("uploading profile");
	let formData = new FormData();
	formData.append("WHICH", "UPLOAD-PROFILE");
	formData.append("ID", userId);

    let imageParts = imageUrl.split('.');
    let imageType = imageParts[imageParts.length - 1];
    formData.append('ProfileImage', {
        uri : imageUrl,
        name: `photo.${imageType}`,
        type: 'multipart/form-data', 
    });

    try {
        const response = await fetch(
            `${location}/api/auth.php`,
            {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data"
                },
                body: formData,
            },
        );
        console.log("profile uploaded");
        const responseJson = await response.json();
        return responseJson;
    } catch(e) {
        return e;
    }
}

export const _uploadCover = async (userId, imageUrl) => {
    console.log("cover uploading");
    let formData = new FormData();
	formData.append("WHICH", "UPLOAD-COVER");
	formData.append("ID", userId);

    let imageParts = imageUrl.split('.');
    let imageType = imageParts[imageParts.length - 1];
    formData.append('UserCover', {
        uri : imageUrl,
        name: `photo.${imageType}`,
        type: 'multipart/form-data', 
    });

    try {
        const response = await fetch(
            `${location}/api/auth.php`,
            {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data"
                },
                body: formData,
            },
        );
        console.log("cover uploaded");
        const responseJson = await response.json();
        return responseJson;
    } catch(e) {
        return e;
    }
}