import { objToQueryString } from "../../config";
import { apiUrl } from "../../index";



// Fetch all boards data using offset and limit!

async function getAllSubTopic(topicID, page, limit) {

  const queryString = objToQueryString({
    page,
    limit,
    topicID
  })
  let apiLink;
  if (queryString == null)
    apiLink = `${apiUrl}/subTopic/filterSubTopic`
  else
    apiLink = `${apiUrl}/subTopic/filterSubTopic?${queryString}`
  const data = await fetch(apiLink, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return data;
}

// api to get the details of a particular user by sending the userId

async function getSubTopicById(subTopicID) {

  const data = await fetch(`${apiUrl}/subTopic/getSubTopicById/${subTopicID}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return data;
}

export { getAllSubTopic, getSubTopicById }