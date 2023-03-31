import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Divider, Fade, Grid, Grow, TableRow, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Loader from 'react-loader-spinner';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {   Redirect } from 'react-router-dom'
import LineChart from './LineChart';
import PieChart from './PieChart';
import SpiderChart from './SpiderChart';
import { KanbanColumnAdd } from '../../sections/@dashboard/kanban';
// // import { SET_ACTIVE_TAB } from '../../Reducers/types';
import { getAllEvaluation, editEvaluation, deleteCourse, getEvaluationByFilter, getEvaluationById, getAllUserEvaluations} from '../../api/Evaluation/Evaluation';
import { Getallstudentevallist} from '../../api/StudentEval/studenteval';
import { getSingleAnswer} from '../../api/Answer/Answer';
import { baseUrl, dataLimit } from '../../index';

// // import StripeCheckout from 'react-stripe-checkout';
import { paymentGetway } from '../../api/Subscription/subscription';
import { AnnualPlanperSubject, AnnualPlanwithUnlimitedAccess, MonthlyPlanperSubject } from '../../config';
import Kanban from '../dashboard/Kanban';
import DistributedColumnsChart from './DistributedColumnChart';
import DonutChart from './DonutChart';
import SingleEvaluationRow from './SingleEvaluationRow';
import { getAllBoard } from '../../api/Boards/Boards'
import { getAllSubjects } from '../../api/Subject/Subject';

import { Modal as BootstrapModal } from 'react-bootstrap'
// import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';

// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

import { Button } from '@mui/material';
// import SingleEvaluationRow from './SingleEvaluationRow';



    // const tableIcons = materialTableIcons
    //setting course data into a variable
    // const [course, setCourse] = useState([]);
    

    //setting course data into a variable
        //sets the id and name of the topic who is blocked or deleted
    
export function Bull() {
    return (
        <Box component="span" sx={{ display: 'inline-block', mr: '10px', transform: 'scale(1.5)', fontSize: '30px' }}>
            •
        </Box>
    );
}

