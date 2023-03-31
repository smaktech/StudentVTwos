import React, { useState, useEffect } from 'react'
import { Card, Col, FormControl, InputGroup, Modal, Nav, Navbar, Row, Tab, } from 'react-bootstrap'
import { BsSortDownAlt } from "react-icons/bs";
import Loader from 'react-loader-spinner';
import { Link, useHistory } from 'react-router-dom';
import { getCourseById, getUserCourseById } from '../../../api/Courses/Courses';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Button from '@restart/ui/esm/Button'; 
import { useSelector, useDispatch } from 'react-redux'; 
export default function CourseTopic(props) {
    const courseID = props.match.params.id
    // console.log('courseID', courseID)
    const userDetails = useSelector((state) => state.user.userDetails)
    const activeTab = useSelector((state) => state.user.activeTab)
    console.log('activeTab', activeTab)
    const dispatch = useDispatch();
    //sets the visibility of the filter modal 
    const [filterModal, setFilterModal] = useState(false);

    //sets the exam model 
    const [examModel, setExamModel] = useState(false)
    const [examData, setExamData] = useState(false)
    const [videoPlayer, setVideoPlayer] = useState(false)

    //sets the loader of apply changes in filter modal
    const [filterLoader, setFilterLoader] = useState(false);

    // sets for all Topics
    const [topicData, setTopicData] = useState([])

    // sets for Topic items
    const [topicItems, setTopicItems] = useState()

    // sets for Topic items
    const [videoLink, setVideoLink] = useState()

    // console.log("topicItems", topicItems)

    // sets for all Topics of user
    const [userTopicData, setUserTopicData] = useState([])
    const [userSubjectData, setUserSubjectData] = useState([])
    const [userCourseData, setUserCourseData] = useState([])
    const [courseProgress, setCourseProgress] = useState()

    const [courses, setCourse] = useState([])
    const [subject, setSubject] = useState([])

    // sets the no courses found
    const [noTopicData, setNoTopicData] = useState([])

    //table data loading indicator
    const [dataLoading, setDataLoading] = useState(false)

    // set for page
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();

    const history = useHistory();

    let percentage = 66;
 
    useEffect(() => {
        setDataLoading(true)
        getCourseById(courseID).then((res) => {
            console.log('subject', res);
            if (res.status) {
                //setting the fetched Topics into state variable
                setTopicData(res.course.topicIDs);
                setSubject(res.course.subjectID)
                setCourse(res.course)

            }
            else {
                //setting no Topic found variable true 
                setNoTopicData(true);
            }
            setDataLoading(false)
        })
            .catch((err) => {
                console.error(err);
            });

    }, [courseID])


    useEffect(() => {
        setDataLoading(true)
        getUserCourseById(userDetails._id, courseID).then((res) => {
            console.log('user topics', res);
            if (res.status) {
                //setting the fetched Topics into state variable
                setUserTopicData(res.topics);
                setUserSubjectData(res.course[0].courseID.subjectID)
                setUserCourseData(res.course)
                setCourseProgress(res.course[0].progress)
            }
            else {
                //setting no Topic found variable true 
                setNoTopicData(true);
            }
            setDataLoading(false)
        })
            .catch((err) => {
                console.error(err);
            });
    }, [courseID])

    return (
        <>

            {dataLoading ? (
                <div className='w-100 py-2 px-6 me-3' style={{ display: 'flex', height: '70vh', justifyContent: 'center', alignItems: 'center' }}>
                    <Loader
                        type="Puff"
                        color="#c0ae0c"
                        height={30}
                        width={30}
                    />
                </div>
            ) : (
                <>
                    <div className="d-flex justify-content-between clr-primary-400 mt-4" style={{ height: 100, alignSelf: 'center' }}>
                        <div className="row w-75 mt-3 mx-4">
                            <div className="col-lg-1 col-md-1 col-2 " style={{ alignSelf: 'center' }} >
                                <a type='button' onClick={() => history.goBack()} className=' '><i class="fas fa-arrow-left"></i></a>
                            </div>
                            <div className="col-lg-4 col-md-5 col-6" style={{ alignSelf: 'center' }} >
                                <h5 className=' '>{subject ? subject.name : ''}</h5>
                                <h6 className=' '><img src='/Assets/Ellipse.png' /> {courses ? courses.name : ''}</h6>
                            </div>
                        </div>
                        {courseProgress &&
                            <div className='mx-5' style={{ width: 60, height: 60, alignSelf: 'center' }}>
                                <CircularProgressbar value={courseProgress} text={`${courseProgress}%`} styles={buildStyles({ pathColor: `rgba(62, 55, 95, ${courseProgress / 100})`, textColor: '#edebf5' })} />;
                            </div>}
                    </div>
                    <div className='mt-4'>
                        <h6 className="txt-5282F0 mx-4">{courses.description}</h6>
                    </div>
                    <hr style={{ height: 5, color: '#1F1A38' }} />
                    <div className='mt-4 mx-4'>
                        <h5 className="txt-5282F0 fw-bold">All Topics</h5>
                    </div>
                    <div className="row d-flex justify-content-start align-items-center mt-4 mx-2">
                        {topicData.map((items, index) => (
                            <div className="col-lg-3 col-12 m-4">
                                <Card className="shadow " type='button' onClick={() => { setExamModel(true); console.log("examModel") }}>
                                    <Card.Body>
                                        <div className='d-flex justify-content-between'>
                                            <h5 className='text-center rounded-pill txt-5282F0'>{items.name}</h5>
                                            <a className='text-center rounded-pill txt-5282F0'><i class="far fa-arrow-circle-right"></i></a>
                                        </div>
                                        {/* <div class="progress mt-2">
                                            <div class="progress-bar clr-primary-400" role="progressbar" style={{ width: '25%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>

                                        </div> */}
                                        <div className='mt-4'>
                                            <p className="txt-5282F0 ">{(items.description).substring(0, 150) + "......"}</p>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>

                </>
            )}

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
        </>
    )
}
