import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { Box, Typography, Grid, Tabs, Tab, Card, CardContent, CardActions, CardMedia, Divider, Button, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { FormControl } from 'react-bootstrap';
import { BsSortDownAlt } from 'react-icons/bs';
import { getTimelineByUserId } from '../../api/Timeline/Timeline';
import DashboardHeader from '../../layouts/dashboard/header';
import KanbanColumnAdd from './KanbanColumnAdd';
import { AnalyticsCurrentSubject, AnalyticsPieChart, AnalyticsWebsiteVisits } from '../../sections/@dashboard/general/analytics';
import RightSideBar from '../../layouts/dashboard/rigthsidebar/RightSideBar';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import {
  getAllBoard,
  getAllCourses,
  getAllSubjects,
  getAllUserCourses,
  getCoursesByFilter,
  getCourseById,
  getUserCourseById,
  getUserNotesById,
  deleteUserNotesByUserIdAndNoteId
} from '../../api/Courses/Courses';
// // import StripeCheckout from 'react-stripe-checkout';
import { paymentGetway } from '../../api/Subscription/subscription';
import { AnnualPlanperSubject, AnnualPlanwithUnlimitedAccess, MonthlyPlanperSubject } from '../../config';
import Kanban from '../dashboard/Kanban';
import PieChart from './PieChart';
import LineChart from './LineChart';
import SpiderChart from './SpiderChart';
import MyCourses from './MyCourses';
import AllCourses from './AllCourses';
import moment from 'moment';
import UserTimeline from './UserTimeline';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography variant='h1'>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}




export function Bull() {
  return (
    <Box component="span" sx={{ display: 'inline-block', mx: '10px', transform: 'scale(1.5)', fontSize: '30px' }}>
      •
    </Box>
  );
}


