import { apiUrl } from '../../index';

 
async function RestLogin(email, password) {
  const data = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password}),
  }).then((res) => res.json());


  return data;

}
 
async function RestSignup(email, password, name,phoneNumber, school) {
  const data = await fetch(`${apiUrl}/auth/signupTest`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password, name,phoneNumber, school}),
  }).then((res) => res.json());

  return data;

}
 

async function sendOTP(email) {
  
  const formData = new FormData();
  formData.append("email",email);

  const data = await fetch(`${apiUrl}/auth/sendOTP`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  }).then((res) => res.json());
  return data;
  
}
 
async function changePassword(userID, token, newPassword) {
  // var details = {
  //     "newPassword":newPassword
  //   };
  //   var formBody = [];
  //   for (var property in details) {
  //     var encodedKey = encodeURIComponent(property);
  //     var encodedValue = encodeURIComponent(details[property]);
  //     formBody.push(encodedKey + "=" + encodedValue);
  //   }
  //   formBody = formBody.join("&");

  // const data = await fetch(apiUrl + '/auth/password-reset/'+userID+"/"+token, {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  //   body: formBody,
  // }).then((res) => res.json());
  // return data;  
}







export { RestLogin, RestSignup ,sendOTP,changePassword };
