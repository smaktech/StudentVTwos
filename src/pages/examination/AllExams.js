import React, { useEffect, useState } from 'react';
import { FormControl } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import { BsSortDownAlt } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, CardMedia, Checkbox, Grid, Typography } from '@mui/material';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { KanbanColumnAdd } from '../../sections/@dashboard/kanban';
// // import { SET_ACTIVE_TAB } from '../../Reducers/types';
import {
    getAllBoard,
    getAllCourses,
    getAllSubjects,
    getAllUserCourses,
    getCoursesByFilter,
} from '../../api/Courses/Courses';
import { dataLimit } from '../..';

// // import StripeCheckout from 'react-stripe-checkout';
import { paymentGetway } from '../../api/Subscription/subscription';
import { AnnualPlanperSubject, AnnualPlanwithUnlimitedAccess, MonthlyPlanperSubject } from '../../config';
import Kanban from '../dashboard/Kanban';

export default function AllExam() {

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
            getCoursesByFilter(search, boardID, subjectID)
                .then((res) => {
                    // console.log('filterData', res);
                    if (res.status) {
                        setCourse(res.results.data);
                        setTotalPages(res.results.totalPages);
                    } else {
                        setCourse([]);
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
        getAllCourses(page, dataLimit)
            .then((res) => {
                // console.log('coursesData', res);
                if (res.status) {
                    //  //setting the fetched Topics into state variable
                    setCourse(res.results.data);
                    setTotalPages(res.results.totalPages);
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

        // // fetching all boards
        getAllBoard(page, dataLimit)
            .then((res) => {
                // console.log('Boards', res);
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
        getAllUserCourses(userDetails._id)
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
    }, [userDetails._id]);

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

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }




    // respondive mui grid spacing
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, height: 80 }}>
                    <Box sx={{ width: '100%' }}>
                        <Grid container spacing={1}>
                            <Grid item xs={9} md={10}>
                                <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search" />
                            </Grid>
                            <Grid item xs={3} md={2}>
                                <Button sx={{ height: '100%', p: 0 }} variant="contained" onClick={() => setFilterModal(true)}>
                                    <BsSortDownAlt style={{ fontSize: '20px', margin: '0' }} />
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
            {dataLoading ? (
                <Box sx={{ display: 'flex', height: '70vh', justifyContent: 'center', alignItems: 'center' }}>
                    <Loader type="Puff" color="#c0ae0c" height={30} width={30} />
                </Box>
            ) : (
                <>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: '10px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Typography variant="h5" sx={{ fontSize: { xs: '15px', md: '20px' } }}>All Courses</Typography>
                            <Typography variant="body1" fontWeight={700} sx={{ fontSize: { xs: '15px', md: '20px' } }}>
                                Total Results {courses.length}
                            </Typography>
                        </Box>
                        <Box>
                            {payButtonLoader ? (
                                <>
                                    <Button>
                                        <Loader type="Puff" color="#c0ae0c" height={30} width={30} />
                                    </Button>
                                </>
                            ) : (
                                <>
                                    {planMsg ? (
                                        <Button variant='contained' type="button" onClick={() => paymentGetwayHandler()}>
                                            Pay ${price}
                                        </Button>
                                    ) : null}
                                </>
                            )}
                            <Button sx={{ ml: '2px' }} variant='contained' type="button" onClick={() => setPricingModal(true)}>
                                {' '}
                                {planMsg ? 'Change Plan' : 'Choose Plan'}
                            </Button>
                        </Box>
                    </Box>
                    <Grid container spacing={isSmall ? 1 : 3} sx={{ width: '100%', mx: '0 auto' }}>
                        {courses.map((items, index) => (
                            <>
                                <Grid item xs={6} md={4} xl={3}>
                                    <Card variant="outlined" sx={{ borderRadius: '5px' }}>
                                        <CardContent sx={{ padding: { xs: '2px' } }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <Typography variant="body2" sx={{ boxShadow: 2, borderRadius: '20px', px: '10px', fontSize: { xs: '10px', md: '15px' }, ml: { xs: '5px' } }}>
                                                    New
                                                </Typography>
                                                <Checkbox value={items._id} onChange={(e) => action4SelectCourses(e)} type="checkbox" />
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
                                                <Typography variant='body1' color="primary" sx={{ fontSize: { xs: "15px", md: '20px' } }}>{items.subjectID?.name}</Typography>
                                                <Typography variant='caption' color="primary" sx={{ fontSize: { xs: "13px", md: '20px' } }}>
                                                    <img src="/Assets/Ellipse.png" className="d-inline m-2" alt="courses" />
                                                    {items?.name}
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </>
                        ))}
                    </Grid>
                </>
            )}
        </>
    );
};