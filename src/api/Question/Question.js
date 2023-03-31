import { apiUrl } from '../../index';
import { objToQueryString } from '../../config'

//Fetch all course data using offset and limit!
async function getQuestion(id) {
    // console.log('request from client done');

    var apiLink;
    
        apiLink = apiUrl + '/question/getQuestion?id='+ id
   
        console.log( id, 'get Question Table iD' )

    const data = await fetch(apiLink,  {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

    }).then((res) => res.json());

    

   console.log('Get Question Table iD', data)
    return data;
}



export {getQuestion}