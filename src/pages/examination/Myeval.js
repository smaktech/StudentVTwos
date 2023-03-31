import { dynamic, InputGroup, FormControl, Table, Form, Row, Col } from 'react-bootstrap'
// import { createCourse, editCourse, getCourseById } from '../../api/Courses/Courses'
// import { createEvaluation } from '../../api/Evaluation/Evaluation'
import { getSingleStudAnswer } from '../../api/StudentEvalAns/studentevalans'
// import { createStudentevalans } from '../../api/StudentEvalAns/studentevalans'
// import { createStudenteval } from '../../api/StudentEval/studenteval'
// import { getAllTopics, getTopicByFilter } from '../../api/Topic/Topic'
// import { getAllBoard } from '../../api/Boards/Boards'
// import { getAllSubjects } from '../../api/Subject/Subject'
import { getAllCourses } from '../../api/Courses/Courses';
import ReactPaginate from "react-paginate";
// import { getAllSubBoard } from 'src/api/SubBoard/SubBoard'
// import { getAllClasses } from '../../api/Classes/Classes';
// import test from './image/geogebra-export.png';
import CircularProgress from '@mui/material/CircularProgress';
import "./app.css"
import Container from '@material-ui/core/Container';
// import Addmoreinput from './dynamic';
// import Dynfield from './dynfield';
// import RemoveIcon from '@material-ui/icons/Remove';
// import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import Iconify from 'src/components/Iconify';

import { grey } from '@mui/material/colors';



// import App from './test'
import CardMedia from '@mui/material/CardMedia';
import SaveIcon from '@mui/icons-material/Save';
// import * as serviceWorker from './serviceWorker';

// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
import { Button, TextField } from '@mui/material'

import { Modal as BootstrapModal } from 'react-bootstrap'
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';


import React, { useState, useEffect, forwardRef, useRef } from 'react'
// import { Modal,  InputGroup, FormControl, Nav, Row, Col, Sonnet } from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/ModalHeader'
import { useSelector } from 'react-redux'
import { Link, useNavigate, Redirect } from 'react-router-dom'
import { updatePassword, changeName, uploadImage } from '../../api/Profile/Profile'
import Loader from "react-loader-spinner";



import { BsSortDownAlt, BsFillTrashFill, BiBlock } from "react-icons/bs";
// import { getUserById, changeStatus, deleteUser } from "../../api/Users/Users"
// import { imageBaseUrl } from '../../config';
// import Tabs from 'react-bootstrap/Tabs'
// import { materialTableIcons } from './config';
// import MaterialTable from 'material-table'
// import { getAllUserCourses } from '../../api/Courses/Courses'
// import { CategoryScale, PointElement, LinearScale, BarElement, Title, Tooltip, Legend, Chart } from 'chart.js';
// import { Bar } from 'react-chartjs-2';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
// import { Button } from '@mui/material';

// import Grid from '@mui/material/Grid';
// import CircularProgress from '@mui/material/CircularProgress';
// import Modal from '@mui/material/Modal';
// import UserCoursesRow  from './UserCoursesRow'
import { useParams } from 'react-router'
import { makeStyles } from '@material-ui/core/styles';
import { baseUrl, dataLimit } from '../../index';
const perpage = 1;

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    button: {
        margin: theme.spacing(1),
    }
}))

// import UserSubscriptionRow from './UserSubscriptionRow'
// import { getEarningsByUserId } from 'src/api/Earnings/Earnings'
// import UserPaymentRow from './UserPaymentRow'

