import { apiUrl } from '../../index';
import { objToQueryString } from '../../config'
import { id } from 'date-fns/locale';
const axios = require('axios')
// const express = require('express');
// const cors = require('cors');

// const app = express()

// app.use(cors({
//     origin:'*',
// }))
//Fetch all course data using offset and limit!
async function getSingleAnswer(id) {
    // console.log('request from client done');
try{
    var apiLink;

    apiLink = apiUrl + '/answer/getAnswer?id=' + id

    // console.log(id, 'get single answer')

    const data = await fetch(apiLink, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

    }).then((res) => res.json());



    // console.log('Get single answer api', data)
    return data;
}
catch(error){
    alert(error);
}
}
 const getAnswerapi =async ()=> {
    try{
    // alert('data');
    
    var apiLink;
    
    apiLink = 'https://5dt79jqb97.execute-api.us-east-2.amazonaws.com/default/score' ;

    const data = await fetch(apiLink, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-api-key': 'EtUXgJMobD2i4UPgnlqXU1d8QUROnKVJ47taTgEL',
        },
      
        body: JSON.stringify({
            "userInput": "mark",
            "expectedAnswer": "mark",
            "isMath": false
        })

    }).then((res) => res.json());
    alert('Server api push alert', data);

   
    // console.log('Answer Score api', data)
    // console.log('request from getAnswerapi');
    return data;
}
catch(error){
    alert(error);
}
}

 
async function getAnswerapi2(userInput, expectedAnswer,isMath) {
    try{
    const data = await fetch(`${apiUrl}/answer/GetScore`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      
      body: JSON.stringify({userInput, expectedAnswer,isMath}),
    }).then((res) => res.json());
  
  
    return data;
}
catch(error){
    alert(error);
}
  }

async function getAnswerapi3(answer,marks,type){
// const getAnswerapi =async(answer,marks) => {
    // alert('data');
    let jsonval=JSON.stringify({
        "userInput": answer,
        "expectedAnswer": marks,
        "isMath": type
    });
    alert(jsonval);

    const requestOptions = {
        method: 'POST',       
        // mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-api-key': 'EtUXgJMobD2i4UPgnlqXU1d8QUROnKVJ47taTgEL',
            'Host' : '5dt79jqb97.execute-api.us-east-2.amazonaws.com',
            // 'Access-Control-Allow-Origin' : 'https://5dt79jqb97.execute-api.us-east-2.amazonaws.com',
            // //'Content-Length':'100',
            // 'Access-Control-Allow-Methods':'POST, GET, OPTIONS, DELETE',
            // 'Access-Control-Allow-Headers' :'*'
        },
        body: JSON.stringify({  userInput: answer,expectedAnswer: marks,isMath: type })
    };
    var apiLink;
    

    apiLink = 'https://5dt79jqb97.execute-api.us-east-2.amazonaws.com/default/score' ;

    const data = await fetch(`${apiLink}`, requestOptions).then((res) => res.json());
    alert('Server api push alert', data);

   
    // console.log('Answer Score api', data)
    // console.log('request from getAnswerapi');
    return data;
}
// async function getAnswerapi2(answer,marks,type){
//     // var apiLink;
//     // apiLink = 'http://testsims.portech.co/api/default' ;
//     // const data1 = await fetch(apiLink, {
//     //     method: 'POST',
//     //     headers: {
//     //       Accept: 'application/json',
//     //       'Content-Type': 'application/json',
//     //        'Access-Control-Allow-Origin' : 'http://testsims.portech.co',
//     //         //'Content-Length':'100',
//     //         'Access-Control-Allow-Methods':'POST, GET, OPTIONS, DELETE',
//     //         'Access-Control-Allow-Headers' :'Origin, Accept, x-auth-token, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
//     //         'Access-Control-Allow-Credentials':'true'
//     //     },
//     //     body: JSON.stringify({  userInput: answer,expectedAnswer: marks,isMath: type }),
//     //   }).then((res) => res.json());

//     //   alert('Acadame api push alert', data);

// // const getAnswerapi =async(answer,marks) => {
//     // alert('data');
//     let jsonval=JSON.stringify({
//         "userInput": answer,
//         "expectedAnswer": marks,
//         "isMath": type
//     });
//     alert(jsonval);

//     const requestOptions = {
//         method: 'POST',       
//         // mode: 'cors',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             //'x-api-key': 'EtUXgJMobD2i4UPgnlqXU1d8QUROnKVJ47taTgEL',
//             //'Host' : 'https://5dt79jqb97.execute-api.us-east-2.amazonaws.com',
//             //'Access-Control-Allow-Origin' : 'http://localhost:3000',
//             //'Content-Length':'100',
//             //'Access-Control-Allow-Methods':'POST, GET, OPTIONS, DELETE',
//             //'Access-Control-Allow-Headers' :'Origin, Accept, x-auth-token, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
//             //'Access-Control-Allow-Credentials':'true'
//         },
//         body: JSON.stringify({  userInput: answer,expectedAnswer: marks,isMath: type })
//     };
//    // var apiLink;
    

