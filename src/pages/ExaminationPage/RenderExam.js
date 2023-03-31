import React from 'react';
import { useSelector } from 'react-redux';
import { baseUrl } from '../../index';

function RenderExam({ subTopic, examObj }) {
  const userDetails = useSelector((state) => state.user.info);
  const url = `${baseUrl}/${examObj?.link}?uID=${userDetails._id}&examID=${examObj?._id}&stID=${subTopic?._id}`
  console.log(url)
  return (
    <div style={{ width: '100%', display: 'block', overflow: 'hidden', borderRadius: '20px', transform: 'translateZ(0px)' }}>
      <iframe title='renderExam' width="100%" height="500px" src={url} />
    </div>
  )
}

export default RenderExam;
