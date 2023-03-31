  import { apiUrl } from '../../config';
import { objToQueryString } from '../../config'
//Fetch all classes data using offset and limit!
async function getAllClasses(page, limit) {
  const queryString = objToQueryString({
      page: page,
      limit: limit,
  })
  var apiLink;
  if (queryString == null)
      apiLink = apiUrl + '/classes/filterClasses'
  else
      apiLink = apiUrl + '/classes/filterClasses?' + queryString
  const data = await fetch(apiLink, {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
  }).then((res) => res.json());
  return data;
}


  //api to change the status of the class

  async function editClass(classesID,name,status) {
    
     var details = {
      "name":name,
      "status":status
    };

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    const data = await fetch(apiUrl + '/classes/editClasses/'+classesID , {
      method: 'PATCH',
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:formBody,
    }).then((res) => res.json());
    return data;
    
  }

  //function to create the class
  async function createClass(name,status) {
    
    var details = {
      "name":name,
      "status":status
    };

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    const data = await fetch(apiUrl + '/classes/createClasses', {
      method: 'POST',
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:formBody,
    }).then((res) => res.json());
    return data;
    
  }

  //api to delete the user from the database
  async function deleteClass(ClassesId)
  { 
    const data = await fetch(apiUrl + '/classes/deleteClassesById/'+ClassesId, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
    return data;
  }

  //get all class basically for search purposes
  async function getClassByFilter(searchString,status,startDate,endDate,page,limit,sortByDate){
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
    if(queryString == null)
      apiLink = apiUrl + '/classes/filterClasses'
    else
      apiLink = apiUrl + '/classes/filterClasses?'+queryString
    const data = await fetch(apiLink, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
    return data;

  }

  //api to get the details of a particular user by sending the userId
  async function getClassById(classesID)
  { 
    const data = await fetch(apiUrl + '/classes/getClassesById/'+classesID, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
    return data;
  }
  


  export {getAllClasses,editClass,deleteClass,getClassById,createClass,getClassByFilter}