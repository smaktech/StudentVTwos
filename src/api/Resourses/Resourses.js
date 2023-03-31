import { objToQueryString } from '../../config';
import { apiUrl } from '../../index';

// //Fetch all Resourse data using offset and limit!
async function getAllResourse(page, limit) {
    const queryString = objToQueryString({
        page,
        limit,
    })
    let apiLink;
    if (queryString == null)
        apiLink = `${apiUrl}/resource/filterResource`
    else
        apiLink = `${apiUrl}/resource/filterResource?${queryString}`
    const data = await fetch(apiLink, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return data;
}
 


async function getResourseByFilter(searchString, status, startDate, endDate, page, limit, sortByDate) {
    const queryString = objToQueryString({
        searchString,
        status,
        startDate,
        endDate,
        page,
        limit,
        sortByDate,
    })
    let apiLink;
    if (queryString == null)
        apiLink = `${apiUrl}/resource/filterResource`
    else
        apiLink = `${apiUrl}/resource/filterResource?${queryString}`
    const data = await fetch(apiLink, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return data;
}

// //function for download resourse
async function downloadResourseByID(userID, resourceID) {
    const data = await fetch(`${apiUrl}/download/add/${userID}/${resourceID}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        // // body: JSON.stringify({ name }),
    }).then((res) => res.json());

    return data;

}

// //function for all downloaded resourse
async function downloadedResoursesByUserID(userID) {
    const data = await fetch(`${apiUrl}/download/all/${userID}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        // // body: JSON.stringify({ name }),
    }).then((res) => res.json());

    return data;

}

export { getAllResourse ,getResourseByFilter,downloadResourseByID,downloadedResoursesByUserID }