import { Box } from '@mui/material';
import React from 'react';
import { baseUrl } from '../../index';

function RenderPpt({ subTopic }) {
  const url = window.encodeURIComponent(`${baseUrl}/${subTopic.file}`)
  console.log(url)
  return (
    <div style={{ width: '99.5%', height: '100%', display: 'block', overflow: 'hidden', borderRadius: '20px', transform: 'translateZ(0px)' }}>
      <iframe width="99.5%" height="500px" title='myFrame' src={`https://view.officeapps.live.com/op/embed.aspx?src=${url}`} />
    </div>
    // <iframe width="100%" height="550px" title='myFrame' src={`https://view.officeapps.live.com/op/embed.aspx?src=${url}`} />
  )
}

export default RenderPpt;
