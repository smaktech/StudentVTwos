import { apiUrl } from '../../index';
import { objToQueryString } from '../../config'

//Fetch all topic data using Course ID
async function getCourseTopics(courseID) {
    console.log('hello', courseID)
    const data = await fetch(apiUrl + '/topic/getCourseTopics/' + courseID, {
        // method: 'GET',
        // headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json',
        // },
    }).then((res) => res.json());
    return data;
}

//Fetch all topic data using offset and limit!
async function getAllTopics(page, limit) {
    const queryString = objToQueryString({
        //   searchString: searchString,
        //   startDate: startDate,
        //   endDate: endDate,
        page: page, 
        limit: limit,
        //   sortByDate: sortByDate
    })
    var apiLink;
    if (queryString == null)
        apiLink = apiUrl + '/topic/filterTopic'
    else
        apiLink = apiUrl + '/topic/filterTopic?' + queryString
    const data = await fetch(apiLink, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return data;

}

//Fetch all topic data using offset and limit!
async function getCourseAllTopics(courseId) {

    var apiLink;
    apiLink = apiUrl + '/topic/getCourseTopics/' + courseId

    const data = await fetch(apiLink, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return data;

}

//api function for update a topic 

async function editTopic(topicID, name, description, status,topicIcon) {

    // var details = {
    //     "name": name,
    //     "status": status,
    //     "description": description
    // };

    var formData = new FormData();
    formData.append("name", name)
    formData.append("description", description)
    formData.append("status", status)
    formData.append("image", topicIcon)

    // var formBody = [];
    // for (var property in details) {
    //     var encodedKey = encodeURIComponent(property);
    //     var encodedValue = encodeURIComponent(details[property]);
    //     formBody.push(encodedKey + "=" + encodedValue);
    // }
    // formBody = formBody.join("&");
    const data = await fetch(apiUrl + '/topic/editTopic/' + topicID, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
    }).then((res) => res.json());
    return data;

}

//api function for adding a topic 
async function createTopic(name, description, status, courseID, icon) {
    var formData = new FormData();
    formData.append("name", name)
    formData.append("description", description)
    formData.append("status", status)
    formData.append("image", icon)


    const data = await fetch(apiUrl + '/topic/createTopic', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
    }).then((res) => res.json());
    if (data.status) {
        const topicID = data.topic._id
        const addTopicData = await fetch(apiUrl + '/course/addTopicToCourse/' + courseID, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ topicIDs: [topicID] }),
        }).then((res) => res.json());
        console.log(addTopicData)

    }
    return data;
}

//api to delete the topic from the database
async function deleteTopic(topicID, courseID) {



    const removeFromCourse = await fetch(apiUrl + '/course/removeTopicFromCourse/' + courseID + "?topicID=" + topicID, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());

    const data = await fetch(apiUrl + '/topic/deleteTopicById/' + topicID, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());

    return data;
}

//api to get the details of a particular topic by sending the topicId
async function getTopicById(topicID) {
    const data = await fetch(apiUrl + '/topic/getTopicById/' + topicID, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return data;
}




async function getTopicByFilter(searchString, startDate, endDate, page, limit, sortByDate, status) {
    let obj = {
        searchString: searchString,
        startDate: startDate,
        endDate: endDate,
        page: page,
        limit: limit,
        sortByDate: sortByDate,
        status: status
    }
    const queryString = objToQueryString(obj)
    console.log(queryString)
    var apiLink;
    if (queryString == null) {
        apiLink = apiUrl + '/topic/filterTopic'
    }
    else {
        apiLink = apiUrl + '/topic/filterTopic?' + queryString
    }

    console.log("test call back", queryString, obj)
    const data = await fetch(apiLink, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return data;

}

export { getCourseTopics, getCourseAllTopics, getAllTopics, editTopic, deleteTopic, getTopicByFilter, getTopicById, createTopic }