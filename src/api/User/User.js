import { apiUrl } from '../../index';

    // //api function for update a resourse 
async function fetchUser(userID) {
    // var formData   = new FormData();  
    // formData.append("name", name) 
    // formData.append("description", description) 
    // formData.append("linkType", linkType) 
    // formData.append("linkString", linkString)
    // formData.append("resourceFile", resourceFile) 
    // formData.append("status", status)

    const data = await fetch(`${apiUrl}/auth/getUserByID/${userID}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // body: JSON.stringify({name}),
    }).then((res) => res.json());
    return data;

}


// //function for update name
async function editName(name, userID) {
    const data = await fetch(`${apiUrl}/auth/updateNameUser/${userID}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
    }).then((res) => res.json());

    return data;

}


// //function for update name
async function updateImage(imageProfile, userID) {
    const formData   = new FormData();  
    formData.append("imageProfile", imageProfile) 

    const data = await fetch(`${apiUrl}/auth/addProfileUser/${userID}`, {
        method: 'PUT',
        // headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json',
        // },
        body: formData,
    }).then((res) => res.json());

    return data;

}


export { editName, fetchUser, updateImage }