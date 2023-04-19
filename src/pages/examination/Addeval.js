import { dynamic, InputGroup, FormControl, Table, Form, Row, Col } from 'react-bootstrap'
// import { createCourse, editCourse, getCourseById } from '../../api/Courses/Courses'
// import { createEvaluation } from '../../api/Evaluation/Evaluation'
import TablePagination from '@mui/material/TablePagination';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createAnswer, getSingleAnswer, getAnswerapi,getAnswerapi2 } from '../../api/Answer/Answer'
import { getQuestion } from '../../api/Question/Question'
import { createStudentevalans } from '../../api/StudentEvalAns/studentevalans'
import { createStudenteval } from '../../api/StudentEval/studenteval'
import { getAllEvaluation, getSingleEvaluation, deleteCourse, getEvaluationByFilter, getEvaluationById, getAllUserEvaluations } from '../../api/Evaluation/Evaluation';
import { Box, CardContent, CardMedia, Divider, Fade, Grid, Grow, TableRow, Typography } from '@mui/material';
// import { getAllTopics, getTopicByFilter } from '../../api/Topic/Topic'
// import { getAllBoard } from '../../api/Boards/Boards'
// import { getAllSubjects } from '../../api/Subject/Subject'
import { getAllCourses } from '../../api/Courses/Courses';
// import { getAllSubBoard } from 'src/api/SubBoard/SubBoard'
// import { getAllClasses } from '../../api/Classes/Classes';
import test2 from './image/geogebra-export.png';
//import { Icon } from '@iconify/react';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import "./app.css"
import ReactPaginate from "react-paginate";
import TableContainer from '@mui/material/TableContainer';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import Container from '@material-ui/core/Container';
// import Addmoreinput from './dynamic';
// import Dynfield from './dynfield';
// import RemoveIcon from '@material-ui/icons/Remove';
// import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';






// import App from './test'

import SaveIcon from '@mui/icons-material/Save';
// import * as serviceWorker from './serviceWorker';

// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
import { Button, TextField } from '@mui/material'

import { Modal as BootstrapModal } from 'react-bootstrap'
// import Grid from '@mui/material/Grid';
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
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';


// import CardContent from '@mui/material/CardContent';

// import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
// import { Button } from '@mui/material';

// import Grid from '@mui/material/Grid';
// import CircularProgress from '@mui/material/CircularProgress';
// import Modal from '@mui/material/Modal';
// import UserCoursesRow  from './UserCoursesRow'
import { useParams } from 'react-router'
import { makeStyles } from '@material-ui/core/styles';
import { baseUrl, dataLimit } from '../../index';
import Iconify from 'src/components/Iconify';
import buttonGroup from './buttongroup';
import ButtonGroup from 'src/theme/overrides/ButtonGroup';
import { width } from '@mui/system';
import { grey } from '@mui/material/colors';
import { status } from 'nprogress';