export default function Examination() {

   
  const history = useNavigate();
  const [loadingDelete, setLoadingDelete] = useState(false)
  // //sets the visib ility of the filter modal
  const [filterModal, setFilterModal] = useState(false);
  const courseID = useParams();
  const {activeTab}  = courseID;
  const userDetails = useSelector((state) => state.user.info);
  console.log(userDetails)
  //  // sets for all Topics
  const [topicData, setTopicData] = useState([]);
  //   // sets for Topic items
  const [topicItems, setTopicItems] = useState();
  //  // sets for Topic items
  const [videoLink, setVideoLink] = useState();
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
  const [tabValue, setTabValue] = useState(activeTab=="allcourses"?1:0);
  // //sets the all courses of user
  const [userCourses, setUserCourses] = useState([]);
  const [payButtonLoader, setPayButtonLoader] = useState(false);
  // //sets the subscription paln
  const [subscription, setSubscription] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState();
  // //sets the all selected courses for purchase
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [planMsg, setPlanMsg] = useState('');
  // //sets the visibility of the Price modal
  const [pricingModal, setPricingModal] = useState(false);
  const [price, setPrice] = useState();
  const [notes, setNotes] = useState([]);
  const [update, setUpdate] = useState(true);
  const [userTodayTimeline, setUserTodayTimeline] = useState([]);
  const [userTmrwTimeline, setUserTmrwTimeline] = useState([]);
  const sortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt);
  useEffect(() => {
    let price = 0;
    if (subscription === '1') {
      price = selectedCourses.length * 40;
    } else if (subscription === '2') {
      price = selectedCourses.length * 60;
    } else {
      price = selectedCourses.length * 120;
    }
    setPrice(price);
  }, [selectedCourses]);


  useEffect(() => {
    // // fetching all user courses
    setDataLoading(true);
    getAllUserCourses(userDetails?._id)
      .then((res) => {
        // console.log('getAllUserCourses', res);
        if (res.status) {
          // //setting the fetched getAllUserCourses into state variable
          setUserCourses(res.courses);
        }
        setDataLoading(false);
      })
      .catch((err) => {
        // console.error(err);
      });
  }, [userDetails?._id]);


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
            setUserSubjectData(res.course[0].courseID?.subjectID);
            setUserCourseData(res.course);
            setCourseProgress(res.course[0].progress);
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

  // // function to handle checkOut
  const paymentGetwayHandler = () => {
    setPayButtonLoader(true);
    let selectedPlan = '';
    if (subscription === '1') {
      selectedPlan = AnnualPlanperSubject;
    } else if (subscription === '2') {
      selectedPlan = MonthlyPlanperSubject;
    } else {
      selectedPlan = AnnualPlanwithUnlimitedAccess;
    }
    setSelectedPlan(selectedPlan);
    paymentGetway(selectedPlan, selectedCourses.length, selectedCourses, userDetails._id)
      .then((res) => {
        // console.log('session URL', res);
        if (res.status) {
          window.location.assign(res.url);
          // // <Redirect to={res.url} />
          // // history.push(res.url)
        }
        setPayButtonLoader(false);
      })
      .catch((err) => {
        // console.error(err);
      });
  };

  // //function to select course
  const action4SelectCourses = (e) => {
    const newCourseId = e.target.value;
    const arr = [...selectedCourses];
    if (!arr.includes(newCourseId)) {
      // // setIsSelected(arr.includes(newCourseId))
      arr.push(newCourseId);
      setSelectedCourses(arr);
    }
    // console.log(e.target.value);
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  // respondive mui grid spacing
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))


  const appendNotes = (note) => {
    let n = [...notes];
    n.unshift(note)
    setNotes(n)
  }
  useEffect(() => {
    if (userDetails._id) {
      getUserNotesById(userDetails._id)
        .then((res) => {
          console.log('notes', res);
          if (res.status) {
            setNotes(res.notes.slice(0, 3))
          }
        })
    }
  }, [userDetails])

  const deleteNote = (userID, noteID, index) => {

    if (!loadingDelete) {
      setLoadingDelete(true)
      deleteUserNotesByUserIdAndNoteId(userID, noteID)
        .then((data) => {
          if (data.status) {
            let n = [...notes]
            n.splice(n, 1)
            setNotes(n)
          }
          setLoadingDelete(false)
        })
    }

  }

  useEffect(() => {

    if (userDetails._id) {
      console.log(userDetails._id)
      getTimelineByUserId(userDetails._id, moment(Date.now()).format("Y-M-D"))
        .then(res => {
          console.log(res.data, " timeline")
          setUserTodayTimeline(res.data)
        })

      var date = new Date()
      // Add a day
      date.setDate(date.getDate() + 1)
      getTimelineByUserId(userDetails._id, moment(date).format("Y-M-D"))
        .then(res => {
          console.log(res, " timeline")
          setUserTmrwTimeline(res.data)
        })
    }

  }, [userDetails])



  return (
    <><Grid container spacing={0} sx={{ width: { xs: '90%', md: '98%' }, m: { xs: '0 auto', md: '0 auto' }, p: 0 }}>
      <Grid xs={12} md={9} lg={9.5}>
        <Box sx={{ width: '100%' }}>
          {/* <DashboardHeader /> */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleChange}>
              <Tab label="My Courses" {...a11yProps(0)} />
              <Tab label="All Courses" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            <MyCourses />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <AllCourses />

          </TabPanel>
          {/* </Tab.Content> */}

          {/* </Row> */}
        </Box>
      </Grid>
      <Grid xs={12} md={3} lg={2.5}>
        <Box sx={{ width: '100%', height: '100vh', marginTop: '63px' }}>
          <Grid container spacing={0}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography>Timeline/Activity</Typography>
            </Grid>
            <Grid item xs={12} sx={{ mb: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Card sx={{ boxShadow: 10, width: '100%', height: '250px' }}>
                <CardContent sx={{ p: 0 }}>
                  <Typography sx={{ textAlign: 'center' }} variant='h6'>Today</Typography>
                  <Divider style={{ background: 'black', width: '100%', m: '0 auto' }} variant='middle' />
                  <UserTimeline
                    timeline={userTodayTimeline}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sx={{ mb: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Card sx={{ boxShadow: 10, width: '100%', height: '250px' }}>
                <CardContent sx={{ p: 0, }}>
                  <Typography sx={{ textAlign: 'center' }} variant='h6'>Tomorrow</Typography>
                  <Divider style={{ background: 'black', width: '100%', m: '0 auto' }} variant='middle' />
                  <UserTimeline
                    timeline={userTmrwTimeline}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Card sx={{ boxShadow: 10, width: '100%', height: '300px' }}>
                <CardContent sx={{ p: 1 }}>
                  <KanbanColumnAdd appendNotes={appendNotes} />
                  <Box sx={{ width: '100%', textAlign: 'center' }}>
                    {notes?.map((noteDetails, index) =>
                      <Grid item md={12} key={index}>
                        <Box sx={{ boxShadow: 9, my: '10px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography sx={{ textAlign: 'start', }}>{noteDetails.note.slice(0, 40)}{noteDetails.note.length > 40 ? '...' : ''}</Typography>
                          <Button onClick={() => deleteNote(noteDetails.userID, noteDetails._id, index)}>
                            {loadingDelete ? (
                              <Loader type="Puff" color="#c0ae0c" height={30} width={30} />
                            ) : (
                              <DeleteIcon />
                            )}

                          </Button>
                        </Box>
                      </Grid>
                    )}
                  </Box>

                </CardContent>
                <CardActions sx={{ display: 'flex', background: "#fff", justifyContent: 'center', position: "absolute", bottom: 0, marginLeft: "auto", width: '100%' }}>
                  <Button onClick={() => {
                    history(`/dashboard/courses/notes/${userDetails?._id}`);
                  }} variant='text'>see all notes</Button>

                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sx={{ height: '100px', display: 'flex', justifyContent: 'end', alignItems: 'end' }}>
              <Box sx={{ display: 'flex', zIndex: 2, position: 'fixed', bottom: '2%', right: '2%' }}>
                <Box sx={{ borderRadius: '50%', backgroundColor: 'gray', p: 2, color: 'white' }}>
                  <AddCircleIcon sx={{ fontSize: '30px' }} />
                </Box>
                <Box sx={{ ml: 2, borderRadius: '50%', backgroundColor: 'gray', p: 2, color: 'white' }}>
                  <ChatBubbleIcon sx={{ fontSize: '30px' }} />
                </Box>
              </Box>
            </Grid>

          </Grid>
        </Box>
      </Grid>
    </Grid>
    </>
  );
};