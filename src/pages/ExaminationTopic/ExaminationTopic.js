import React, { useState, useEffect } from 'react';
import { Col, FormControl, InputGroup, Modal, Nav, Navbar, Row } from 'react-bootstrap';
import { BsSortDownAlt } from 'react-icons/bs';
import Loader from 'react-loader-spinner';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useSelector, useDispatch } from 'react-redux';
// // import { SET_ACTIVE_TAB } from '../../Reducers/types';
// // import ProgressBar from 'progress';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';

import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid'
import { Link as MuiLink } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useTheme } from '@material-ui/core/styles';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import { getCourseById, getUserCourseById } from '../../api/Courses/Courses';
import CoursesVideo from '../CoursesVideo/CoursesVideo';
import ExaminationPage from '../ExaminationPage/ExaminationPage';



export default function ExaminationTopic(props) {
    const theme = useTheme();
    console.log('theme', theme.palette.primary.main);
    const { id, courseName, subjectName, boardName } = useParams();
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

    //  // const action4ActiveTab = (tab) => {
    //  //     dispatch({ type: SET_ACTIVE_TAB, payload: { activeTab: tab } });
    //  // }

    useEffect(() => {
        setDataLoading(true);
        getCourseById(courseID.id)
            .then((res) => {
                console.log('subject', res);
                if (res.status) {
                    //   //setting the fetched Topics into state variable
                    setTopicData(res.course.topicIDs);
                    setSubject(res.course.subjectID);
                    setCourse(res.course);
                } else {
                    //  //setting no Topic found variable true
                    setNoTopicData(true);
                }
                setDataLoading(false);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [courseID.id]);

    useEffect(() => {
        if (courseID.id && userDetails._id) {
            setDataLoading(true);
            getUserCourseById(userDetails._id, courseID.id)
                .then((res) => {
                    console.log('user topics', res);
                    if (res.status) {
                        // //setting the fetched Topics into state variable
                        setUserTopicData(res.topics);
                        setUserSubjectData(res.course[0]?.courseID?.subjectID);
                        setUserCourseData(res.course);
                        setCourseProgress(res.course[0]?.progress);
                        setExamData(true);
                        setVideoLink(res.topics[0]?.topicID?.videoLink?.linkString);
                    } else {
                        //  //setting no Topic found variable true
                        setNoTopicData(true);
                    }
                    setDataLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [courseID.id, userDetails]);
    console.log(userTopicData);
    return (
        <>
            {console.log(topicItems)}
            <Box sx={{ width: '100%' }}>
                <Box sx={{ mb: 1 ,mt:1}}>
                    <Typography variant="small">
                        {`${boardName} > ${courseName} > ${subjectName} `}
                        {topicItems ? `> ${topicItems?.topicID.name}` : ``}
                    </Typography>
                </Box>

                <Box>
                    {/* <Tab.Content> */}
                    {dataLoading ? (
                        <div
                            className="w-100 py-2 px-6 me-3"
                            style={{ display: 'flex', height: '70vh', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <Loader type="Puff" color="#c0ae0c" height={30} width={30} />
                        </div>
                    ) : (
                        <>
                            <div>
                                {/* <div
                className="d-flex justify-content-between clr-primary-400 mt-4"
                style={{ height: 100, alignSelf: 'center' }}
              >
                <div className="row w-75 mt-3 mx-4">
                  <div className="col-lg-1 col-md-1 col-2 " style={{ alignSelf: 'center' }}>
                    <Typography>
                      {' '}
                      <a href="" onClick={() => history.goBack()}>
                        <i className="fas fa-arrow-left">{''}</i>
                        {''}
                      </a>
                    </Typography>
                  </div>
                  <div className="col-lg-4 col-md-5 col-6" style={{ alignSelf: 'center' }}>
                    <Typography variant="h6" >{subject ? subject.name : ''}</Typography>
                    <Typography variant="h6" sx={{ fontSize: { xs: '', md: '18px' } }}>
                      <img src="/Assets/Ellipse.png" className="d-inline" alt="Topics" /> {courses ? courses.name : ''}
                    </Typography>
                  </div>
                </div>
                {courseProgress && (
                  <div className="mx-5" style={{ width: 60, height: 60, alignSelf: 'center' }}>
                    <CircularProgressbar
                      value={courseProgress}
                      text={`${courseProgress}%`}
                      styles={buildStyles({
                        pathColor: `rgba(62, 55, 95, ${courseProgress / 100})`,
                        textColor: '#edebf5',
                      })}
                    />
                    ;
                  </div>
                )}
              </div>
              <div className="mt-4">
                <h6 className="txt-5282F0 mx-4">{courses.description}</h6>
              </div>
              <hr style={{ height: 5, color: '#1F1A38' }} /> */}
                            </div>

                            {!examModel ? (
                                <>
                                    <Box>
                                        <Typography variant='h5'>LEARNING</Typography>
                                        <Grid container spacing={2} sx={{ mt: '10px' }}>
                                            {userTopicData.map((items, index) => (
                                                <Grid item xs={6} md={4} lg={4}>
                                                    <Card
                                                        variant="outlined" sx={{ borderRadius: '5px',boxShadow: 10, }}
                                                        onClick={() => {
                                                            setExamModel(true);
                                                            setTopicItems(items);
                                                            console.log('examModel');
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
                                        </Grid>
                                    </Box>
                                    <div>
                                        {/* <div className="mt-4 mx-4">
                      <h5 className="txt-5282F0 fw-bold">LEARNING</h5>
                    </div>
                    <div className="row d-flex justify-content-start align-items-center mt-4 mx-2">
                      {userTopicData.map((items, index) => (
                        <div className="col-lg-4 col-12 col-md-4">
                          <Card
                            className="shadow "
                            type="button"
                            onClick={() => {
                              setExamModel(true);
                              setTopicItems(items);
                              console.log('examModel');
                            }}
                          >
                            <Link to={'/app/courseTopics/' + courses._id}>
                              <Button className='btn' onClick={() => setExamModel(true)}>
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
                                  <div className="mt-2">
                                    <ProgressBar now={items.progress} label={`${items.progress}%`} />
                                  </div>
                                  <div className="mt-4">
                                    <p className="txt-5282F0 ">
                                      {items.topicID.description ? items.topicID.description.substring(0, 150) : null}
                                    </p>
                                  </div>
                                </CardContent>
                              </Button>
                            </Link>
                          </Card>
                        </div>
                      ))}
                    </div> */}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <ExaminationPage />
                                </>
                            )}



                        </>
                    )}

                    {/* </Tab.Content> */}
                </Box>
            </Box>
            <div>
                {/* Modal for applying filter
            <Modal
                show={filterModal}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => setFilterModal(false)}
            >
                <Modal.Header className="clr-primary-400 py-2" closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className="text-center">
                        <h4 className="text-center   mb-0">
                            Apply Filter
                        </h4>

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row labelColor">
                        <label>Courses</label>
                        <div className='d-flex justify-content-start mt-2'>
                            <div className='row'>
                                <div className='col-3 w-20 justify-content-center d-flex  rounded shadow-lg clr-primary-200   mx-2'>
                                    <button className=' btn   '>All</button>
                                </div>
                                <div className='col-3 w-20 justify-content-center d-flex  rounded shadow-lg mx-2'>
                                    <button className=' btn txt-5282F0 '>CBSE</button>
                                </div>
                                <div className='col-3 w-20 justify-content-center d-flex  rounded shadow-lg mx-2'>
                                    <button className=' btn txt-5282F0 '>ICSC</button>
                                </div>
                                <div className='col-3 w-20 justify-content-center d-flex  rounded shadow-lg mx-2'>
                                    <button className=' btn txt-5282F0 '>BSEB</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row labelColor mt-3">
                        <label>Courses</label>
                        <div className='d-flex justify-content-start mt-2'>
                            <div className='row'>
                                <div className='col-3 w-20 btn h-30 justify-content-center d-flex  rounded-circle shadow-lg clr-primary-200   mx-2 mb-2'>
                                    <button className=' btn    mx-2'>All</button>
                                </div>
                                <div className='col-3 w-20 btn h-30 justify-content-center d-flex  rounded-circle shadow-lg mx-2 mb-2'>
                                    <button className=' btn txt-5282F0 mx-2'>Level  A</button>
                                </div>
                                <div className='col-3 w-20 btn h-30 justify-content-center d-flex  rounded-circle shadow-lg mx-2 mb-2'>
                                    <button className=' btn txt-5282F0 mx-2'>Level B</button>
                                </div>
                                <div className='col-3 w-20 btn h-30 justify-content-center d-flex  rounded-circle shadow-lg mx-2 mb-2'>
                                    <button className=' btn txt-5282F0 mx-2'>Level C</button>
                                </div>
                                <div className='col-3 w-20 btn h-30 justify-content-center d-flex  rounded-circle shadow-lg mx-2 mb-2'>
                                    <button className=' btn txt-5282F0 mx-2'>Level D</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row labelColor">
                        <label>Courses</label>
                        <div className='d-flex justify-content-start align-items-center mt-2'>
                            <div className='row'>
                                <div className='col-3 w-20 justify-content-center d-flex rounded shadow-lg clr-primary-200   mx-2'>
                                    <button className=' btn   '>All</button>
                                </div>
                                <div className='col-3 w-20 justify-content-center d-flex rounded shadow-lg mx-2'>
                                    <button className=' btn txt-5282F0 '>Biology</button>
                                </div>
                                <div className='col-3 w-20 justify-content-center d-flex rounded shadow-lg mx-2'>
                                    <button className=' btn txt-5282F0 '>Physics</button>
                                </div>
                                <div className='col-3 w-20 justify-content-center d-flex rounded shadow-lg mx-2'>
                                    <button className=' btn txt-5282F0 '>Chemistry </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-4 pb-3">
                        <button className="btn btn-outline-secondary px-5"
                        // onClick={()=>resetFilterData()} 
                        >Reset </button>
                        &emsp;
                        {filterLoader ? (
                            <button className="  px-5" >
                                <Loader
                                    type="Puff"
                                    color="white"
                                    height={30}
                                    width={30}
                                />
                            </button>
                        ) : (
                            <button className="  px-5"
                            // onClick={() => { applyFilters() }}
                            >Confirm</button>
                        )}

                    </div>
                </Modal.Body>
            </Modal> */}
            </div>
        </>
    );
}
