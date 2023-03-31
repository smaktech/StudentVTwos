
import { apiUrl } from '../../index';
import { objToQueryString } from '../../config'

//Fetch all course data using offset and limit!
async function getAllEvaluation() {
    var apiLink;
    
     apiLink = apiUrl + '/evaluation/getevaluationlist'
    //  console.log("Request from getEvaluation to", apiLink);
    const data = await fetch(apiLink, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    // console.log('This is a GET ALLLECA',res.results.row.course)
    return data;
    
}


async function getSingleEvaluation(id) {
    // console.log('request from client done');

    var apiLink;
    
        apiLink = apiUrl + '/evaluation/getEvaluation?id='+ id
   
        // console.log( apiUrl,id, 'get getSingleEvaluation answer from table' )

    const data = await fetch(apiLink,  {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

    }).then((res) => res.json());

    

//    console.log('Get single answer api', data)
    return data;
}
//Fetch all course data using offset and limit!
async function getAllReview() {
    const queryString = objToQueryString({
        // page: page,
        // limit: limit,
       
    });

    var apiLink;
    
     apiLink = apiUrl + '/evaluation/getevaluationrevlist'
    //  console.log("Request from getEvaluation to", apiLink);
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

async function editEvaluation(course, name, board, subBoard, classes, subject, description, status,courseImage) {
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
    formData.append("board", board)
    if (subBoardID) {
        formData.append("subBoard", subBoard)
    }
    formData.append("classes", classes)
    formData.append("subject", subject)
    // formData.append("topicIDs", topicIDs)
    formData.append("description", description)
    formData.append("status", status)
    formData.append("image", courseImage)
    const data = await fetch(apiUrl + '/evaluation/editEvaluation/' + e, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            // 'Content-Type': 'application/json',
            // 'Content-Type': 'multipart/form-data',
        },
        // body: JSON.stringify({ name, subBoardID, boardID, classesID, subjectID, description, status }),
        body:formData
    }).then((res) => res.json());
    console.log("description")
    return data;

}

//api function for adding a course 
async function createEvaluation(board,qualification,subject,description,course) {

  //////////////////////////////
    var details = {
        "board":board,
        "qualification":qualification,
        "subject":subject,
        "description":description,
        "course":course,
        
      };
  console.log('requsted to server');
  console.log(details);
      var formBody = [];
      console.log('API url check ',apiUrl)
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      const data = await fetch(apiUrl + '/evaluation/createEvaluation', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:formBody,
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
async function getEvaluationById(evaluation) {
    const data = await fetch(apiUrl + '/evaluation/getEvaluationById/' + evaluation, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return data;
}




async function getEvaluationByFilter(searchString, startDate, endDate, sortByDate, status, board, subject) {
    let obj = {
        board: board,
        subject: subject,
        searchString: searchString,
        startDate: startDate,
        endDate: endDate,
        sortByDate: sortByDate,
        status: status
    }
    const queryString = objToQueryString(obj)
    var apiLink;
    if (queryString == null) {
        apiLink = apiUrl + '/course/filterEvaluation'
    }
    else {
        apiLink = apiUrl + '/course/filterEvaluation?' + queryString
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
async function getAllUserEvaluations(userID) {
    const data = await fetch(apiUrl + '/userEvaluation/getAllUserEvaluations/' + userID, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return data;
}

export { getAllEvaluation, getAllReview,editEvaluation, deleteCourse, getEvaluationByFilter, getEvaluationById,getSingleEvaluation, getAllUserEvaluations, createEvaluation }