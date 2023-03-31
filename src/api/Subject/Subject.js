import { apiUrl } from '../../index';
import { objToQueryString } from '../../config'

//Fetch all subject data using offset and limit!
async function getAllSubjects(page, limit) {
  const queryString = objToQueryString({
    page: page,
    limit: limit,
  })
  var apiLink;
  if (queryString == null)
    apiLink = apiUrl + '/subjest/filterSubject'
  else
    apiLink = apiUrl + '/subject/filterSubject?' + queryString
  const data = await fetch(apiLink, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return data;
}


//api to change the status of the user

async function editSubject(subjectID, name, status,subjectIcon) {
  // var details = {
  //   "name": name,
  //   "status": status
  // };

  // var formBody = [];
  // for (var property in details) {
  //   var encodedKey = encodeURIComponent(property);
  //   var encodedValue = encodeURIComponent(details[property]);
  //   formBody.push(encodedKey + "=" + encodedValue);
  // }
  // formBody = formBody.join("&");
  const formData = new FormData()
  formData.append('name', name)
  formData.append('image', subjectIcon)
  formData.append('status', status)
  const data = await fetch(apiUrl + '/subject/editSubject/' + subjectID, {
    method: 'PATCH',
    headers: {
      // Accept: 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formBody,
  }).then((res) => res.json());
  return data;

}

//api function for adding a subject 
// async function createSubject(name, status) {
//   var details = {
//     "name": name,
//     "status": status
//   };

//   var formBody = [];
//   for (var property in details) {
//     var encodedKey = encodeURIComponent(property);
//     var encodedValue = encodeURIComponent(details[property]);
//     formBody.push(encodedKey + "=" + encodedValue);
//   }
//   formBody = formBody.join("&");
//   const data = await fetch(apiUrl + '/subject/createSubject', {
//     method: 'POST',
//     headers: {
//       // Accept: 'application/json',
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: formBody,
//   }).then((res) => res.json());
//   return data;
// }

async function createSubject(name, status, icon) {
  console.log(name, status, icon)

  let headers = new Headers();
  headers.append('Access-Control-Allow-Origin', apiUrl);
  headers.append('Access-Control-Allow-Credentials', 'true');
  headers.append('GET', 'POST', 'OPTIONS');

  const formData = new FormData()
  formData.append('name', name)
  formData.append('image', icon)
  formData.append('status', status)

  for (var pair of formData.entries()) {
    console.log(pair[0] + ', ' + pair[1]);
  }

  const data = await fetch(`${apiUrl}/subject/createSubject`, {
    method: 'POST',
    headers,
    body: formData
  })
  console.log(data)
  return data;
}

//api to delete the user from the database
async function deleteSubject(subjectId) {
  const data = await fetch(apiUrl + '/subject/deleteSubjectById/' + subjectId, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return data;
}

//api to get the details of a particular user by sending the userId
async function getSubjectById(subjectId) {
  const data = await fetch(apiUrl + '/subject/getSubjectById/' + subjectId, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return data;
}


async function getSubjectByFilter(searchString, status, startDate, endDate, page, limit, sortByDate) {
  const queryString = objToQueryString({
    searchString: searchString,
    status: status,
    startDate: startDate,
    endDate: endDate,
    page: page,
    limit: limit,
    sortByDate: sortByDate
  })
  var apiLink;
  if (queryString == null)
    apiLink = apiUrl + '/subject/filterSubject'
  else
    apiLink = apiUrl + '/subject/filterSubject?' + queryString
  const data = await fetch(apiLink, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return data;

}

export { getAllSubjects, editSubject, deleteSubject, getSubjectById, createSubject, getSubjectByFilter }