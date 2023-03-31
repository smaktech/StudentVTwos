import { apiUrl } from '../../index';

// //api connection for student signup
async function paymentGetway(priceID, quantity, courses, userID,amount) {
    const data = await fetch(`${apiUrl}/subcription/create-checkout-session`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceID, quantity, courses, userID,amount }),
    }).then((res) => res.json());

    return data;

}

async function addToCart(courseID, userID) {
    console.log(userID, courseID)
    const cart = { 'userID': userID, 'courseID': courseID }
    const data = await fetch(`${apiUrl}/cart/add`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cart)
    }).then(res => res.json())
    // console.log(cart)
    return data;
}

async function getCartCourse(userID) {
    console.log(userID)
    const data = await fetch(`${apiUrl}/cart/all/${userID}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    }).then(res => res.json())
    return data;
}

async function removeCartItem(userID, courseID) {
    const data = await fetch(`${apiUrl}/cart/remove`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'userID': userID, 'courseID': courseID })
    }).then((res) => res.json())
    return data
}

export { paymentGetway, addToCart, getCartCourse, removeCartItem }