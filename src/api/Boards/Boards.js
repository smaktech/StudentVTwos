import { apiUrl } from '../../index';
import { objToQueryString } from '../../config'


//Fetch all boards data using offset and limit!
async function getAllBoard(page, limit) {
  const queryString = objToQueryString({
    page: page,
    limit: limit,
  })
  var apiLink;
  if (queryString == null)
    apiLink = apiUrl + '/board/filterBoard'
  else
    apiLink = apiUrl + '/board/filterBoard?' + queryString
  const data = await fetch(apiLink, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return data;
}


//api to change the status of the user,icon
async function editBoards(BoardId, name, status,icon) {

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
  formData.append('status', status)
  formData.append('image', icon)
  const data = await fetch(apiUrl + '/Board/editBoard/' + BoardId, {
    method: 'PATCH',
    headers: {
      // Accept: 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  }).then((res) => res.json());
  return data;

}

//api function for adding a Board 
async function createBoard(name, status, icon) {

  console.log(name, status, icon)
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

  // let headers = new Headers();
  // headers.append('Access-Control-Allow-Origin', apiUrl);
  // headers.append('Access-Control-Allow-Credentials', 'true');
  // headers.append('GET', 'POST', 'OPTIONS');

  const formData = new FormData()
  formData.append('name', name)
  formData.append('status', status)
  formData.append('image', icon)

  for (var pair of formData.entries()) {
    console.log(pair[0] + ', ' + pair[1]);
  }
  const data = await fetch(apiUrl + '/board/createBoard', {
    method: 'POST',
    // headers: {
    //   Accept: 'application/json',
    //   'Content-Type': 'application/x-www-form-urlencoded',
    // },
    // headers,
    body: formData,
  })
  // .then((res) => res.json());
  return data;
}

//api to delete the user from the database
async function deleteBoards(boardID) {
  const data = await fetch(apiUrl + '/Board/deleteBoardById/' + boardID, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return data;
}

//api to get the details of a particular user by sending the userId
async function getBoardById(boardID) {
  const data = await fetch(apiUrl + '/Board/getBoardById/' + boardID, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return data;
}


async function getBoardByFilter(searchString, status, startDate, endDate) {
  const queryString = objToQueryString({
    searchString: searchString,
    status: status,
    startDate: startDate,
    endDate: endDate,
  })
  var apiLink;
  if (queryString == null)
    apiLink = apiUrl + '/board/filterBoard'
  else
    apiLink = apiUrl + '/board/filterBoard?' + queryString
  const data = await fetch(apiLink, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return data;
}


export { getAllBoard, editBoards, deleteBoards, getBoardById, createBoard, getBoardByFilter }