import { objToQueryString } from '../../config';
import { apiUrl } from '../../index';

// //Fetch all users data using offset and limit!
async function fetchCMS() {
    const data = await fetch(`${apiUrl}/cms/getCMS/`, {
        method: 'GET',
        headers: {
            // Accept: 'application/json',
            // 'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return data;

}
export { fetchCMS}