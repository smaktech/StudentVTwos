import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Loader from 'react-loader-spinner';
import { getAllSubTopic, getSubTopicById } from '../../api/SubTopic/SubTopic';
import RenderPpt from './RenderPpt';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import { getCourseById, getUserCourseById } from '../../api/Courses/Courses';


export default function CoursesVideo() {


  const theme = useTheme();
  console.log('theme', theme.palette.primary.main);
  const { subTopicID, topicID, courseName, subjectName, boardName, qualificationName, topicName, subTopicName } = useParams();
  const courseID = useParams();

  // // const courseID = props.match.params.id

  const userDetails = useSelector((state) => state.user.info);

  const activeTab = useSelector((state) => state.user.activeTab);

  const dispatch = useDispatch();
  //  //sets the visibility of the filter modal
  const [filterModal, setFilterModal] = useState(false);

  //  //sets the exam model
  const [examModel, setExamModel] = useState(false);
  const [examData, setExamData] = useState(false);
  const [videoPlayer, setVideoPlayer] = useState(false);

  //  //sets the loader of apply changes in filter modal
  const [filterLoader, setFilterLoader] = useState(false);

  //  // sets for all Topics
  const [topicData, setTopicData] = useState([]);

  //   // sets for Topic items
  const [topicItems, setTopicItems] = useState();

  //  // sets for Topic items
  const [videoLink, setVideoLink] = useState();

  //  // console.log("topicItems", topicItems)

  //  // sets for all Topics of user
  const [userTopicData, setUserTopicData] = useState([]);
  const [userSubjectData, setUserSubjectData] = useState([]);
  const [userCourseData, setUserCourseData] = useState([]);
  const [courseProgress, setCourseProgress] = useState();

  const [courses, setCourse] = useState([]);
  const [subject, setSubject] = useState([]);

  //  // sets the no courses found
  const [noTopicData, setNoTopicData] = useState([]);

  //  //table data loading indicator
  const [dataLoading, setDataLoading] = useState(false);

  //  // set for page
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const history = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  console.log('tabValue:', tabValue);

  const handleChange = (event, newValue) => {
    console.log('newValue:', newValue);
    setTabValue(newValue);
  };

  const [activeSubTopic, setActiveSubTopic] = useState({})


  const [offset, setOffset] = useState(1);
  const fetchSubTopicLimit = 1000;
  const [loader, setLoader] = useState(false);
  const [subTopics, setSubTopics] = useState([])

  useEffect(async () => {

    const response = await getAllSubTopic(topicID, offset, fetchSubTopicLimit)
    if (response.status) {

      setSubTopics(response.results.data)
    }

  }, [topicID])

  useEffect(async () => {
    setLoader(true);
    const response = await getSubTopicById(subTopicID)
    if (response.status) {
      setActiveSubTopic(response.subTopic)
    }

    setLoader(false);

  }, [subTopicID])

    //  // const action4ActiveTab = (tab) => {
    //  //     dispatch({ type: SET_ACTIVE_TAB, payload: { activeTab: tab } });
    //  // }

    // useEffect(() => {
    //     setDataLoading(true);
    //     getCourseById(courseID.id)
    //         .then((res) => {
    //             console.log('subject', res);
    //             if (res.status) {
    //                 //   //setting the fetched Topics into state variable
    //                 setTopicData(res.course.topicIDs);
    //                 setSubject(res.course.subjectID);
    //                 setCourse(res.course);
    //             } else {
    //                 //  //setting no Topic found variable true
    //                 setNoTopicData(true);
    //             }
    //             setDataLoading(false);
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });
    // }, [courseID.id]);

    // useEffect(() => {
    //     if (courseID.id && userDetails._id) {
    //         setDataLoading(true);
    //         getUserCourseById(userDetails._id, courseID.id)
    //             .then((res) => {
    //                 console.log('user topics', res);
    //                 if (res.status) {
    //                     // //setting the fetched Topics into state variable
    //                     setUserTopicData(res.topics);
    //                     setUserSubjectData(res.course[0]?.courseID?.subjectID);
    //                     setUserCourseData(res.course);
    //                     setCourseProgress(res.course[0]?.progress);
    //                     setExamData(true);
    //                     setVideoLink(res.topics[0]?.topicID?.videoLink?.linkString);
    //                 } else {
    //                     //  //setting no Topic found variable true
    //                     setNoTopicData(true);
    //                 }
    //                 setDataLoading(false);
    //             })
    //             .catch((err) => {
    //                 console.error(err);
    //             });
    //     }
    // }, [courseID.id, userDetails]);
    ;


  return (
    <Box sx={{ width: '95%', m: '0 auto' }}>
      <Box sx={{ display: 'flex' }}>
        <Button variant='contained' sx={{mr:2}} onClick={() => history(-1)}><ArrowBackIcon />Back</Button>
        <Typography variant='h5'  >{subTopicName}</Typography>

      </Box>
    
      <Box sx={{ mb: 2,mt:2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="small">
          {`${qualificationName} > ${boardName} > ${courseName} > ${subjectName} > ${topicName} > ${subTopicName}`}
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
        <Grid container spacing={1}>
          <Grid item xs={12} md={10}>
            <Grid item xs={12} md={12}>
              <Grid container spacing={0} sx={{ boxShadow: 2, borderRadius: '20px', border: "1px solid #c0ae0c" }}>
                {/* <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '450px' }}> */}
                {/* <VideoPlayer videoLink={videoLink} courseID={courseID} topicItems={topicItems} /> */}
                <RenderPpt subTopic={activeSubTopic} />
                {/* <Box sx={{ textAlign: 'center', width: '100%' }}>
                  <Button
                    sx={{ mt: 3, width: '170px', fontSize: '22px' }}
                    size='large'
                    variant='outlined'
                    onClick={() => {
                      history(`/dashboard/examination/subTopics/learning/${subTopicID}/${topicID}/${courseName}/${qualificationName}/${subjectName}/${boardName}/${topicName}/${subTopicName}`)
                      // examination/subTopics/learning/:subTopicID/:topicID/:courseName/:qualificationName/:subjectName/:boardName/:topicName/:subTopicName
                    }}
                  >Take a test</Button>
                </Box> */}

                {/* </Box>  */}
              </Grid>
              <Box sx={{ textAlign: 'center', width: '100%' }}>
                <Button
                  sx={{ mt: 3, width: '170px', fontSize: '22px' }}
                  size='large'
                  variant='outlined'
                  onClick={() => {
                    history(`/dashboard/examination/subTopics/learning/${subTopicID}/${topicID}/${courseName}/${qualificationName}/${subjectName}/${boardName}/${topicName}/${subTopicName}`)
                    // examination/subTopics/learning/:subTopicID/:topicID/:courseName/:qualificationName/:subjectName/:boardName/:topicName/:subTopicName
                  }}
                >Take a test</Button>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} md={2}>
            {subTopics.map((items, index) => (
              <Grid item xs={12} md={12} lg={12}>
                <Card
                  variant="outlined"
                  type="button"
                  sx={{ borderRadius: '5px', mb: 2, borderColor: items._id === subTopicID ? "#c0ae0c" : "#fff" }}
                  onClick={() => {
                    // setExamData(true);
                    // setVideoLink(items?.topicID?.videoLink?.linkString);
                    // console.log(items?.courseID);
                    // console.log(items)
                    // setVideoLink(
                    //   items &&
                    //   items.topicID.videoLink &&
                    //   items.topicID.videoLink.linkString
                    // );
                    history(`/dashboard/courses/subTopics/learning/${items._id}/${topicID}/${courseName}/${qualificationName}/${subjectName}/${boardName}/${topicName}/${items.name}`)
                  }}>
                  <CardContent sx={{ padding: { xs: '10px', md: '14px' } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant='h5' sx={{ fontSize: { xs: '14px', md: '14px' } }}>{items.name}</Typography>
                      {/* <MuiLink href="#">
                                    <ArrowCircleRightIcon />
                                  </MuiLink> */}
                    </Box>
                    {/* <Box sx={{ mt: 2 }}>
                                  <ProgressBar now={items.progress} label={`${items.progress}%`} />
                                </Box>
                                <Box>
                                  <Typography variant='body1' sx={{ fontSize: { xs: '12px', md: '17px' } }}>{items.topicID.description ? items.topicID.description.substring(0, 150) : null}dfdf</Typography>
                                </Box> */}
                  </CardContent>
                </Card>
              </Grid>
            ))
            }
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            {/* <Box sx={{ m: 3, textAlign: 'center' }}>
                          <Typography variant='h3'>LEARNINGs</Typography>
                        </Box>
                        <Grid container spacing={2}>
                          {userTopicData.map((items, index) => (
                            <Grid item xs={6} md={12} lg={6}>
                              <Card
                                variant="outlined" sx={{ borderRadius: '5px', mb: 2 }}
                                onClick={() => {
                                  setExamData(true);
                                  setVideoLink(items?.topicID?.videoLink?.linkString);
                                  // console.log(items?.courseID);
                                  // console.log(items)
                                  // setVideoLink(
                                  //   items &&
                                  //   items.topicID.videoLink &&
                                  //   items.topicID.videoLink.linkString
                                  // );
                                }}>
                                <CardContent sx={{ padding: { xs: '10px', md: '22px' } }}>
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant='h5' sx={{ fontSize: { xs: '14px', md: '20px' } }}>{items.topicID.name}</Typography>
                                    <MuiLink href="#">
                                      <ArrowCircleRightIcon />
                                    </MuiLink>
                                  </Box>
                                  <Box sx={{ mt: 2 }}>
                                    <ProgressBar now={items.progress} label={`${items.progress}%`} />
                                  </Box>
                                  <Box>
                                    <Typography variant='body1' sx={{ fontSize: { xs: '12px', md: '17px' } }}>{items.topicID.description ? items.topicID.description.substring(0, 150) : null}</Typography>
                                  </Box>
                                </CardContent>
                              </Card>
                            </Grid>
                          ))
                          }
                        </Grid> */}
          </Grid>
          {!examData ? (
            <>
              <Grid item xs={12} md={6} lg={6}>
                <Box>
                  {/* <Box sx={{ m: 3, textAlign: 'center' }}>
                                <Typography variant='h3'>Examinations</Typography>
                              </Box>
                              <Grid container spacing={2}>
                                {userTopicData.map((items, index) => (
                                  <Grid item xs={6} md={12} lg={6}>
                                    <Card
                                      variant="outlined" sx={{ borderRadius: '5px' }}
                                      onClick={() => {
                                        setExamData(true);
                                      }}>
                                      <CardContent sx={{ padding: { xs: '10px', md: '22px' } }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                          <Typography variant='h5' sx={{ fontSize: { xs: '15px', md: '20px' } }}>{items.topicID.name}</Typography>
                                          <MuiLink href="#">
                                            <ArrowCircleRightIcon />
                                          </MuiLink>
                                        </Box>
                                        <Box sx={{ mt: 2 }}>
                                          <ProgressBar now={items.progress} label={`${items.progress}%`} />
                                        </Box>
                                        <Box>
                                          <Typography variant='body1' sx={{ fontSize: { xs: '12px', md: '17px' } }}>{items.topicID.description ? items.topicID.description.substring(0, 150) : null}</Typography>
                                        </Box>
                                      </CardContent>
                                    </Card>
                                  </Grid>
                                ))
                                }
                              </Grid> */}
                  <div>
                    {/* {userTopicData.map((items, index) => (
                              <Card className="shadow mt-5">
                                <Link>
                                <CardContent>
                                  <div className="d-flex justify-content-between">
                                    <h5 className="text-center rounded-pill txt-5282F0">{items.topicID.name}</h5>
                                    <a className="text-center rounded-pill txt-5282F0">
                                      <i style={{ color: '#b29603' }} className="far fa-arrow-circle-right">
                                        {''}
                                      </i>
                                      {''}
                                    </a>
                                  </div>
                                  <div className=" mt-2">
                                    <ProgressBar now={items.progress} label={`${items.progress}%`} />
                                  </div>
                                  <div className="mt-4">
                                    <p className="txt-5282F0 ">
                                      {items.topicID.description ? items.topicID.description.substring(0, 150) : null}
                                    </p>
                                  </div>
                                </CardContent>
                                </Link>
                              </Card>
                            ))} */}
                  </div>
                </Box>
              </Grid>
            </>

          ) : (
            <>
              <Grid item xs={12} md={8}>
                {/* <Grid container spacing={0}>

                              {!videoPlayer ? (
                                <Grid item xs={12}>
                                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '450px' }}>
                                      <Button
                                        variant='outlined'
                                        onClick={() => {
                                          setVideoPlayer(true);
                                          setVideoLink(
                                            topicItems &&
                                            topicItems.topicID.videoLink &&
                                            topicItems.topicID.videoLink.linkString
                                          );
                                        }}
                                      >Proceed To Tutorial
                                      </Button>
                                      <Button
                                        variant="outlined"
                                        sx={{ mt: 1 }}
                                      >
                                        Proceed To Examination
                                      </Button>
                                    </Box>
                                  </Box>
                                </Grid>
                              ) : (
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '450px' }}>
                                  <VideoPlayer videoLink={videoLink} courseID={courseID} topicItems={topicItems} />
                                </Box>
                              )}
                            </Grid> */}
              </Grid>
              <div>
                {/* <div className="col-lg-8 col-md-8 " style={{ marginTop: 125 }}>
                              {!videoPlayer ? (
                                <div
                                  className="border d-flex justify-content-center align-items-center border-secondary w-100"
                                  style={{ height: 450 }}
                                >
                                  <div className="">
                                    <Button
                                      variant="outlined"
                                      className="  m-2 d-flex align-items-center m0AutoImp"
                                      onClick={() => {
                                        setVideoPlayer(true);
                                        setVideoLink(
                                          topicItems &&
                                          topicItems.topicID.videoLink &&
                                          topicItems.topicID.videoLink.linkString
                                        );
                                      }}
                                    >
                                      Proceed To Tutorial
                                    </Button>
                                    <Button variant="outlined" className="  m-2 d-flex align-items-center">
                                      Proceed To Examination
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className="border d-flex justify-content-center align-items-center border-secondary w-100"
                                  style={{ height: 450 }}
                                >
                                  {videoLink.linkType == iframe ? (
                                                                            <iframe src="url" title="description" /> 
                                                                        ) : (
                                  <VideoPlayer videoLink={videoLink} courseID={courseID} topicItems={topicItems} />
                                  )}
                                </div>
                              )}
                            </div> */}
              </div>
            </>
          )}
        </Grid>
      )
      }

    </Box >
  );
};