// import test2 from './test';
// import { dataLimit } from '../../config';
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
    const [design1, setDesign1] = useState('outlined')
  const [design2, setDesign2] = useState('outlined')
    // const courseID = props.match.params.courseId;
    // const courseStatus = props.match.params.courseStatus;
    const { courseID, courseStatus } = useParams()
    // console.log(props)
    // const subjectStatus = props.match.params.subjectStatus;
    const [mode, setMode] = useState(courseID ? "edit" : "add")

    //setting subjects data into a variable
    const [course2, setCourse2] = useState('');
    const [subject3, setSubject3] = useState('');

    //setting course data into a variable
    const [boardData, setBoardData] = useState([]);

    //setting course data into a variable
    const [classesData, setClassesData] = useState([]);
    const [coursesData, setCoursesData] = useState([]);
    const [single, setSingle] = useState([]);
    const [answertable, setAnswertable] = useState([]);
    const [allanswer, setAllanswer] = useState([]);
     const [current_type, setCurrent_type] = useState();

    const [rowLimit, setRowLimit] = useState(dataLimit)
    //setting course data into a variable
    const [subjectData, setSubjectData] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);
    const [noCourses, setNoCourses] = useState(false);
    //setting course data into a variable
    const topicData = useRef([]);

    const [modalVisible, setModalVisible] = useState(false)
    const navigate = useNavigate()
    const [multipleanswer, setMultipleanswer] = useState([]);
    const [mcqans, setMCQans] = useState([]);
    const [mcqanstypes, setMCQanstypes] = useState([]);
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
    const [totalPages, setTotalPages] = useState();
    //sets subject user want to add
    // const [subject, setSubject] = useState()
    const [subject2, setSubject2] = useState()
    const [currentPage, setCurrentPage] = useState(0);

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
    const [test, setTest] = useState();

    const [limit, setLimit] = useState(100);
    const [classState, setClassState] = useState('')
    const [boardState, setBoardState] = useState('')
    const [subBoardState, setSubBoardState] = useState('')
    const [subjectState, setSubjectState] = useState('')
    const [courseState, setCourseState] = useState('')
    const [foodState, setFoodState] = useState();
    const [formula, setFormula] = useState();
    const [question, setQuestion] = useState()

    const [media, setMedia] = useState('');
    // const courseID ='';
    // const [editFormLoader, setEditFormLoader] = useState(false)
    // const [mode, setMode] = useState(courseID ? "edit" : "add");
    const [hint, setHint] = useState('')
    const [type, setType] = useState('')
    const [marks, setMarks] = useState('')
    const [stuevalid, setStuevalid] = useState()
    const [evalansid, setEvalansid] = useState()
    const [questionid, setquestionid] = useState()
    const [qmark, setQmark] = useState('')
    // const [stuevalid, setstuevalid] = useState()
    const [evalid, setevalid] = useState()
    const [studentname, setStudentname] = useState()
    const [examdatetaken, setExamdatetaken] = useState()
    // const [subject, setSubject] = useState()
    // const [course, setCourse] = useState()
    const [answerstud, setAnswerstud] = useState()
    const [studevalid, setStudevalid] = useState(0)
    const [questionindex, setQuestionindex] = useState(0)
    const [answer, setAnswer] = useState()
    const [showhide, setShowhide] = useState('');
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const { id } = useParams();


    // var answerindex = 0
    // console.log('request params', id)
    const addgetAnswerapi = async () => {
        await getAnswerapi();
        // alert('api push alert');
    }
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
        if (allanswer.length == 0) {

            getSingleAnswer(id).then((res) => {
                // console.log('coursesData', res);
                if (res.status) {
                    //  //setting the fetched Topics into state variable
                    // setAnswertable(res.results)

                    // setMarks(res.results.marks);
                    // setType(res.results.type);
                    if (allanswer.length == 0)
                    {
                        setAllanswer(res.results);
                        const parsValue = JSON.parse(res.results[questionindex].inputfields);
                        //setAnswer(res.results[questionindex].inputfields.answer);
                        console.log('getSingleAnswer data state', res.results);
                        console.log('JSON parse data state', parsValue);
                       //setMultipleanswer(JSON.parse(res.results[questionindex].mcqFields));
                        setHint(parsValue[0].hint);
                        setType(parsValue[0].type);
                        setMarks(parsValue[0].marks);
                        setAnswer(parsValue[0].answer);
                        //setAnsID(res.results[questionindex]._id)

                    // console.log('JSON parse data state', res.results);
                    // console.log('MCQ JSON parse data state', JSON.parse(res.results[1].mcqFields));
                    console.log('MCQTYPES JSON parse data state', JSON.parse(res.results[questionindex].mcqtypeFields));
                    setMultipleanswer(JSON.parse(res.results[questionindex].inputfields))
                    setMCQans(JSON.parse(res.results[questionindex].mcqFields))
                    setMCQanstypes(JSON.parse(res.results[questionindex].inputfields))
                    console.log('type : ',JSON.parse(res.results[questionindex].inputfields));

                    var init_type = JSON.parse(res.results[questionindex].inputfields);
                    console.log(init_type[0].type);
                    setCurrent_type(init_type[0].type);
                    //setMarks(init_type[0].marks);
                    console.log('Answer data state : ', res.results);
                    }
                    // setTotalPages(res.results.totalPages);

                } else {
                    //  //setting no Topic found variable true
                    setNoCourses(true);
                }

                setDataLoading(false);
            })

                .catch((err) => {
                    // console.error(err);
                });
        }
    });


    
    useEffect(() => {
        // setDataLoading(true);
        // setNoCourses(false);
        //  // fetching All answer and questions
        getQuestion(id, rowLimit).then((res) => {

            // console.log('QuestionData', res);
            if (res.status) {
                //  //setting the fetched Topics into state variable
                if (single.length == 0)
                    setSingle(res.results);
                setQuestion(res.results[questionindex].question);
                setMedia(res.results[questionindex].media);
                // setQuestion(res.results.question);

                console.log('Take Test Answer Data students portal', res.results);
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
    }, [page, rowLimit])

    useEffect(() => {
        // setDataLoading(true);
        // setNoCourses(false);
        //  // fetching All answer and questions
if(course2.length==0){
        getSingleEvaluation(id).then((res) => {

            // console.log('coursesData', res);
            if (res.status) {
                //  //setting the fetched Topics into state variable
                // setSingle(res.results);
                setCourse2(res.results.course);
                setSubject3(res.results.subject);
                // console.log("Trim function", test)
                // setMarks(res.results.marks);
                // 
                if (test.trim().length == 0) {
                    test2()


                }

                // 
                // console.log('student fiest table',studevalid)
                // setTotalPages(res.results.totalPages);

            } else {
                //  //setting no Topic found variable true
                setNoCourses(true);

            }

            console.log('getSingleEvaluation students portal', res.results);
            setDataLoading(false);
        })
            .catch((err) => {
                // console.error(err);
            });
        }
    });

    function handlePageClick({ selected: selectedPage }) {
        console.log("selected page", selectedPage);
        setCurrentPage(selectedPage);
    }

    // const offset = currentPage * perpage;
    // console.log("offset", offset)

    // const currentPageData = single



    // <Form.Label>Question</Form.Label>
    // <div>
    //     <Form.Label> Question </Form.Label>
    // <FormControl key={index} value={row.question} />


    // {/* <div>
    //     <FormControl key={index} value={res.question} />
    //     <div>
    //         <Form.Control type="text" readOnly={true} value={((allanswer.length > 0) ? allanswer[offset].hint : '')} onChange={(e) => setHint(e.target.value)}></Form.Control>
    //     </div>
    // </div>
    // </div> */}



    // console.log("currentPageData", currentPageData)
    // const pageCount = Math.ceil(single.length / perpage);

    useEffect(() => {
        setDataLoading(true);
        setNoCourses(false);
        getAllEvaluation(page, dataLimit).then((res) => {

            // console.log('coursesData', res);

            if (res.status) {
                //  //setting the fetched Topics into state variable
                // setCourse2(res.results.row.course);
                // setSubject3(res.results.row.subject);


            } else {
                //  //setting no Topic found variable true
                setNoCourses(true);

            }
            setDataLoading(false);


        })

            .catch((err) => {
                // console.error(err);
            });
    }, []);
    const addanswermap = async () => {
        var value = 'hint'
        var answermap = Object.keys(answertable).find(key => answertable[key] === value);
        // alert(answertable[0].hint)
        alert(answermap)
    }

    // const test2 = async () => {

    //             setTest(studevalid)
    // }

    const gotonext = async () => {
        
        let newQuestionIndex = questionindex + 1;
        if(newQuestionIndex === single.length)
        return
        setQuestionindex(newQuestionIndex, nextdata(newQuestionIndex));
        // alert(questionindex)
        return true

    }
    const gotoprev = async () => {
        let newQuestionIndex = questionindex - 1;
        if(newQuestionIndex <0)
        return
        setQuestionindex(newQuestionIndex, prevdata(newQuestionIndex));
        // alert(questionindex)
        return true

    }
    // const gotoprevious = async () => {

    //     setPreviewindex(questionindex+1, nextdata());
    //     // alert(questionindex)
    //     return true

    // }
    // function sleep(ms) {
    //     return new Promise (resolve => setTimeout(resolve, ms));
    // }

    const nextdata = async (qIndex) => {
        // // await  sleep(2000) 
        // console.log("&&&&&&&&&&&&&&&&&&&&&", JSON.stringify(single[qIndex]));
        // console.log('next initiated with : ',qIndex);

        // setQuestion(single[qIndex].question);
        // setMedia(single[qIndex].media);
        // setHint(allanswer[qIndex].hint);
        // setMCQans(JSON.parse(allanswer[qIndex].mcqFields))
        // setMCQanstypes(JSON.parse(allanswer[qIndex].inputfields))
        // setType(allanswer[qIndex].type);
        // setMarks(allanswer[qIndex].marks);// alert(questionindex)
        // setAnswer(allanswer[qIndex].answer);// alert(questionindex)
        // var init_type = JSON.parse(allanswer[qIndex].inputfields);
        // console.log(init_type[0].type);
        // setCurrent_type(init_type[0].type);
        // return true

         // await  sleep(2000) 
         console.log("&&&&&&&&&&&&&&&&&&&&&", JSON.stringify(single[qIndex]));
         console.log('next initiated with : ',qIndex);
   const parsValue = JSON.parse(allanswer[qIndex].inputfields);
         setQuestion(single[qIndex].question.trim());
         setMedia(single[qIndex].media);
        
         setMCQans(JSON.parse(allanswer[qIndex].mcqFields));
         setMCQanstypes(JSON.parse(allanswer[qIndex].inputfields));
         setHint(parsValue[0].hint);
         setType(parsValue[0].type);
         setMarks(parsValue[0].marks);
         setAnswer(parsValue[0].answer);
         setAnswerstud('');
         //setAnsID(res.results[questionindex]._id)
         var init_type = JSON.parse(allanswer[qIndex].inputfields);
         console.log(init_type[0].type);
         setCurrent_type(init_type[0].type);
         return true
    }
    const prevdata = async (qIndex) => {
        // // await  sleep(2000) 
        // if (qIndex <= 0) {
        //     setQuestion(single[qIndex].question);
        //     setMedia(single[qIndex].media);
        //     setHint(allanswer[qIndex].hint);
        //     setMCQans(JSON.parse(allanswer[qIndex].mcqFields))
        // setMCQanstypes(JSON.parse(allanswer[qIndex].inputfields))
        //     setType(allanswer[qIndex].type);
        //     setMarks(allanswer[qIndex].marks);// alert(questionindex)
        //     setAnswer(allanswer[qIndex].answer);// alert(questionindex)

        //     return true
        // }

         // await  sleep(2000) 
         if (qIndex >= 0) {
            const parsValue = JSON.parse(allanswer[qIndex].inputfields);
            setQuestion(single[qIndex].question.trim());
            setMedia(single[qIndex].media);
           
            setMCQans(JSON.parse(allanswer[qIndex].mcqFields));
            setMCQanstypes(JSON.parse(allanswer[qIndex].inputfields));
            setHint(parsValue[0].hint);
            setType(parsValue[0].type);
            setMarks(parsValue[0].marks);;
            setAnswer(parsValue[0].answer);
            setAnswerstud('');
            //setAnsID(res.results[questionindex]._id)

            return true
        }
    }
    // const submitval = async () => {
    // if (answerstud.length==0){
    //     alert('Please fill the answer')
    // }
    // else () => {
    //     addNewEvaluation();
    // }
    //adds new Course 
    const addNewEvaluation = async () => {
        //    const nextLabel={"next"};
        // gotonext();

       // setAnswerstud('');
        alert(" Answer submitted")
        // console.log('This is get all evaluation data', setCourse2);
        const handleNext = () => {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        };
        if (studevalid == 0) {
            var studevalid1 = await createStudenteval(course2, subject3, evalid, studentname, examdatetaken)
            setStudevalid(studevalid1)
            // console.log('WORKING STUDEVALIDVAR', studevalid)
            let qmarkval;
            getAnswerapi2(answer,answerstud,type).then((res) => {

             
    
                if (res.message.score == 1) {
                  
                    qmarkval=marks;
              
                createStudentevalans(studevalid1, answerstud, answer, question, hint, marks, type, stuevalid, evalansid, questionid, qmarkval)
                } else {
                
                 qmarkval=0;
                 createStudentevalans(studevalid1, answerstud, answer, question, hint, marks, type, stuevalid, evalansid, questionid, qmarkval)
                }
              
    
    
            });
           // createStudentevalans(studevalid1, answerstud, answer, question, hint, marks, type, stuevalid, evalansid, questionid, qmark)
         
            // console.log('studentevalans', createStudentevalans)
           
        }
        else if (studevalid != 0) {
            getAnswerapi2(answer,answerstud)
            var studevalid115 = createStudentevalans(studevalid, answerstud, answer, question, hint, marks, type, stuevalid, evalansid, questionid, qmark)
            console.log('studentevalans', createStudentevalans)

        }


        //             
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
    const onPageChange = (event, newPage) => {
        // setRowLimit(parseInt(event.target.value), 4);
        setPage(newPage + 1);
        console.log(newPage + 1)
    };
    const onRowPerChange = (event) => {
        setRowLimit(event.target.value)
        console.log(event.target.value)
        setPage(1)
    }
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
        setAnswerstud('');
    }

    const handleSelectedQuestion = (qIndex) => {
        setQuestionindex(qIndex, nextdata(qIndex));
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

    console.log(question, "******************")


    return (
        <>
            <div className="container" >
                {/* <p className="mt-3 txt-5282F0">Users {'>'} Details</p> */}
                {/* <h5 className="mt-3 txt-5282F0 fw-bold">Evaluation Management</h5> */}


                <hr className="mt-4" />
                <div className="d-flex align-items-center">
                    <div className="container pageHeaderCard">
                        <div className="row">
                            <div class="columna">


                             {/* zabiwork*/}
                             <div className="col-lg-8 col-12">
                                {/* <Tab.Container id="left-tabs-example" defaultActiveKey="courses" style={{ backgroundColor: 'yellow' }}> */}
                                <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example" variant={"scrollable"}
                                    scrollButtons={"on"}>
                                    {/* <Tab label="Your Question Is Here" {...a11yProps(0)} /> */}
                                    <Tab label="Your Test Is Here" {...a11yProps(0)} />
                                       
                                    {/* <div className='si'><Button>Save </Button></div> */}
                                    {/* <Tab label="Payment" {...a11yProps(2)} />
                                        <Tab label="Subscription" {...a11yProps(3)} /> */}
                                    {/* <Tab label="Progress" {...a11yProps(4)} /> */}
                                </Tabs>
                            </div>
                            <br></br>
                             
                             <div className="singleques col-lg-12 col-sm-6  col-12">

                                                <div className='stutest' style={{ padding: "30px" }}>
                                                    {/* <Row> */}
                                                        <div className='stdques col-10'>
                                                            <Form.Group className="mt-6 " controlId="exampleForm.ControlTextarea1" ></Form.Group>
                                                           
                                                            <Form.Label  style={{  marginLeft: '-30px',fontFamily: 'Trebuchet MS' }} ><h3>Q) {question}</h3></Form.Label>
                                                            <Form.Control type="hidden" value={question} style={{  width: "110%" }} onChange={(e) => setQuestion(e.target.value)} className="questionid"  ></Form.Control>
                                                            {/* <Form.Control type="text" readOnly={true} value={((allanswer.length>0)?allanswer[index].hint:'')} onChange={(e) => setQuestion(e.target.value)} as="textarea" rows={5}   ></Form.Control> */}
                                                            {/* <Form.Control type="text" readOnly={true} value={row._id} onChange={(e) => setQuestion(e.target.value)} as="textarea" rows={5}   ></Form.Control> */}
                                                            <Form.Control type="hidden" value={id} onChange={(e) => setID(e.target.value)}   ></Form.Control>
                                                            <Form.Control type="hidden" value={questionindex} onChange={(e) => setID(e.target.value)}   ></Form.Control>
                                                        </div>
                                                        <div>
                                                                {mcqanstypes.map((row, index) =>
                                                                    // <div className='mcqtypes' >
                                                                    //     <div class="row" >  
                                                                            <div class="col" >
                                                                            <Form.Label><h5>({row.marks} Marks)</h5></Form.Label>
                                                                            </div>
                                                                //         </div>
                                                                      
                                                                // </div>
                                                                )}
                                                                </div>
                                                        {/* <div className='viewmedia col-6' >
                                                           
                                                            <Card style={{ backgroundColor: "#fff", width: "110%", height: "75%" }} sx={{ border: '1px solid #fff' }} className='imght'>
                                                                {/* <Form.Control type="file" onChange1={(e) => setMedia(e.target.value)} /> */}
                                                                {/* <iframe class="responsive-iframe" img src={test2} width='100%' height="300%" > </iframe> */}
                                                                {/* <img src={`http://localhost:4000/${media}`} width='175%' /> */} 
                                                                {/* </Card> */}


                                                        {/* </div>  */}
                                                    {/* </Row> */}
                                                  {/*<div className="vlview"></div>*/}
                                                    
                                                  </div>

                                                 

                                                
                                                <div className="answerpart" style={{marginTop: '-43px'}}>
                                                                    <Form.Group className="mb-6 mt-3 " controlId="exampleForm.ControlInput1" ></Form.Group>
                                                                  
                                                                </div>
                                                                
                                                                <div style={{border: '1px solid #ced4da', marginLeft: '1px', borderTopLeftRadius: '5px',borderTopRightRadius: '5px'}}>
                                                                {mcqanstypes.map((row, index) =>
                                                                    <div className='mcqtypes' >
                                                                        <div class="row" >
                                                                            <div class="col hintlabel" >
                                                                            <Form.Label><h5>Hint: {row.hint}</h5></Form.Label>
                                                                            </div>                                                                           
                                                                            <div class="col typelabel" >
                                                                            <Form.Label><h5>Type: {row.type}</h5></Form.Label>
                                                                            </div>
                                                                        </div>
                                                                      
                                                                </div>
                                                                )}
                                                                </div>
                                                              
                                                               
                                                <div>

                                                    {current_type=='mcq' && mcqans.map((row, index) =>

                                                        <div className="events" >

                                                            <div className='teststd'>
                                                                
                                                                <div >
                                                                    <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">                                                                       
                                                                        <Form className="custom-select"
                                                                            value={foodState}
                                                                            onChange={(e) => {
                                                                                const selectedFood = e.target.value;
                                                                                setFoodState(selectedFood);
                                                                            }}>

                                                                        </Form>
                                                                        <input className='option' type="radio" id="optiona" name="optiona"  value={row.optiona}></input>&nbsp;&nbsp;
                                                                        <label for="html" >  <h5 >{row.optiona}</h5></label>
                                                                        {/* <Form.Control type="radio" style={{ width: "67%" }} value={row.optiona} onChange={(e) => setAnswerstud(e.target.value)} placeholder='Answers' as="textarea" control={<Radio />} rows={5}  required></Form.Control> */}
                                                                          <input type="hidden" name='Answer' value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder='Answers' as="textarea" rows={5} ></input>
                                                                       
                                                                    </Form.Group>

                                                                </div>
                                                                
                                                               
                                                                <div>
                                                                
                                                                    <input type="hidden" readOnly={true} value={subject3} name='subject'  onChange={(e) => setSubject3(e.target.value)} />
                                                               
                                                                    <input type="hidden" readOnly={true} value={course2} name='course' onChange={(e) => setCourse2(e.target.value)} />
                                                                </div>
                                                                {/* <div>
                                                                <FormControl>
                                                                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                                                    <RadioGroup
                                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                                        defaultValue="female"
                                                                        name="radio-buttons-group"
                                                                    > */}
                                                                        {/* <FormControlLabel value={row.optiona} control={<Radio />} label="Female" /> */}
                                                                        {/* <FormControlLabel value="male" control={<Radio />} label="Male" /> */}
                                                                        {/* <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
                                                                    {/* </RadioGroup>
                                                                </FormControl>
                                                                </div> */}
                                                            </div>


                                                        </div>

                                                    )}


                                             
                                                {(current_type!='mcq')?(
                                                        <div  >
                                                      
                                                        <Form.Control type="text" as="textarea" name='Answer' value={answerstud} onChange={(e) => setAnswerstud(e.target.value)} placeholder='Answers'  rows={5} ></Form.Control>
                                                        </div>
                                                                ):''}
                                                                   
                                                </div>
                                               


                                            </div>

                                            {/* <div class='savebtn'>
                                             <div >
                                               <button class="btn btnsave"  onClick={() => addNewEvaluation()} size='small' variant="contained">Done</button>
                                            </div>
                                           </div> */}


                             {/* zabiwork*/}
                           

                            {/* {console.log(userDetailsById)} */}

                            

                            <Col sm={12}>
                                <TabPanel value={tab} index={0}>
                                    <Table>
                                        {/* <TableHead>
                                            <TableCell>S.No.</TableCell>
                                            <TableCell >Course</TableCell>
                                            <TableCell >No of Question</TableCell>
                                            <TableCell >Students taken</TableCell>
                                            <TableCell >Status</TableCell>
                                            <TableCell >Action</TableCell>
                                        </TableHead> */}
                                        <TableBody>
                                            
                                            {single.map((row, index) =>
                                                <div>
                                                    <div key={row.question}>
                                                        {/* zabi change
                                                        <div>
                                                            <input type="hidden" readOnly={true} value={subject3}  onChange={(e) => setSubject3(e.target.value)} />
                                                            <input type="hidden" readOnly={true} value={course2}  onChange={(e) => setCourse2(e.target.value)} />
                                                        </div>  */}
                                                        <div className="singleques col-lg-12 col-sm-6 col-12">
                                                            <Row>  <Form.Group className="mb-6 " controlId="exampleForm.ControlTextarea1" ></Form.Group>
                                                                {/* <Form.Label>Question</Form.Label> */}

                                                                {/* <Form.Control type={"text"} readOnly={true} value={row.question} onChange={(e) => setQuestion(e.target.value)} as="textarea" rows={5}   ></Form.Control> */}
                                                                {/* <Form.Control type="hidden" value={id} onChange={(e) => setID(e.target.value)}   ></Form.Control> */}
                                                            </Row>
                                                            <Row>
                                                                {/* <div className='singleIV ' >
                                                                    <h1 class="ig">Media</h1>
                                                                    <Card style={{ backgroundColor: "gray" }} sx={{ border: '1px solid yellow' }} className='imght'>
                                                                        <Form.Control type="file" onChange1={(e) => setMedia(e.target.value)} />
                                                                        {selectedFile && <img src={preview} width='80%' />}</Card>

                                                                </div> */}

                                                            </Row>


                                                        </div>
                                                    </div>

                                                    {/* { allanswer.map((rows, index) => */}

                                                    <div  >
                                                        <div className="events">
                                                            <div className="answerpart">
                                                                <Form.Group className="mb-6 mt-3 " controlId="exampleForm.ControlInput1" ></Form.Group>
                                                                {/* <Form.Label>Answer in Part</Form.Label> */}
                                                            </div>
                                                            <div className='singlehint col-lg-2 col-sm-6 col-12 mt-3'>
                                                                {/* <Form.Label>Hint</Form.Label> */}
                                                                {/* <Form.Control readOnly={true} type="text" value={((allanswer.length > 0) ? allanswer[index].hint : '')} name="hint" onChange={(e) => setHint(e.target.value)}  ></Form.Control> */}


                                                            </div>
                                                            <div className=" singletype  col-lg-2 col-sm-6 col-12  ">
                                                                {/* <Form.Label>Type</Form.Label> */}
                                                                <Form.Group controlId="exampleForm.ControlInput1" >

                                                                    {/* <Form.Control readOnly={true} type="text" name='type'  onChange={(e) => setType(e.target.value)}></Form.Control> */}



                                                                    {/* <Form.Control type="text" name='optionA' value={((allanswer.length > 0) ? allanswer[index].type : '')}
                                                                        onChange={event => handleChangeInput(inputField.id, event)} ></Form.Control> */}
                                                                </Form.Group>
                                                            </div>
                                                            <div className="singlemarks  col-lg-2 col-sm-6 col-12 ">
                                                                <Form.Group controlId="exampleForm.ControlInput1">
                                                                    {/* <Form.Label>Marks</Form.Label> */}
                                                                    {/* <Form.Select  aria-label="Default select example"> */}

                                                                    {/* </Form.Select> */}
                                                                    {/* <Form.Control type="text" name='marks' value={inputField.answer}
                                                                  onChange={event => handleChangeInput(inputField.id, event)} ></Form.Control> */}
                                                                    {/* <Form.Control readOnly={true} type="text" name='Answer' value={((allanswer.length > 0) ? allanswer[index].marks : '')} placeholder='Marks' onChange={(e) => setMarks(e.target.value)}></Form.Control> */}
                                                                </Form.Group>
                                                            </div>



                                                            <div className="singleansrev col-lg-6 col-sm-6 col-12">
                                                                <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                                                                    {/* <Form.Label>Answer</Form.Label> */}
                                                                    <Form className="custom-select"
                                                                        value={foodState}
                                                                        onChange={(e) => {
                                                                            const selectedFood = e.target.value;
                                                                            setFoodState(selectedFood);
                                                                        }}>

                                                                    </Form>
                                                                    {/* <Form.Control type="text" name='Answer' onChange={(e) => setAnswer(e.target.value)} placeholder='Answer' as="textarea" rows={5} ></Form.Control> */}
                                                                </Form.Group>

                                                            </div>


                                                        </div>
                                                    </div>


                                                    {/* )} */}
                                                </div>

                                            )}



                                        </TableBody>

                                        <div className='testbtn'>

                                            <h1>
                                                {/* {currentPageData} */}
                                                {/* <FormControl type='text' value={currentPageData} /> */}





                                            </h1>
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


                                    </Table>
                                </TabPanel>
                            </Col>
                           


                            {/* <div className='testbtn'>
                                <div className='nextpre'>
                                    
                                    <Button class="btn btnpre"    startIcon={<Iconify icon={'uil:arrow-left'}  style={{fontSize: '3em'}} />}   onClick={() => gotoprev()} variant="contained"></Button>
                                </div>
                                <div className='nextbut' onClick={() => gotonext()}>
                                    <Button class="btn btnnext"  startIcon={<Iconify icon={'uil:arrow-right'}  style={{fontSize: '3em'}} />} variant="contained"></Button>
                                </div>
                                          {/* <div className='test'>
                                    <Button variant="contained" color="success" size='small' onClick={() => addgetAnswerapi()} >Test</Button>
                                </div>                                 
                            </div> */}
                            </div>
                            <div class="columnb">

                            <div className="col-lg-8 col-12"  style={{ width: '100%', marginTop: '10px' }}>
                                {/* <Tab.Container id="left-tabs-example" defaultActiveKey="courses" style={{ backgroundColor: 'yellow' }}> */}
                                <label style={{ fontSize: '14px', padding: '2px' }}  > {<Iconify icon={'bi:list'}  />} Question Navigator</label>
                                
                            </div>
                            <br></br>
                           
                            <div class="row col" style={{ marginTop: '-10px' }}>
                                <div class="col-6" >
                                <Button class="btn btnGold"   variant="contained"></Button>
                                <label style={{ fontSize: '14px', padding: '2px' }}>Answered</label>
                                </div>
                                <div class="col-6" >
                                <Button class="btn btnGrey"   variant="contained" ></Button>
                                <label style={{ fontSize: '11px', marginLeft: '4px' }}>UnAnswered</label>
                                </div>
                            </div>
                            <br></br>
                            <div class="row col">
                                <div style={{  padding:'10px', marginLeft: '10px' }}>
                                    {
                                        single && single.map((ques, index) => {
                                            return <Button key={index} class="btn btnGrey1"   variant="contained" onClick={()=>handleSelectedQuestion(index)}>{index+1}</Button> 
                                        })
                                        
                                    }

                                                                    
                                {/* <Button class="btn btnpink1"   variant="contained">2</Button> 
                                <Button class="btn btnpink1"   variant="contained">3</Button>     
                                <Button class="btn btnpink1"   variant="contained">4</Button>     
                                <Button class="btn btnpink1"   variant="contained">5</Button>                                                    */}
                                </div>
                                {/* <br></br> */}
                                {/* <div style={{  padding:'10px', marginLeft: '10px' }}>
                                <Button class="btn btnpink1"   variant="contained">6</Button>     
                                <Button class="btn btnpink1"   variant="contained">7</Button> 
                                <Button class="btn btnpink1"   variant="contained">8</Button>     
                                <Button class="btn btnpink1"   variant="contained">9</Button>     
                                <Button class="btn btnpink1"   variant="contained">10</Button>                                                   
                                </div>
                                <br></br>
                                <div style={{  padding:'10px', marginLeft: '10px' }}>
                                <Button class="btn btnpink1"   variant="contained">11</Button>     
                                <Button class="btn btnpink1"   variant="contained">12</Button> 
                                <Button class="btn btnpink1"   variant="contained">13</Button>     
                                <Button class="btn btnpink1"   variant="contained">14</Button>     
                                <Button class="btn btnpink1"   variant="contained" >15</Button>                                                   
                                </div>
                                <br></br>
                                <div style={{  padding:'10px', marginLeft: '10px' }}>
                                <Button class="btn btnpink1"   variant="contained">16</Button>     
                                <Button class="btn btnpink1"   variant="contained">17</Button> 
                                <Button class="btn btnpink1"   variant="contained">18</Button>     
                                <Button class="btn btnpink1"   variant="contained">19</Button>     
                                <Button class="btn btnpink1"   variant="contained" >20</Button>                                                   
                                </div> */}
                                
                            </div>  
                            <div className='testbtn'>
                                <div className='nextpre' onClick={() => gotoprev()}>
                                    
                                    <Button class="btn btnpre" startIcon={<Iconify icon={'uil:arrow-left'}  sx={{color: grey[500]}}/>} ></Button>
                                </div>
                                <div className='nextbut' onClick={() => gotonext()}>
                                    <Button class="btn btnnext"  startIcon={<Iconify icon={'uil:arrow-right'}  sx={{color: grey[500]}}/>}></Button>
                                </div>
                                          {/* <div className='test'>
                                    <Button variant="contained" color="success" size='small' onClick={() => addgetAnswerapi()} >Test</Button>
                                </div>                                 */}
                            </div>                          
                            <div className='submitBtn'>
                                   
                                    <Button
                                variant={design1}
                                onMouseEnter={() => setDesign1('contained')}
                                onMouseLeave={() => setDesign1('outlined')}
                                style={{  width: '200px' }}
                                // sx={{pt:1,pb:1}}
                                // component={RouterLink}
                                // to={"/dashboard/courses/allcourses"}
                                onClick={() => addNewEvaluation()}
                                className="subscribeToPremiumBtn"
                              >
                               Submit
                              </Button>
                                </div>
                             <div className='finish'>
                                    {/* <Button class="btn btn-success" style={{  width: '200px', fontSize: '1.5em' }} variant="contained" color="success" size='small' onClick={() => { navigate("/dashboard/review") }} >Finish</Button> */}
                                    <Button
                                variant={design2}
                                onMouseEnter={() => setDesign2('contained')}
                                onMouseLeave={() => setDesign2('outlined')}
                                style={{  width: '200px' }}
                                // sx={{pt:1,pb:1}}
                                // component={RouterLink}
                                // to={"/dashboard/courses/allcourses"}
                                onClick={() => { navigate("/dashboard/review") }}
                                className="subscribeToPremiumBtn"
                              >
                               Finish
                              </Button>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>



            </div>

            {/* <Grid item xs={12} lg={12} md={12} sm={12} className="px-3 mt-3 w-100 d-flex justify-content-end">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <TablePagination

                        rowsPerPageOptions={[1, 2, 5, 10, 25]}
                        colSpan={3}
                        count={totalPages * rowLimit}
                        rowsPerPage={rowLimit}
                        page={page - 1}
                        SelectProps={{
                            inputProps: {
                                'aria-label': 'rows per page',
                            },
                            native: true,
                        }}
                        onPageChange={onPageChange}
                        onRowsPerPageChange={onRowPerChange}
                    // ActionsComponent={TablePaginationActions}
                    />
                </div>
            </Grid> */}


        </>

    )
}











