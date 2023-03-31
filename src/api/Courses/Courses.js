import { objToQueryString } from '../../config';
import { apiUrl } from '../../index';

// //Fetch all Resourse data using offset and limit!
async function getAllCourses(page, limit) {
    const queryString = objToQueryString({
        page,
        limit
    })
    let apiLink;
    if (queryString == null)
        apiLink = `${apiUrl}/course/filterCourse`
    else
        apiLink = `${apiUrl}/course/filterCourse? ${queryString}`
    const data = await fetch(apiLink, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return data;
}



async function getCoursesByFilter(searchString, boardID, subjectID) {
    const queryString = objToQueryString({
        searchString,
        boardID,
        subjectID,
    })
    let apiLink;
    if (queryString == null)
        apiLink = `${apiUrl}/course/filterCourse`
    else
        apiLink = `${apiUrl}/course/filterCourse?${queryString}`
    const data = await fetch(apiLink, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return data;
}

// // Fetch all subject data using offset and limit!
async function getAllSubjects(page, limit) {
    const queryString = objToQueryString({
        page,
        limit
    })
    let apiLink;
    if (queryString == null)
        apiLink = `${apiUrl}/subjest/filterSubject`
    else
        apiLink = `${apiUrl}/subject/filterSubject?${queryString}`
    const data = await fetch(apiLink, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return data;
}


// //Fetch all boards data using offset and limit!
async function getAllBoard(page, limit) {
    const queryString = objToQueryString({
        page,
        limit,
    })
    let apiLink;
    if (queryString == null)
        apiLink = `${apiUrl}/board/filterBoard`
    else
        apiLink = `${apiUrl}/board/filterBoard?${queryString}`
    const data = await fetch(apiLink, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return data;
}

// //api to get the details of a particular courses by sending the courdseId
async function getCourseById(courseID) {
    const data = await fetch(`${apiUrl}/course/getCourseById/${courseID}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return data;
}

// //api to get the details of a particular topic by sending the userID and courdseId
async function getUserCourseById(userID, courseID) {
    console.log("fetching topic", userID, courseID)
    const data = await fetch(`${apiUrl}/userCourse/startCourse/${userID}/${courseID}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            // 'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return data;
}

// //api to get the topics of a course
async function getCourseTopics(courseID) {
    const data = await fetch(`${apiUrl}/topic/getCourseTopics/${courseID}`, {
        method: 'get',
        headers: {
            Accept: 'application/json',
            // 'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return data;
}
// //api to get all courses of user
async function getAllUserCourses(userID) {
    const data = await fetch(`${apiUrl}/userCourse/getAllUserCourses/${userID}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return data;
}



// //api function for saving progress 
async function topicProgress(userID, courseID, topicID, progress) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', apiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST', 'OPTIONS');

    const data = await fetch(`${apiUrl}/userTopic/startTopic/${userID}/${courseID}/${topicID}`,
        {
            method: 'POST',
            headers,
            body: JSON.stringify({ progress })
        })
        .then((res) => res.json());
    return data;
}


// //api function for saving notes 
async function userNotesById(userID, note) {
    const data = await fetch(`${apiUrl}/userNote/${userID}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ note })
    }).then((res) => res.json());
    console.log(data)
    return data;
}
// //api function for getting notes 
async function getUserNotesById(userID) {
    const data = await fetch(`${apiUrl}/userNote/all/${userID}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    }).then((res) => res.json());
    return data;
}
// //api function for deleting notes
async function deleteUserNotesByUserIdAndNoteId(userID, noteID) {
    console.log(userID, noteID)
    const data = await fetch(`${apiUrl}/userNote/delete/${userID}/${noteID}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    }).then((res) => res.json());
    return data;
}

async function updateNoteByUserIdAndNoteId(userID, noteID, note) {
    const data = await fetch(`${apiUrl}/userNote/update/${userID}/${noteID}`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'note': note })

    }).then((res) => res.json());
    return data;

}



export { updateNoteByUserIdAndNoteId, deleteUserNotesByUserIdAndNoteId, getUserNotesById, userNotesById, getAllCourses, getCoursesByFilter, getAllSubjects, getCourseTopics, topicProgress, getAllBoard, getCourseById, getAllUserCourses, getUserCourseById }