var className = '';
var boardName = '';
var subBoardName = '';
var subjectName = '';

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
                    <Typography>{children}</Typography>
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
export default function User(props) {
    // const courseID = props.match.params.courseId;
    // const courseStatus = props.match.params.courseStatus;
    const { courseID, courseStatus } = useParams()
    // console.log(props)
    // const subjectStatus = props.match.params.subjectStatus;
    const [mode, setMode] = useState(courseID ? "edit" : "add")

    //setting subjects data into a variable
    const [courses, setCourses] = useState({});

    //setting course data into a variable
    const [boardData, setBoardData] = useState([]);

    //setting course data into a variable
    const [classesData, setClassesData] = useState([]);
    const [coursesData, setCoursesData] = useState([]);
    const [single, setSingle] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    //setting course data into a variable
    const [subjectData, setSubjectData] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);
    const [noCourses, setNoCourses] = useState(false);
    //setting course data into a variable
    const topicData = useRef([]);

    const [modalVisible, setModalVisible] = useState(false)
    const navigate = useNavigate()

    //sets and display the line in the success mo
    const [modalLine1, setModalLine1] = useState('');
    const [modalLine2, setModalLine2] = useState('')

    //sets the loader for add course button
    const [addLoader, setAddLoader] = useState(false)

    //sets the loader for edit subject button
    const [editLoader, setEditLoader] = useState(false)

    //sets the loader for edit subject button
    const [editFormLoader, setEditFormLoader] = useState(false)

    //sets the name of the course name user want to add
    const [name, setName] = useState();

    //sets topic description user want to add
    const [description1, setDescription1] = useState()

    //sets board user want to add
    const [board, setBoard] = useState();

    const [board2, setBoard2] = useState();

    //sets classes user want to add
    // const [classes, setClasses] = useState()
    const [classes1, setClasses1] = useState()

    //sets subject user want to add
    // const [subject, setSubject] = useState()
    const [subject2, setSubject2] = useState()

    //sets topic  user want to add
    const [topic, setTopic] = useState([])
    const [chooseTopic, setChooseTopic] = useState([])
    const [newTopic, setNewTopic] = useState(1)
    // console.log(chooseTopic)
    const [subBoardsData, setSubBoardsData] = useState([])
    // console.log(subBoardsData)
    const [selectedSubBoard, setSelectedSubBoard] = useState()
    //sets course picture user want to add

    const [coursePicture, setCoursePicture] = useState()
    const [course, setCourse] = useState([]);
    //sets course picture preview user want to add
    const [picturePreview, setPicturePreview] = useState(null);

    //referance variable for video file choose
    let chooseCoursePictureRef = useRef()
    let chooseTopicRef = useRef()

    // sets varialbe for video status
    const [videoStatus, setVideoStatus] = useState(false)

    //shows the error when users try to add subject without name
    const [errorMessage, setErrorMessage] = useState(false);
    const [error, showError] = useState(false);

    const [page, setPage] = useState(1);

    const [limit, setLimit] = useState(100);
    const [classState, setClassState] = useState('')
    const [boardState, setBoardState] = useState('')
    const [subBoardState, setSubBoardState] = useState('')
    const [subjectState, setSubjectState] = useState('')
    const [courseState, setCourseState] = useState('')
    const [foodState, setFoodState] = useState();
    const [formula, setFormula] = useState();
    const [question, setQuestion] = useState()

    const [media, setMedia] = useState();
    // const courseID ='';
    // const [editFormLoader, setEditFormLoader] = useState(false)
    // const [mode, setMode] = useState(courseID ? "edit" : "add");
    const [hint, setHint] = useState()
    const [type, setType] = useState()
    const [marks, setMarks] = useState()
    const [stuevalid, setStuevalid] = useState()
    const [evalansid, setEvalansid] = useState()
    const [questionid, setquestionid] = useState()
    const [qmark, setQmark] = useState()
    // const [stuevalid, setstuevalid] = useState()
    const [evalid, setevalid] = useState()
    const [studentname, setStudentname] = useState()
    const [examdatetaken, setExamdatetaken] = useState()
    const [subject, setSubject] = useState()
    // const [course, setCourse] = useState()
    const [answerstud, setAnswerstud] = useState()
    const [answer, setAnswer] = useState()
    // const [qmark, setQmarks] = useState()
    const [showhide, setShowhide] = useState('');
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const { id } = useParams();
    // console.log('request params', id)

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }

    const handleshowhide = (event) => {
        const getuser = event.target.value;
        setShowhide(getuser);

    }

    const [courseImage, setCourseImage] = useState(null);
    useEffect(async () => {
        if (board) {
            const response = await getAllSubBoard(board, 1, 1000)
            if (response.status) {
                setSubBoardsData(response.results.data);
            }
        }
    }, [board])

    // useEffect(() => {
    //     setMode(courseID ? "edit" : "add")
    //     setEditFormLoader(true)
    //     getCourseById(courseID).then((res) => {
    //         console.log('res', res);
    //         if (res.status) {
    //             //setting the fetched Course by id into state variable
    //             setCourse(res.course);
    //             setName(res.course.name)
    //             // setDescription(res.course.description)
    //             //setBoard(res?.course?.board?._id)
    //             setSelectedSubBoard(res?.course?.subBoardID?._id)
    //             // setClasses(res.course.classesID._id)
    //             // setSubject(res.course.subjectID._id)
    //             setTopic(res.course.topicIDs)
    //             setCoursePicture(res.course.coursePicture)
    //         }
    //         setEditFormLoader(false)
    //     })
    //         .catch((err) => {
    //             console.error(err);
    //         });

    // }, [courseID])


    // useEffect(() => {
    //     // fetching all boards
    //     getAllBoard(page, limit).then((res) => {
    //         console.log('Boards', res);
    //         if (res.status) {
    //             //setting the fetched board into state variable
    //             setBoardData(res.results.data);
    //         }
    //     })
    //         .catch((err) => {
    //             console.error(err);
    //         });

    //     // fetching all topics
    //     getAllTopics(page, limit).then((res) => {
    //         console.log('Topics', res);
    //         if (res.status) {
    //             //setting the fetched topic into state variable
    //             topicData.current = res.results.data;

    //             chooseTopicHandler()
    //         }
    //     })
    //         .catch((err) => {
    //             console.error(err);
    //         });


    //     // fetching all classes
    //     getAllClasses(page, limit).then((res) => {
    //         console.log('Classes', res);
    //         if (res.status) {
    //             //setting the fetched classes into state variable
    //             setClassesData(res.results.data);
    //         }
    //     })
    //         .catch((err) => {
    //             console.error(err);
    //         });

    //     // fetching all courses 
    // getAllCourses(page, limit).then((res) => {
    //     console.log('course', res);
    //     if (res.status) {
    //         //setting the fetched classes into state variable
    //         setCoursesData(res.results.id);
    //     }
    // })
    //     .catch((err) => {
    //         console.error(err);
    //     });



    //     // fetching all subjects
    //     getAllSubjects(page, limit).then((res) => {
    //         console.log('Subjects', res);
    //         if (res.status) {
    //             //setting the fetched Subject into state variable
    //             setSubjectData(res.results.data);
    //         }
    //     })
    //         .catch((err) => {
    //             console.error(err);
    //         });

    // }, [])


    // const classes = useStyles()
    // const [inputFields, setInputFields] = useState([
    //     { type: '', hint: '', answer: '', marks: '' },
    // ]);





    // //edit the details  of the existing Course
    // function editCourseDetails() {
    //     setModalVisible(false);
    //     setEditLoader(true);
    //     showError(false);
    //     if (courseID != '') {

    //         editCourse(courseID, name, board, selectedSubBoard, classes, subject, description, courseStatus, courseImage)
    //             .then((res) => {
    //                 console.log(res);
    //                 if (res.status) {
    //                     setEditLoader(false);
    //                     setModalLine1('Subject details has been');
    //                     setModalLine2('updated successfully')
    //                     setModalVisible(true)
    //                 }
    //                 else {
    //                     setEditLoader(false);
    //                     showError(true);
    //                     setErrorMessage('Error occured');
    //                 }

    //             })
    //             .catch((err) => {
    //                 console.error(err);
    //                 setEditLoader(false)
    //                 showError(true);
    //                 setErrorMessage('Error occured');
    //             })
    //     }
    //     else {
    //         setAddLoader(false)
    //         showError(true);
    //         setErrorMessage('Please fill all the Course details');
    //     }

    // }
    useEffect(() => {
        // setDataLoading(true);
        // setNoCourses(false);
        //  // fetching All answer and questions
        getSingleStudAnswer(id).then((res) => {

            console.log('EvalansData', res);
            if (res.status) {
                //setting the fetched Topics into state variable
                setSingle(res.results);
                setHint(res.results.hint);
                setQuestion(res.results.question);
                setMarks(res.results.marks);
                setAnswerstud(res.results.answerstud);
                setAnswer(res.results.answer);
                setQmark(res.results.qmark);

                // setTotalPages(res.results.totalPages);

            } else {
                //setting no Topic found variable true
                setNoCourses(true);

            }
            console.log('Review Data portal', res.results);
            setDataLoading(false);
        })
            .catch((err) => {
                console.error(err);
            });
    }, [])
    function handlePageClick({ selected: selectedPage }) {
        console.log("selected page", selectedPage);
        setCurrentPage(selectedPage);
    }
    const offset = currentPage * perpage;
    console.log("offset", offset)

    const currentPageData = single

        .slice(offset, offset + perpage)
        .map((res, row, index) =>
            <div className="stdrvbg" style={{ border: "1px solid rgba(178,150,1, 0.416);" }}>

                <div  >

                    <Row>
                        <div >
                            <Form.Group className="mb-6 " controlId="exampleForm.ControlTextarea1" ></Form.Group>
                            <Form.Label ><h5>Question</h5></Form.Label>


                            <Form.Control type="text" style={{ width: "45%" }} readOnly={true} value={res.question} onChange={(e) => setQuestion(e.target.value)} as="textarea" rows={5}   >
                            </Form.Control>

                            {/* <Form.Group><Form.Control   readOnly={true} type="hidden" value={stuevalid} onChange={(e) => setStuevalid(e.target.value)} as="textarea" rows={5}  > </Form.Control></Form.Group>
                <Form.Group><Form.Control  readOnly={true} type="hidden"value={evalansid} onChange={(e) => setEvalansid(e.target.value)} as="textarea" rows={5}   >  </Form.Control> </Form.Group>
                <Form.Group><Form.Control  readOnly={true} type="hidden" value={questionid} onChange={(e) => setquestionid(e.target.value)} as="textarea" rows={5}   >  </Form.Control></Form.Group>
                <Form.Group><Form.Control  readOnly={true} type="hidden"value={qmark} onChange={(e) => setQmark(e.target.value)} as="textarea" rows={5}  >  </Form.Control></Form.Group> */}
                        </div>
                    </Row>

                    <div className='smdiv'>
                        <div>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label><h5>Marks</h5></Form.Label>

                                <Form.Control style={{ width: "26%" }} readOnly={true} value={res.marks} type="text" placeholder='Marks' onChange={(e) => setMarks(e.target.value)}></Form.Control>
                                {coursesData}
                            </Form.Group>
                        </div>
                        <div className='score' >
                            <Form.Label><h5>Score</h5></Form.Label>
                            <Form.Group controlId="exampleForm.ControlInput1" >

                                {/*<Form.Control readOnly={true} type="text" value={res.qmark} name='text' style={{width:"26%"}}  onChange={(e) => setType(e.target.value)}></Form.Control>*/}

                                <Form.Control readOnly={true} type="text" value='1' style={{ width: "26%" }} onChange={(e) => setType(e.target.value)}></Form.Control>

                            </Form.Group>
                        </div>


                    </div>
                    <div className='stuflex'>


                        <div className='tchsbma' >
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label><h5>Expected Answer</h5></Form.Label>
                                <Form className="custom-select"
                                    value={foodState}
                                    onChange={(e) => {
                                        const selectedFood = e.target.value;
                                        setFoodState(selectedFood);
                                    }}>

                                </Form>
                                <Form.Control type="text" name='answer' readOnly={true} value={res.answerstud} onChange={(e) => setAnswer(e.target.value)} placeholder='Answer' as="textarea" rows={5} ></Form.Control>
                            </Form.Group>

                        </div>
                        <div className='stusbans'>
                            <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                                <Form.Label><h5>Submitted Answer</h5></Form.Label>
                                <Form className="custom-select"
                                    value={foodState}
                                    onChange={(e) => {
                                        const selectedFood = e.target.value;
                                        setFoodState(selectedFood);
                                    }}>

                                </Form>
                                <Form.Control type="text" name='answer' readOnly={true} value={res.answerstud} onChange={(e) => setAnswerstud(e.target.value)} placeholder='Answer' as="textarea" rows={5} ></Form.Control>
                            </Form.Group>

                        </div>

                    </div>



                </div>
            </div>
        )

    console.log("currentPageData", currentPageData)
    const pageCount = Math.ceil(single.length / perpage);
    //adds new Course 
    const addNewEvaluation = async () => {

        alert(" Answer submitted")

        const handleNext = () => {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        };


        // className = '';
        // boardName = '';
        // subBoardName = '';
        // subjectName = '';
        // setModalVisible(false);
        // setAddLoader(true);
        // showError(false);
        // console.log(boardName);
        //  console.log( boardData);
        var boardName = board2;
        className = classes1;
        subjectName = subject2;




        // if (name && board && classes && subject && description && courseImage != '') {
        // createEvaluation(boardName, className, subjectName, description1, name);

        // createAnswer( marks, answer, formula, question, selectedFile);

        var evalid = (id)

        console.log('this is New evalid', evalid)

        var studevalid = await createStudenteval(course, evalid, studentname, examdatetaken, subject, status)

        console.log('evalans', createStudentevalans)
        console.log('WORKING STUDEVALIDVAR', studevalid)

        createStudentevalans(studevalid, answerstud, question, hint, marks, type, stuevalid, id, questionid, qmark)

        //             .then((res) => {
        //                 console.log(res);
        //                 if (res.status) {
        //                     setAddLoader(false);
        //                     setModalLine1('New Course Added');
        //                     setModalLine2('Successfully')
        //                     setModalVisible(true)
        //                 }
        //                 else {
        //                     setAddLoader(false);
        //                     showError(true);
        //                     setErrorMessage('Error occured');
        //                 }
        //             })
        //             .catch((err) => {
        //                 console.log(err);
        //                 setAddLoader(false)
        //                 showError(true);
        //                 setErrorMessage('Error occured');
        //             })
        //     }
        //     else {
        //         setAddLoader(false)
        //         showError(true);
        //         setErrorMessage('Please fill the Course details');
        //     }
        // }

        // // on change Picture handler
        // const onChangePictureHandler = (e) => {
        //     var url = URL.createObjectURL(e.target.files[0]);
        //     console.log(e.target.files[0])
        //     setPicturePreview(url)
        //     setCoursePicture(e.target.files[0])
        // }
    }


    // function to reset 
    const reSetForm = () => {
        setName(null)
        setDescription1(null)
        setBoard(null)
        setClasses(null)
        setSubject(null)
        setTopic(null)
        setSelectedSubBoard(null)
        setCoursePicture(null)
    }

    // function for choose topic
    const actionForChooseTopic = (e, index) => {
        // setTopic(e.target.value)
        let newDAta = e.target.value
        let all = [...topic];
        all[index] = newDAta
        setTopic(all)
        // console.log(all)
    }

    // function to add new topic
    const chooseTopicHandler = () => {

        let all = [...topic];
        all.push("-1")
        setTopic(all)
    }


    //function to delete the selected topic from state array
    function deleteTopic(index) {
        //removing selected topic from state array 
        const updatedTopic = [...topic]
        updatedTopic.splice(index, 1)
        setTopic(updatedTopic);
        // console.log("working")

    }


    //setting the user id of the user coming from the url into a local variable
    // const [userId, setUserId] = useState(props.match.params.id);
    const { userId } = useParams()
    // const tableIcons = materialTableIcons

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    //constant for storing the details of the particular user
    const [userDetailsById, setUserDetailsById] = useState([]);
    const [userProfileImg, setUserProfileImg] = useState('')

    //sets the all courses of user
    const [userCourses, setUserCourses] = useState([])
    // console.log('userCourses', userCourses)

    //loader in the alert table on confirm button
    const [actionLodaer, setActionLoader] = useState(false);

    const [filterModal, setFilterModal] = useState(false);



    //sets the loader of apply changes in filter modal
    const [filterLoader, setFilterLoader] = useState(false);
    const [completedCouresNum, setCompletedCouresNum] = useState(0);

    //variable to configure whether the user of that particular id is available or not
    const [noUserFound, setNoUserFound] = useState(false)
    // example


    //table data loading indicator
    const [tableDataLoading, setTableDataLoading] = useState(false)
    const [tab, setTab] = React.useState(0);
    const [userPayments, setUserPayments] = useState([])
    const [totalPaymentAmount, setTotalPaymentAmount] = useState(0)
    const handleChange = (event, newValue) => {
        setTab(newValue);

    };
    //returns the created date of the record of the table
    function renderDate(date) {
        const newDate = new Date(date);
        const returnDate = months[newDate.getMonth()] + ' ' + newDate.getDate() + ' ' + newDate.getFullYear();
        return returnDate;
    }


    //useEffect will assign the data of user according to the userId from the state on every change into the userId
    // useEffect(() => {

    //     getUserById(userId)
    //         .then((res) => {
    //             // console.log('user Details', res);
    //             // if (res.status) {
    //             setNoUserFound(false);
    //             setUserDetailsById(res.user);
    //             const profilePic = res.user.profileImage ? (imageBaseUrl + res.user.profileImage) : ('');
    //             setUserProfileImg(profilePic)
    //             // }
    //             // else {
    //             //     setNoUserFound(true);
    //             // }
    //         })
    //         .catch((err) => {
    //             // console.log(err);
    //         })


    // }, [userId])

    // useEffect(async () => {

    //     if (userId) {
    //         const response = await getEarningsByUserId(userId)
    //         if (response.status) {
    //             setUserPayments(response.course)
    //             // console.log(response, " payment")
    //             let sum = 0;
    //             response.course.map(item => {
    //                 sum = sum + parseInt(item.amount)
    //             })
    //             setTotalPaymentAmount(sum)
    //         }
    //     }

    // }, [userId])

    // //function to change the status of the user to blocked!
    // function changeUserStatus(status) {
    //     changeStatus(userDetailsById._id, status)
    //         .then((res => {
    //             // console.log('res', res);
    //             if (res.status) {
    //                 getUserById(userId)
    //                     .then((res) => {
    //                         // console.log(res);
    //                         if (res.status) {
    //                             setNoUserFound(false);
    //                             setUserDetailsById(res.user);
    //                             const profilePic = res.user.profileImage ? (imageBaseUrl + res.user.profileImage) : ('');
    //                             setUserProfileImg(profilePic)
    //                         }
    //                         else {
    //                             setNoUserFound(true);
    //                         }
    //                     })
    //                     .catch((err) => {
    //                         // console.log(err);
    //                     })
    //             }
    //             else {
    //                 alert("error occured")
    //             }
    //         }))
    //         .catch((err => {
    //             // console.log('err', err);
    //         }))
    // }

    // function changeCourseStatus(rowData, index, status) {
    //     editCourse(rowData._id, rowData.name, rowData?.boardID?._id, rowData?.subBoardID?._id, rowData?.classesID?._id, rowData?.subjectID?._id, rowData?.description, status)
    //         .then((res => {
    //             // console.log('res',res);
    //             if (res.status) {
    //                 // const index = rowData.tableData.id;
    //                 //updating Course status in state array
    //                 const updatedRows = [...course];
    //                 updatedRows[index].status = status;
    //                 setCourse(updatedRows);

    //             }
    //             else {
    //                 alert("error occured")
    //             }
    //         }))
    //         .catch((err => {
    //             console.log('err', err);
    //         }))
    // }
    // function deleteUserProfile() {
    //     deleteUser(userDetailsById._id)
    //         .then((res) => {
    //             // console.log(res)
    //             if (res.status) {

    //             }
    //         })
    //         .catch((err) => {
    //             // console.error(err)
    //         })
    // }
    // // function addnewqtn() {
    // //     console.log('jacky')
    // //     $("#dynamic").append("<input type='text' value={'jacky'}/>");
    // // }


    // useEffect(() => {
    //     // fetching all user courses
    //     setTableDataLoading(true)
    //     getAllUserCourses(userId).then((res) => {
    //         // console.log('getAllUserCourses', res);
    //         if (res.status) {
    //             //setting the fetched getAllUserCourses into state variable
    //             setUserCourses(res.courses);
    //             setCompletedCouresNum(res.courses.filter(item => item.progress == 100).length)
    //         }
    //         setTableDataLoading(false)
    //     })
    //         .catch((err) => {
    //             // console.error(err);
    //         });
    // }, [userId])

    // // console.log(className)
    // const classSeparator = (e) => {
    //     setClassState(e.target.value)
    //     // const className = e.target.value.split('*')[0]
    //     className = e.target.value.split('*')[1];
    //     console.log('value', className);
    //     setClasses1(className);
    //     // setName(className + ' ' + boardName + ' ' + subjectName)
    // }
    // const courseSeparator = (e) => {
    //     setCourseState(e.target.value)
    //     // const qualification = e.target.value.split('*')[0]
    //     // setCourses(courseName)
    //     courseName = e.target.value.split('*')[1];
    //     setName(className + ' ' + boardName + ' ' + subjectName + ' ' + courseName)
    // }
    // const boardSeparator = (e) => {
    //     setBoardState(e.target.value)
    //     // const board2 = e.target.value.split('*')[0]
    //     boardName = e.target.value.split('*')[1];
    //     console.log('value', boardName);
    //     setBoard2(boardName);

    //     console.log('board value', board2);

    //     // setName(className + ' ' + boardName + ' ' + subjectName)
    // }
    // const subBoardSeparator = (e) => {
    //     setSubBoardState(e.target.value)
    //     const subBoardId = e.target.value.split('*')[0]
    //     setSelectedSubBoard(subBoardId);
    //     subBoardName = e.target.value.split('*')[1];
    //     setName(className + ' ' + boardName + ' ' + subBoardName)
    // }
    // const subjectSeparator = (e) => {
    //     setSubjectState(e.target.value)
    //     // const subjectId = e.target.value.split('*')[0]
    //     subjectName = e.target.value.split('*')[1];
    //     console.log('value', subjectName);
    //     setSubject2(subjectName);

    //     console.log('subject value', subject2);
    //     setName(className + ' ' + boardName + ' ' + subBoardName + ' ' + subjectName)
    // }

    const handleSubmit = (e) => {
        //e.preventDefault();
        alert('Answer Submitted');
        setAnswer('');
    }



    // };

    // const handleChangeInput = (id, event) => {
    //     const newInputFields = inputFields.map(i => {
    //         if (id === i.id) {
    //             i[event.target.name] = event.target.value
    //         }
    //         return i;
    //     })

    //     setInputFields(newInputFields);
    // }

    // const handleAddFields = () => {
    //     setInputFields([...inputFields, { type: '', hint: '', answer: '', marks: '' }])
    // }

    // const handleRemoveFields = id => {
    //     const values = [...inputFields];
    //     values.splice(values.findIndex(value => value.id === id), 1);
    //     setInputFields(values);
    // }



    return (
        <>
            <div className="container" style={{position: 'relative'}}>
                {/* <p className="mt-3 txt-5282F0">Users {'>'} Details</p> */}
                {/* <h5 className="mt-3 txt-5282F0 fw-bold">Evaluation Management</h5> */}


                <hr className="mt-4" />
                <div className="d-flex align-items-center">
                    <div className="container pageHeaderCard">
                        <div className="row">
                            {/* {console.log(userDetailsById)} */}

                            <div className="col-lg-10 col-12">
                                {/* <Tab.Container id="left-tabs-example" defaultActiveKey="courses" style={{ backgroundColor: 'yellow' }}> */}
                                <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example" variant={"scrollable"}
                                    scrollButtons={"on"}>
                                    <Tab label="Your Results Is Here" {...a11yProps(0)} />
                                    {/* <Tab label="Review" {...a11yProps(1)} /> */}

                                    {/* <div className='si'><Button>Save </Button></div> */}
                                    {/* <Tab label="Payment" {...a11yProps(2)} />
                                        <Tab label="Subscription" {...a11yProps(3)} /> */}
                                    {/* <Tab label="Progress" {...a11yProps(4)} /> */}
                                </Tabs>




                                <Col sm={12}>
                                    <TabPanel value={tab} index={0}>




                                        <form  >
                                            {
                                                <div>


                                                    {currentPageData}
                                                    {/* <FormControl type='text' value={currentPageData} /> */}


                                                    {/* <ReactPaginate className='pagination'
                                       previousLabel={"Previous"}
                                       nextLabel={"next"}
                                       pageCount={pageCount}
                                       onPageChange={handlePageClick}
                                       containerClassName={"pagination"}
                                       previousLinkClassName={"pagination_link"}
                                       nextLinkClassName={"paginatiom_link"}
                                       disabledClassName={"pagination_link--disabled"}
                                       activeClassName={"pagination_link--active"}
                                   /> */}
                                                </div>

                                            }

                                        </form>
                                        {/* <div className='btnnxt'> */}
                                        {/* <Button className="btn btn-warning" size='small'  onClick={() => handleSubmit()} variant="contained">Submit</Button> */}
                                        {/* <Button className="btn btn-warning" size='small'  onClick={() =>  addNewEvaluation()} variant="contained">Submit </Button> */}


                                        {/* </div> */}


                                    </TabPanel>
                                </Col>
                            </div>
                            <div className="col-lg-2 col-12">
                                <Col sm={12}>
                                    <TabPanel value={tab} index={1}>
                                        <div>
                                        </div>
                                    </TabPanel>
                                </Col>

                            </div>
                        </div>
                    </div>
                </div>

                <div style={{display: 'flex', justifyContent: 'space-between', width: '80%', position: 'absolute', bottom: '-80px'}}>
                <div className='nextpre'
                // onClick={() => gotoprev()}
                >

                    <Button class="btn btnpre" startIcon={<Iconify icon={'uil:arrow-left'} sx={{ color: grey[500] }} />} ></Button>
                </div>
                <div className='nextbut'
                // onClick={() => gotonext()}
                >
                    <Button class="btn btnnext" startIcon={<Iconify icon={'uil:arrow-right'} sx={{ color: grey[500] }} />}></Button>
                </div>

            </div>

            </div>


            
        </>

    )
}