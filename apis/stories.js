import { location } from './config';    

export const _contactUs = async (name, email, message) => {
    try {
        const formData = new URLSearchParams();
        formData.append('Name', name);
        formData.append('Email', email);
        formData.append('Message', message);

        const response = await fetch(
            `${location}/api/stories.php`,
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

export const _getTopics = async (username, password) => {
    try {
        const formData = new URLSearchParams();
        formData.append('WHAT', 'GET-TOPICS');
        formData.append('ID', null);

        const response = await fetch(
            `${location}/api/stories.php`,
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
};

export const _getSubTopics = async (topic) => {
    try {
        const formData = new URLSearchParams();
        formData.append('WHAT', 'GET-SUBTOPICS');
        formData.append('TOPIC', topic);
        formData.append('ID', null);

        const response = await fetch(
            `${location}/api/stories.php`,
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

export const _getSingleSubTopic = async(userId, topic) => {
    try {
        const formData = new URLSearchParams();
        formData.append('WHAT', 'GET-SINGLE-SUBTOPIC');
        formData.append('TOPIC', topic);
        formData.append('ID', userId);

        const response = await fetch(
            `${location}/api/stories.php`,
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

export const _getUserStories = async (type, value, ownerId, skip) => {
    try {
        const formData = new URLSearchParams();

        formData.append('WHAT', 'GET-USER-STORIES');
        formData.append('TYPE', type);
        formData.append('VALUE', value);
        formData.append('ID', ownerId);
        formData.append('SKIP', skip);

        const response = await fetch(
            `${location}/api/stories.php`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData.toString(),
            },
        );
        console.log("user stories : " + response);
        const responseJson = await response.json();
        return responseJson;
    } catch(e) {
        return e;
    }
}

export const _search = async (userId, query) => {
    try {
        const formData = new URLSearchParams();

        formData.append('WHAT', 'SEARCH');
        formData.append('ID', userId);
        formData.append('QUERY', query);

        const response = await fetch(
            `${location}/api/stories.php`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData.toString(),
            },
        );
        console.log("user stories : " + response);
        const responseJson = await response.json();
        return responseJson;
    } catch(e) {
        return e;
    }
}

export const _like = async (userId, fableId) => {
    try {
        const formData = new URLSearchParams();

        formData.append('WHAT', 'LIKE');
        formData.append('ID', userId);
        formData.append('STORY', fableId);

        const response = await fetch(
            `${location}/api/stories.php`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData.toString(),
            },
        );
        const responseJson = await response.json();
        console.log(responseJson);
        return responseJson;
    } catch(e) {
        return e;
    }
}

export const _getSingleStory = async (userId, fableId) => {
    try {
        const formData = new URLSearchParams();

        formData.append('WHAT', 'GET-SINGLE-STORY');
        formData.append('ID', userId);
        formData.append('STORY', fableId);

        const response = await fetch(
            `${location}/api/stories.php`,
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

export const _deleteFable = async (userId, fableId) => {
    try {
        const formData = new URLSearchParams();

        formData.append('WHAT', 'DELETE-FABLE');
        formData.append('ID', userId);
        formData.append('STORY', fableId);

        const response = await fetch(
            `${location}/api/stories.php`,
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

export const _report = async (userId, fableId) => {
    try {
        const formData = new URLSearchParams();

        formData.append('WHAT', 'REPORT-FABLE');
        formData.append('ID', userId);
        formData.append('STORY', fableId);

        const response = await fetch(
            `${location}/api/stories.php`,
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

export const _getTrending = async (userId) => {
    try {
        const formData = new URLSearchParams();

        formData.append('WHAT', 'GET-TRENDING');
        formData.append('ID', userId);

        const response = await fetch(
            `${location}/api/stories.php`,
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

export const _playFable = async (fableId) => {
    try {
        const formData = new URLSearchParams();

        formData.append('WHAT', 'STORE-PLAY-COUNT');
        formData.append('ID', null);
        formData.append('STORY', fableId);

        const response = await fetch(
            `${location}/api/stories.php`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData.toString(),
            },
        );
        console.log("played + 1 : " + response);
        const responseJson = await response.json();
        return responseJson;
    } catch(e) {
        return e;
    }
}


export const _getComments = async (userId, story) => {
    try {
        const formData = new URLSearchParams();

        formData.append('WHAT', 'GET-COMMENTS');
        formData.append('ID', userId);
        formData.append('STORY', story);

        const response = await fetch(
            `${location}/api/stories.php`,
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

export const _postVoice = async (userId, audioUrl) => {
    let audioParts = audioUrl.split('.');
    let audioType = audioParts[audioParts.length - 1];

	let formData = new FormData();
	formData.append("WHAT", "POST-VOICE");
	formData.append("ID", userId);
    formData.append('AUDIO', {
        uri : audioUrl,
        name: `recording.${audioType}`,
        type: 'multipart/form-data', 
    });

	try {
        const response = await fetch(
            `${location}/api/stories.php`,
            {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data"
                },
                body: formData,
            },
        );
        console.log("response : " + response);
        const responseJson = await response.json();
        return responseJson;
    } catch(e) {
        return e;
    }
}
export const _postComment = async (userId, fableId, audioUrl, voice) => {
    let audioParts = audioUrl.split('.');
    let audioType = audioParts[audioParts.length - 1];

	let formData = new FormData();
	formData.append("WHAT", "POST-COMMENT");
	formData.append("ID", userId);
	formData.append("FABLE-ID", fableId);

    formData.append('AUDIO', {
        uri : audioUrl,
        name: `recording.${audioType}`,
        type: 'multipart/form-data', 
    });

    formData.append("VOICE", voice);
    try {
        const response = await fetch(
            `${location}/api/stories.php`,
            {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data"
                },
                body: formData,
            },
        );
        console.log("response : " + response);
        const responseJson = await response.json();
        return responseJson;
    } catch(e) {
        return e;
    }
}

export const _postFable = async (userId, title, voice, audioUrl, subTopics, imageUrl, url, isUrl) => {
	const topics = [], topicIds = [];
	subTopics.map((item, i) => {
		topics.push(item.title);
		topicIds.push(item.id);
	})

    let audioParts = audioUrl.split('.');
    let audioType = audioParts[audioParts.length - 1];

	let formData = new FormData();
	formData.append("WHAT", "STORE-STORY");
	formData.append("ID", userId);
	formData.append("FableTitle", title);
	formData.append("VOICE", voice);

    formData.append('AUDIO', {
        uri : audioUrl,
        name: `recording.${audioType}`,
        type: 'multipart/form-data', 
    });

	formData.append("TOPICS", topics);
	formData.append("TOPICS-IDS", topicIds);
	if (isUrl) {
		formData.append("CoverImage", null);
		formData.append("COVER-IMAGE-URL", url);
	}
	else {
        let imageParts = imageUrl.split('.');
        let imageType = imageParts[imageParts.length - 1];
        formData.append('CoverImage', {
            uri : imageUrl,
            name: `photo.${imageType}`,
            type: 'multipart/form-data', 
        });
		formData.append("COVER-IMAGE-URL", "");
	}

    try {
        const response = await fetch(
            `${location}/api/stories.php`,
            {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data"
                },
                body: formData,
            },
        );
        console.log("response : " + response);
        const responseJson = await response.json();
        return responseJson;
    } catch(e) {
        return e;
    }
}