//     //apiLink = 'https://5dt79jqb97.execute-api.us-east-2.amazonaws.com/default/score' ;
   

// //   const dfd=  axios({
// //         method: 'GET',
// //         url: `${apiLink}`,
// //         headers: {  'Accept': 'application/json',
// //         'Content-Type': 'application/json',
// //         'x-api-key': 'EtUXgJMobD2i4UPgnlqXU1d8QUROnKVJ47taTgEL',
// //         'Host' : 'https://5dt79jqb97.execute-api.us-east-2.amazonaws.com', },
// //         data:JSON.stringify({  userInput: answer,expectedAnswer: marks,isMath: type })
// //     })
// //     alert('Server api push get alert', data);

//     const data = await fetch(`${apiLink}`, requestOptions).then((res) => res.json());
//     alert('Server api push alert', data);

   
//     // console.log('Answer Score api', data)
//     // console.log('request from getAnswerapi');
//     return data;
// }

async function getAllCourses(page, limit) {
    const queryString = objToQueryString({
        page: page,
        limit: limit,
    })
    var apiLink;
    if (queryString == null)
        apiLink = apiUrl + '/course/filterCourse'
    else
        apiLink = apiUrl + '/course/filterCourse?' + queryString
    const data = await fetch(apiLink, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return data;
}

//api function for update a course 

async function editCourse(courseID, name, boardID, subBoardID, classesID, subjectID, description, status, courseImage) {
    // var details = {
    //     "name": name,
    //     "description": description,
    //     "board": board,
    //     "classes": classes,
    //     "subject": subject,
    //     "topic": topic,
    //     // "coursePicture": coursePicture,
    //     'status':status
    // };

    // var formBody = [];
    // for (var property in details) {
    //     var encodedKey = encodeURIComponent(property);
    //     var encodedValue = encodeURIComponent(details[property]);
    //     formBody.push(encodedKey + "=" + encodedValue);
    // }
    // formBody = formBody.join("&");
    const formData = new FormData();
    formData.append("name", name)
    formData.append("boardID", boardID)
    if (subBoardID) {
        formData.append("subBoardID", subBoardID)
    }
    formData.append("classesID", classesID)
    formData.append("subjectID", subjectID)
    // formData.append("topicIDs", topicIDs)
    formData.append("description", description)
    formData.append("status", status)
    formData.append("image", courseImage)
    const data = await fetch(apiUrl + '/course/editCourse/' + courseID, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            // 'Content-Type': 'application/json',
            // 'Content-Type': 'multipart/form-data',
        },
        // body: JSON.stringify({ name, subBoardID, boardID, classesID, subjectID, description, status }),
        body: formData
    }).then((res) => res.json());
    return data;

}

//api function for adding a course 
async function createAnswer(hint, marks, answer, formula, question, media) {

    //ne
    var details = {
        "hint": hint,
        "marks": marks,
        "answer": answer,
        "formula": formula,
        "question": question,
        "media": media,



    };
    console.log('requsted to server');
    console.log(details);
    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    const data = await fetch(apiUrl + '/answer/createAnswer', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
    }).then((res) => res.json());

    console.log(data);
    return data;

}

//api to delete the course from the database
async function deleteCourse(courseID) {
    const data = await fetch(apiUrl + '/course/deleteCourseById/' + courseID, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            // 'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return data;
}

//api to get the details of a particular topic by sending the courdseId
async function getCourseById(courseID) {
    const data = await fetch(apiUrl + '/course/getCourseById/' + courseID, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return data;
}




async function getCourseByFilter(searchString, startDate, endDate, sortByDate, status, boardID, subjectID) {
    let obj = {
        boardID: boardID,
        subjectID: subjectID,
        searchString: searchString,
        startDate: startDate,
        endDate: endDate,
        sortByDate: sortByDate,
        status: status
    }
    const queryString = objToQueryString(obj)
    var apiLink;
    if (queryString == null) {
        apiLink = apiUrl + '/course/filterCourse'
    }
    else {
        apiLink = apiUrl + '/course/filterCourse?' + queryString
    }

    console.log("test call back", queryString, obj)
    const data = await fetch(apiLink, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            // 'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return data;

}

//api to get all courses of user
async function getAllUserCourses(userID) {
    const data = await fetch(apiUrl + '/userCourse/getAllUserCourses/' + userID, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return data;
}

export { createAnswer, getAllCourses, getSingleAnswer,getAnswerapi ,getAnswerapi2}