export default function MyExams() {

    // //sets the visibility of the filter modal
    const [filterModal, setFilterModal] = useState(false);

    const userDetails = useSelector((state) => state.user.info);
    // console.log('userDetails', userDetails);
    // // const activeTab = useSelector((state) => state.user.activeTab)
    // // const dispatch = useDispatch();

    const navigateTo = useNavigate();
    // // sets the no courses found
    const [noCourses, setNoCourses] = useState(false);

    // //sets the all courses of user
    const [userCourses, setUserCourses] = useState([]);
    console.log(userCourses);
    // console.log(userCourses);

    // // sets for the courses data
    const [courses, setCourse] = useState([]);
    const [courseName, setCourseName] = useState();

    // //sets the all selected courses for purchase
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [isSelected, setIsSelected] = useState();
    // console.log('selectedCourses', selectedCourses);

    const [planMsg, setPlanMsg] = useState('');

    // //sets the visibility of the Price modal
    const [pricingModal, setPricingModal] = useState(false);

    // //sets the subscription paln
    const [subscription, setSubscription] = useState(false);

    // // sets for all subjects
    const [subjectData, setSubjectData] = useState([]);
    const [subjectID, setSubjectID] = useState();
    // console.log(subjectName)

    // //setting board data into a variable
    const [boardData, setBoardData] = useState([]);
    const [boardID, setBoardID] = useState();
    const [evaluation, setEvaluation] = useState([]);


    // // sets for search
    const [search, setSearch] = useState('');

    // //table data loading indicator
    const [dataLoading, setDataLoading] = useState(false);

    // //sets the loader of apply changes in filter modal
    const [filterLoader, setFilterLoader] = useState(false);

    const [payButtonLoader, setPayButtonLoader] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState();
    // // set for page
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [price, setPrice] = useState();
    const [activeBtn, setActiveBtn] = useState();
    const [activeBoardBtn, setActiveBoardBtn] = useState();
    const navigate = useNavigate();
    const [tabValue, setTabValue] = useState(0);


    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

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

    // // fetching Courses by filter
    useEffect(() => {
        if (filterLoader || search != null) {
            //  // if(search!=null || search.length > 0) {
            // //setting the loader for table
            setDataLoading(true);
            //  //calling filter functions with required parameters
            // console.log(filterDateFrom)
            getEvaluationByFilter(search, boardID, subjectID)
                .then((res) => {
                    // console.log('filterData', res);
                    if (res.status) {
                        setEvaluation(res.results.data);
                        setTotalPages(res.results.totalPages);
                    } else {
                        setEvaluation([]);
                    }
                    setFilterLoader(false);
                    setDataLoading(false);
                    setFilterModal(false);
                })
                .catch((err) => {
                    // console.log(err);
                    setFilterLoader(false);
                });
            // }
        }
    }, [search, filterLoader]);

    //  //function to confirm the filter changes
    function applyFilters() {
        setFilterLoader(true);
    }

    useEffect(() => {
        setDataLoading(true);
        setNoCourses(false);
        //  // fetching All courses
        getAllEvaluation(page, dataLimit).then((res) => {
            
                // console.log('coursesData', res);
                if (res.status) {
                    //  //setting the fetched Topics into state variable
                    setEvaluation(res.results);
                    setTotalPages(res.results.totalPages);
                    console.log('Evaluation Data students portal', res.results);
                } else {
                    //  //setting no Topic found variable true
                    setNoCourses(true);
                }
                setDataLoading(false);
            })
            .catch((err) => {
                // console.error(err);
            });
          
            //  // fetching all subjects
        getAllSubjects(page, dataLimit)
            .then((res) => {
                console.log('Subjects', res);
                if (res.status) {
                    //  //setting the fetched Subject into state variable
                    setSubjectData(res.results.data);
                }
            })
            .catch((err) => {
                // console.error(err);
            });
            

            function openDeleteAlertModal(id, index) {
                // console.log(id, index)
        
                setCourseId(id);
                setRowId(index)
                setModalMode('delete');
                setModalTitle('Delete the Course?');
                setInfo('All the details of the Course will be removed from the Platform');
                setModalAlertTitle(true)
            }
        
            //function to change the status of the Course to blocked!
            function changeCourseStatus(rowData, index, status) {
                edite(rowData._id, rowData.name, rowData?.boardID?._id, rowData?.subBoardID?._id, rowData?.classesID?._id, rowData?.subjectID?._id, rowData?.description, status)
                    .then((res => {
                        // console.log('res',res);
                        if (res.status) {
                            // const index = rowData.tableData.id;
                            //updating Course status in state array
                            const updatedRows = [...course];
                            updatedRows[index].status = status;
                            setEvaluation(updatedRows);
        
                        }
                        else {
                            alert("error occured")
                        }
                    }))
                    .catch((err => {
                        // console.log('err', err);
                    }))
            }

        // // fetching all boards
        getAllBoard(page, dataLimit)
            .then((res) => {
                console.log('Boards', res);
                if (res.status) {
                    // //setting the fetched board into state variable
                    setBoardData(res.results.data);
                }
            })
            .catch((err) => {
                // console.error(err);
            });
    }, [page, dataLimit]);

    useEffect(() => {
        // // fetching all user courses
        setDataLoading(true);
        getAllUserEvaluations(userDetails?._id)
            .then((res) => {
                // console.log('getAllUserCourses', res);
                if (res.status) {
                    // //setting the fetched getAllUserCourses into state variable
                    setUserCourses(res.courses);
                    console.log('hello', res.courses);
                }
                setDataLoading(false);
            })
            .catch((err) => {
                // console.error(err);
            });
    }, [userDetails?._id]);

    // // function to set activetab in redux
    // // const action4ActiveTab = (tab) => {
    //     console.log('tab', tab)
    // //     dispatch({ type: SET_ACTIVE_TAB, payload: { activeTab: tab } });
    // // }

    const resetFilterData = () => {
        setBoardID('');
        setSubjectID('');
        setActiveBtn();
        setActiveBoardBtn();
        setFilterLoader(true);
    };

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
        paymentGetway(selectedPlan, selectedCourses?.length, selectedCourses, userDetails?._id)
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

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    function renderDate(date) {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const newDate = new Date(date);
        const returnDate = months[newDate.getMonth()] + ' ' + newDate.getDate() + ' ' + newDate.getFullYear();
        return returnDate;
    }
    const [hover, setHover] = useState(false)



    // respondive mui grid spacing
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const isLarge = useMediaQuery(theme.breakpoints.up('lg'))
    return (
        <Box>
            <Box sx={{ mb: 2 }}>
                {/* <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, height: 80 }}>
                      <Box sx={{ width: '70%' }}>
                        <Grid container spacing={2}>
                          <Grid item xs={10}>
                            <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search" />
                          </Grid>
                          <Grid item xs={2} sx={{ px: '10px' }}>
                            <Button sx={{ height: '100%', p: 0 }} variant="contained" onClick={() => setFilterModal(true)}>
                              <BsSortDownAlt />
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box> */}

                {dataLoading ? (
                    <Box sx={{ display: 'flex', height: '70vh', justifyContent: 'center', alignItems: 'center' }}>
                        <Loader type="Puff" color="#c0ae0c" height={30} width={30} />
                    </Box>
                ) : (
                    <>
                        <Grid container spacing={isSmall ? 2 : 3} sx={{ width: '100%', mx: '0 auto' }}>
                            {
                                userCourses?.map((items, index) =>
                                    <Grid item md={4} key={index}>
                                        <Link style={{ textDecoration: 'none' }} to={(`/dashboard/examination/${items?.courseID?._id}/${items?.courseID?.name}/${items?.courseID?.classesID?.name}/${items?.courseID?.subjectID?.name}/${items?.courseID?.boardID?.name}`)}>
                                            <Card className="card-parent" sx={{boxShadow: 10,display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', borderRadius: '15px', height: { lg: '250px', md: '200px' } }}>
                                                {/* <img src="https://www.sheetmetal-iti.org/img/courses_hover.png" alt="" height={120} width={120} /> */}
                                                <CardMedia 
                                                    component="img" 
                                                    image={`${baseUrl}/${items.courseID?.image}`}
                                                    sx={{ height: '100%'}}
                                                    alt="Course Image"  
                                                /> 
                                                <Box className="card-overlay">
                                                    <Box className="card-textt" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '95%' }}>
                                                        <Typography variant='caption' color="white" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: { xs: "13px", md: '15px' }, width: '100%', textAlign: 'center' }}>
                                                            {items.courseID?.classesID ? items?.courseID?.classesID?.name : ''}
                                                        </Typography>
                                                        <Typography variant='caption' color="white" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: { xs: "13px", md: '15px' }, width: '100%', textAlign: 'center' }}>
                                                            {items.courseID?.boardID ? items?.courseID?.boardID?.name : ''}
                                                        </Typography>
                                                        <Typography variant='caption' color="white" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: { xs: "13px", md: '15px' }, width: '100%', textAlign: 'center' }}>
                                                            {items.courseID?.subjectID ? items?.courseID?.subjectID?.name : ''}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Card>
                                        </Link>
                                    </Grid>
                                )
                            }
                            {/* {userCourses.map((items, index) => (
                                    <>
                                        <Grid item xs={12} md={4} lg={4}>
                                            <Card onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} on variant="outlined" sx={{ borderRadius: '5px',height:{lg:'250px',md:'200px'} }}>
                                            {!hover ?
                                                <Box sx={{display:'flex',justifyContent:'center',alignItems:'center', height:'100%'}}>
                                                <Link style={{ textDecoration: 'none', color: '#B29603' }} to={`/dashboard/courses/${items.courseID._id}/${items?.courseID?.name}/${items?.courseID?.subjectID?.name}/${items?.courseID?.boardID?.name}`}>
                                                    <CardContent sx={{ padding: { xs: '2px' } }}>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="body2" sx={{ color: 'primary', boxShadow: 2, borderRadius: '20px', px: '10px', fontSize: { xs: '10px', md: '15px' }, ml: { xs: '5px' } }}>
                                        New
                                        </Typography>
                                        <CardMedia
                                        sx={{ width: '10%' }}
                                        component="img"
                                        image="/Assets/coursesLogo.png"
                                        alt="courses"
                                        />
                                    </Box>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <CardMedia
                                                                sx={{ width: '50%' }}
                                                                component="img"
                                                                image="https://www.sheetmetal-iti.org/img/courses_hover.png"
                                                                alt="courses"
                                                            />
                                                        </Box>
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                mt: '10px',
                                                            }}
                                                        >
                                                            <Typography variant='caption' color="primary" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: { xs: "13px", md: '20px' }, width: '100%', textAlign: 'center' }}>
                                                                <Bull />

                                                                {items.courseID ? items.courseID.name : ''}
                                                            </Typography>
                                                            <Typography variant='body1' color="primary" sx={{ fontSize: { xs: "15px", md: '20px' } }}>{items.courseID ? items.courseID.subjectID?.name : ''}</Typography>

                                                        </Box>
                                                    </CardContent>
                                                </Link>
                                                </Box>
                                                :
                                                <Fade in={hover}>
                                                <Box sx={{background:'rgba(129, 122, 122, 0.23)',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',height:'100%'}}>
                                                <Typography variant='caption' color="primary" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: { xs: "13px", md: '20px' }, width: '100%', textAlign: 'center' }}>
                                                                <Bull />

                                                                {items.courseID ? items.courseID.name : ''}
                                                            </Typography>
                                                            <Typography variant='body1' color="primary" sx={{ fontSize: { xs: "15px", md: '20px' } }}>{items.courseID ? items.courseID.subjectID?.name : ''}</Typography>
                                                            <Typography variant='body1' color="primary" sx={{ fontSize: { xs: "15px", md: '20px' } }}>{items.courseID ? items.courseID.subjectID?.name : ''}</Typography>
                                                </Box>
                                                </Fade>
                                                
                                            }
                                            </Card>
                                        </Grid>
                                    </>
                                ))} */}
                        </Grid>
                    </>
                )}
                <Box sx={{ my: 4, mr: 1 }}>
                    <Typography variant='h3'>Your Progress Test</Typography>
                    <Grid container spacing={isLarge ? 3 : 2}>
                        <Grid item xs={12} md={3.8}>
                            <DonutChart />
                        </Grid>
                        <Grid item xs={12} md={3.7}>
                            <DistributedColumnsChart />
                        </Grid>
                        <Grid item xs={12} md={4.5}>
                            <SpiderChart />
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    {/* <Typography variant="h5" sx={{ fontSize: { xs: '15px', md: '20px' } }}>All Courses</Typography>
                      <Typography variant="body1" fontWeight={700} sx={{ fontSize: { xs: '15px', md: '20px' } }}>
                        Total Results {courses.length}
                      </Typography> */}
                    {/* <Typography variant='h3'>Continue Learning Test</Typography> */}

                    
                </Box>
            </Box>
            <h1><b>Examination</b></h1>

            <TableContainer>
                    <Table>
                        <TableHead>
                            <TableCell>S.No.</TableCell>                            
                            <TableCell >Course</TableCell>
                            <TableCell >Subject</TableCell>
                            <TableCell >Date Published</TableCell>                
                            <TableCell >Status</TableCell>
                            <TableCell >Action</TableCell>
                        </TableHead>
                        <TableBody>
                        {evaluation.map((row, index) =>   
                        <TableRow>
                            
                            <TableCell >{index + 1}</TableCell>
                            <TableCell >{row.course}</TableCell>
                            <TableCell >{row.subject}</TableCell>
                            <TableCell >{renderDate(row.createdAt)}</TableCell>
                            <TableCell>{row.status == 'inactive' ? ('In Active') : ('Active')}</TableCell>
                            <TableCell><Button onClick={() => navigate(`/dashboard/examination/Addtest/${row._id}`)}>Take Test</Button></TableCell>
                            
                            
                            {/* <TableCell >{row.description}</TableCell> */}
                        </TableRow>                          
                                )}
                                {console.log('student portal state value', evaluation )}
                               
                            
                        </TableBody>
                       
                        </Table>
                        </TableContainer>
        </Box>
    );
};

;