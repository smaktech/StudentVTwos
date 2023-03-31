import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

export default function UserTimeline({ timeline }) {
  
  return (
    <Timeline position="alternate">

      {timeline?.map(item => (
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot sx={{ backgroundColor: item.textColor }} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>{item.title}</TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
