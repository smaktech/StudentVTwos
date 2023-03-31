import { objToQueryString } from '../../config';
import { apiUrl } from '../../index';


// //api function for getting notes 
async function getTimelineByUserId(userID, date) {
    
    const data = await fetch(`${apiUrl}/userTimeline/${userID}/?date=${date}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then((res) => res.json());
    return data;
}
// //api function for getting notes 
async function getAllTimelineByUserId(userID) {
    const data = await fetch(`${apiUrl}/userTimeline/all/${userID}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then((res) => res.json());
    return data;
}


async function addTimeLine(event) {


    const data = await fetch(`${apiUrl}/userTimeline/add`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    }).then(res => res.json())
    // console.log(cart)
    return data;
}
async function editTimeLine(eventId, event) {


    const data = await fetch(`${apiUrl}/userTimeline/editTimeLine/${eventId}`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    }).then(res => res.json())
    // console.log(cart)
    return data;
}

async function deleteTimeline(timelineID) {


    const data = await fetch(`${apiUrl}/userTimeline/deleteUserTimeline/${timelineID}`, {
        method: 'delete',
        headers: {
            Accept: 'application/json',
        },

    }).then(res => res.json())
    // console.log(cart)
    return data;
}




export { getTimelineByUserId, addTimeLine, getAllTimelineByUserId, deleteTimeline, editTimeLine }