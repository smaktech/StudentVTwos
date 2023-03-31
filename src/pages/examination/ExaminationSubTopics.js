import React, { useEffect, useState } from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';

import { Button, Link as MuiLink } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid'
import Loader from 'react-loader-spinner';

import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Typography from '@mui/material/Typography';
import { getAllSubTopic } from '../../api/SubTopic/SubTopic';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { BaseOptionChart } from 'src/components/chart';
import { useTheme } from '@emotion/react';
function ExaminationSubTopics() {
  const theme = useTheme();
  const { topicID, courseName, subjectName, boardName, qualificationName, topicName } = useParams();
  const [offset, setOffset] = useState(1);
  const fetchSubTopicLimit = 1000;
  const [loader, setLoader] = useState(false);
  const [subTopics, setSubTopics] = useState([])
  const history = useNavigate();
  useEffect(async () => {
    setLoader(true);
    const response = await getAllSubTopic(topicID, offset, fetchSubTopicLimit)
    if (response.status) {

      setSubTopics(response.results.data)
    }

    setLoader(false);

  }, [])

  const chartOptions = merge(BaseOptionChart(), {
    colors: ["#c0ae0c"],
    chart: { sparkline: { enabled: true } },
    legend: { show: false },
    plotOptions: {
      radialBar: {
        hollow: { size: '78%' },
        track: { margin: 0 },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 6,
            color: theme.palette.common.black,
            fontSize: theme.typography.subtitle2.fontSize,
          },
        },
      },
    },
  });

  return (
    <Box sx={{ width: '95%', m: '0 auto' }}>
      <Box sx={{ display: 'flex' }}>
        <Button onClick={() => history(-1)} sx={{ mr: 2 }} variant='contained'><ArrowBackIcon />Back</Button>
        <Typography variant='h5'>{topicName}</Typography>
      </Box>
      <Box sx={{ mb: 1 ,mt:2}}>
        <Typography variant="small">
          {`${qualificationName} > ${boardName} > ${courseName} > ${subjectName} > ${topicName} `} 
        </Typography>
      </Box>
      {loader ? (
        <div
          className="w-100 py-2 px-6 me-3"
          style={{ display: 'flex', height: '70vh', justifyContent: 'center', alignItems: 'center' }}
        >
          <Loader type="Puff" color="#c0ae0c" height={30} width={30} />
        </div>
      ) : (
        <Box>

          <Grid container spacing={2} sx={{ mt: '10px' }}>
            {subTopics.map((items, index) => (
              <Grid item xs={6} md={4} lg={3}>
                <Card
                  variant="outlined" sx={{ borderRadius: '15px',boxShadow: 10, }}
                  onClick={() => {
                    // setExamModel(true);

                    // setTopicItems(items);
                    // console.log('examModel');

                    history(`/dashboard/examination/subTopics/learning/${items._id}/${topicID}/${courseName}/${qualificationName}/${subjectName}/${boardName}/${topicName}/${items.name}`)
                  }}>
                  <CardContent sx={{ padding: { xs: '10px', md: '22px' } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant='h5' sx={{ fontSize: { xs: '15px', md: '20px' } }}>{items.name}</Typography>
                      <MuiLink href="#">
                        <ArrowCircleRightIcon sx={{ fontSize: '50px' }} />
                      </MuiLink>
                    </Box>
                    {/* <Box sx={{ mt: 2 }}>
                                <ProgressBar now={items.progress} label={`${items.progress}%`} />
                              </Box> */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                      <Typography variant='body1' sx={{ fontSize: { xs: '12px', md: '17px' } }}>{items.description ? items.description.substring(0, 150) : null}</Typography>
                      <Box sx={{alignSelf:"flex-end"}}>
                                  <ReactApexChart type="radialBar" series={[(index*10)%100]} options={chartOptions} width={50} height={50} />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
            }

            {subTopics.length === 0 ? (
              <Box style={{ alignItems: 'center', justifyContent: 'center', width: '100%', display: 'flex' }}>
                <Typography variant='h4' sx={{ fontSize: { xs: '12px', md: '17px' } }}>No Sub Topics Found</Typography>
              </Box>
            ) : (null)}
          </Grid>
        </Box>
      )}

    </Box>
  );
}

export default ExaminationSubTopics;
