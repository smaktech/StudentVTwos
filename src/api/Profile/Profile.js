import { apiUrl } from '../../index';

//api to change the password of the admin
async function updatePassword(credentials) {
    const data = await fetch(apiUrl + '/auth/updatePasswordAdmin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    }).then((res) => res.json());
    return data;
    
  }

// api to change the name of the admin
  async function changeName(userId,credentials) {
    const data = await fetch(apiUrl + '/auth/updateNameAdmin/'+userId, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    }).then((res) => res.json());
    return data;
  } 

  //api to change the image of the admin
  async function uploadImage(userId,file) {
    let formData = new FormData();
    formData.append("imageProfile",file);
    const data = await fetch(apiUrl + '/auth/addProfileAdmin/'+userId, {
      method: 'PUT',
      // headers: {
      //   Accept: 'application/json',
      //   'Content-Type': 'application/json',
      // },
      body: formData,
    }).then((res) => res.json());
    return data;
  }

  //api to remove admin profile image from the server
  async function removeImage(userId){
    const data = await fetch(apiUrl + '/auth/removeAdminProfile/'+userId, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
    return data;
  }

  export {updatePassword,changeName,uploadImage,removeImage}