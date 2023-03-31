import React, { useEffect, useState } from 'react'
import { Button, Card, Col, FormControl, InputGroup, Modal, Nav, Navbar, Row, Tab } from 'react-bootstrap'
import { BsSortDownAlt } from "react-icons/bs";
import Loader from 'react-loader-spinner';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { SET_ACTIVE_TAB } from '../../../Reducers/types';
import { getAllBoard, getAllCourses, getAllSubjects, getAllUserCourses, getCoursesByFilter } from '../../../api/Courses/Courses';
import StripeCheckout from 'react-stripe-checkout';
import { paymentGetway } from '../../../api/Subscription/subscription';
import { useHistory } from 'react-router-dom';
import { dataLimit } from '../../..';
import { AnnualPlanperSubject, AnnualPlanwithUnlimitedAccess, MonthlyPlanperSubject, } from '../../../config';

export default function PurchaseCourse() {

    //sets the visibility of the filter modal 
    const [filterModal, setFilterModal] = useState(false);

    // const AnnualPlanperSubject= AnnualPlanperSubject;
    // const MonthlyPlanperSubject= MonthlyPlanperSubject;
    // const AnnualPlanwithUnlimitedAccess= AnnualPlanwithUnlimitedAccess;

    //sets the subscription paln  
    const [activeBtn, setActiveBtn] = useState(false)
    const [subscription, setSubscription] = useState(false);


    //sets the visibility of the Price modal 
    const [pricingModal, setPricingModal] = useState(false);

    const userDetails = useSelector((state) => state.user.userDetails)
    const activeTab = useSelector((state) => state.user.activeTab)
    const dispatch = useDispatch();

    const history = useHistory();
    // sets the no courses found
    const [noCourses, setNoCourses] = useState(false);

    //sets the all selected courses for purchase
    const [selectedCourses, setSelectedCourses] = useState([])
    const [isSelected, setIsSelected] = useState()
    console.log('selectedCourses', selectedCourses)

    // sets for the courses data
    const [courses, setCourse] = useState([])

    // sets for all subjects
    const [subjectData, setSubjectData] = useState([])
    const [subjectID, setSubjectID] = useState()
    // console.log(subjectName)

    //setting board data into a variable
    const [boardData, setBoardData] = useState([]);
    const [boardID, setBoardID] = useState()

    const [planMsg, setPlanMsg] = useState('')

    // sets for search
    const [search, setSearch] = useState('')

    //table data loading indicator
    const [dataLoading, setDataLoading] = useState(false)

    //sets the loader of apply changes in filter modal
    const [filterLoader, setFilterLoader] = useState(false);

    const [payButtonLoader, setPayButtonLoader] = useState(false)

    // set for page
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    let price = selectedCourses.length * (subscription == '1' ? 40 : subscription == '2' ? 60 : 120)
    // fetching Courses by filter
    useEffect(() => {
        if (filterLoader || search != null) {
            // if(search!=null || search.length > 0) {
            //setting the loader for table
            setDataLoading(true);
            //calling filter functions with required parameters
            // console.log(filterDateFrom)
            getCoursesByFilter(search, boardID, subjectID)
                .then((res) => {
                    console.log("filterData", res)
                    if (res.status) {
                        setCourse(res.results.data);
                        setTotalPages(res.results.totalPages)
                    }
                    else {
                        setCourse([])
                    }
                    setFilterLoader(false)
                    setDataLoading(false);
                    setFilterModal(false);
                })
                .catch((err) => {
                    console.log(err);
                    setFilterLoader(false)
                })
            // }
        }
    }, [search, filterLoader])



    //function to confirm the filter changes
    function applyFilters() {
        setFilterLoader(true)

    }

    const resetFilterData = () => {
        setBoardID('')
        setSubjectID('')
        setFilterLoader(true)
    }


    useEffect(() => {
        setDataLoading(true)
        setNoCourses(false)
        // fetching All courses
        getAllCourses(page, dataLimit).then((res) => {
            console.log('coursesData', res);
            if (res.status) {
                //setting the fetched Topics into state variable
                setCourse(res.results.data);
                setTotalPages(res.results.totalPages)
            }
            else {
                //setting no Topic found variable true 
                setNoCourses(true);
            }
            setDataLoading(false)
        })
            .catch((err) => {
                console.error(err);
            });

        // fetching all subjects
        getAllSubjects(page, dataLimit).then((res) => {
            // console.log('Subjects', res);
            if (res.status) {
                //setting the fetched Subject into state variable
                setSubjectData(res.results.data);
            }
        })
            .catch((err) => {
                console.error(err);
            });

        // fetching all boards
        getAllBoard(page, dataLimit).then((res) => {
            // console.log('Boards', res);
            if (res.status) {
                //setting the fetched board into state variable
                setBoardData(res.results.data);
            }
        })
            .catch((err) => {
                console.error(err);
            });

    }, [page, dataLimit])


    // priceID, quantity, courses, userID

    // function to handle checkOut 
    const paymentGetwayHandler = () => {
        setPayButtonLoader(true)
        paymentGetway(subscription == '1' ? AnnualPlanperSubject : subscription == '2' ? MonthlyPlanperSubject : AnnualPlanwithUnlimitedAccess, selectedCourses.length, selectedCourses, userDetails._id).then((res) => {
            console.log('session URL', res);
            if (res.status) {
                // window.open(res.url, "_blank");
                window.location.assign(res.url);
            }
            setPayButtonLoader(false)
        })
            .catch((err) => {
                console.error(err);
            });
    }


    //function to select course
    const action4SelectCourses = (e) => {
        let newCourseId = e.target.value
        const arr = [...selectedCourses]
        if (!arr.includes(newCourseId)) {
            // setIsSelected(arr.includes(newCourseId))
            arr.push(newCourseId)
            setSelectedCourses(arr)
        }
    }



    return (
        <>

            <div className="d-flex justify-content-center clr-primary-400 mt-4" style={{ height: 80 }}>
                <div className="row w-75 mt-4">
                    <div className="col-lg-9 col-md-9 col-10">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="col-lg-3 col-md-3 col-1">
                        <button className="btn btn-light" onClick={() => setFilterModal(true)}><BsSortDownAlt /></button>
                    </div>
                </div>
            </div>
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
                    <div className='d-flex justify-content-between mt-3 mx-4'>
                        <div className=''>
                            <h5 className="txt-5282F0 fw-bold">All Courses</h5>
                            <h6 className="txt-5282F0 fw-bold">Total Results {courses.length}</h6>
                        </div>
                        <h3>{planMsg}</h3>
                        <div className=''>
                            {payButtonLoader ? (
                                <>
                                    <button className="  px-5" >
                                        <Loader
                                            type="Puff"
                                            color="#c0ae0c"
                                            height={30}
                                            width={30}
                                        />
                                    </button>
                                </>
                            ) : (
                                <>
                                    {planMsg ? (
                                        <button type='button' className='  mx-5 p-3' onClick={() => paymentGetwayHandler()}>Pay ${price}</button>
                                    ) : (null)}
                                </>
                            )}
                            <button type='button' className='  mx-3 p-3' onClick={() => setPricingModal(true)}>{planMsg ? "Change Plan" : "Choose Plan"}</button>
                        </div>
                    </div>
                    <div className="row mt-3">
                        {courses.map((items, index) => (
                            <>
                                <div className="col-12 col-lg-3 col-md-4 mb-4 d-flex justify-content-center">
                                    <Card className="shadow w-75 m-4" type='button' >
                                        {/* <Link to={'/purchaseCourse/' + items._id}> */}
                                            <Card.Body>
                                                <div className='d-flex justify-content-between'>
                                                    <p className='card text-center rounded-pill txt-5282F0 p-1'>New</p>
                                                    {/* <img type='button' src='/Assets/coursesLogo.png' /> */}
                                                    <input className='form-check-input p-3' value={items._id} type='checkbox' onChange={(e) => action4SelectCourses(e)} />
                                                </div>
                                                <div className='mb-2 d-flex justify-content-center'>
                                                    <Card.Img src='/Assets/userProfile.png' className='w-50 h-50 shadow rounded-circle ' />
                                                </div>
                                                <div className='d-flex justify-content-center'>
                                                    <Card.Title className=''>{items.subjectID.name}</Card.Title>
                                                </div>
                                                <div className='d-flex justify-content-center'>
                                                    <Card.Title className=''><img src='/Assets/Ellipse.png' className='m-2' /> {items.name}</Card.Title>
                                                </div>
                                            </Card.Body>
                                        {/* </Link> */}
                                    </Card>
                                </div>
                            </>
                        ))}
                    </div>
                </>
            )
            }

            {/* Modal for applying filter */}
            {/* Modal for applying filter */}
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
                    {/* <div className="row labelColor mt-3">
                        <label>Board</label>
                        <div className='d-flex justify-content-start mt-2'>
                            <div className='row'>
                                <div className='col-3 btn justify-content-center d-flex  rounded-circle shadow-lg clr-primary-200   mx-2 mb-3'>
                                    <button className=' btn    mx-2'>All</button>
                                </div>
                                <div className='col-3 btn justify-content-center d-flex  rounded-circle shadow-lg mx-2 mb-3'>
                                    <button className=' btn txt-5282F0 mx-2'>Level  A</button>
                                </div>
                                <div className='col-3 btn justify-content-center d-flex  rounded-circle shadow-lg mx-2 mb-3'>
                                    <button className=' btn txt-5282F0 mx-2'>Level B</button>
                                </div>
                                <div className='col-3 btn justify-content-center d-flex  rounded-circle shadow-lg mx-2 mb-3'>
                                    <button className=' btn txt-5282F0 mx-2'>Level C</button>
                                </div>
                                <div className='col-3 btn justify-content-center d-flex  rounded-circle shadow-lg mx-2 mb-3'>
                                    <button className=' btn txt-5282F0 mx-2'>Level D</button>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className="row labelColor">
                        <label>Courses</label>
                        <div className='d-flex justify-content-start mt-2'>
                            <div className='row'>
                                <div className={activeBtn ? 'col-3 justify-content-center d-flex rounded shadow-lg mx-2 mb-3' : 'col-3 justify-content-center d-flex rounded shadow-lg clr-primary-200   mx-2 mb-3'}>
                                    <button className={activeBtn ? 'btn txt-5282F0' : ' btn   '}>All</button>
                                </div>
                                {boardData.map((items, index) => (
                                    <div className={activeBtn ? 'col-3 justify-content-center d-flex rounded shadow-lg clr-primary-200   mx-2 mb-3' : 'col-3 justify-content-center d-flex rounded shadow-lg mx-2 mb-3'}>
                                        <button className={activeBtn ? ' btn   ' : 'btn txt-5282F0'} id={index} onClick={() => setBoardID(items._id)}>{items.name}</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="row labelColor">
                        <label>Subject</label>
                        <div className='d-flex justify-content-start align-items-center mt-2'>
                            <div className='row'>
                                <div className={activeBtn ? 'col-3 justify-content-center d-flex rounded shadow-lg mx-2 mb-3' : 'col-3 justify-content-center d-flex rounded shadow-lg clr-primary-200   mx-2 mb-3'}>
                                    <button className={activeBtn ? 'btn txt-5282F0' : ' btn   '}>All</button>
                                </div>
                                {subjectData.map((items, index) => (
                                    <div className={activeBtn ? 'col-3 justify-content-center d-flex rounded shadow-lg clr-primary-200   mx-2 mb-3' : 'col-3 justify-content-center d-flex rounded shadow-lg mx-2 mb-3'}>
                                        <button className={activeBtn ? ' btn   ' : 'btn txt-5282F0'} id={index} onClick={() => { setSubjectID(items._id); setActiveBtn(true) }}>{items.name}</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-4 pb-3">
                        <button className="btn btn-outline-secondary px-5"
                            onClick={() => { resetFilterData(); setFilterModal(false) }}
                        >Reset </button>
                        &emsp;
                        {filterLoader ? (
                            <button className="  px-5" >
                                <Loader
                                    type="Puff"
                                    color="#c0ae0c"
                                    height={30}
                                    width={30}
                                />
                            </button>
                        ) : (
                            <button className="  px-5"
                                onClick={() => { applyFilters() }}
                            >Confirm</button>
                        )}

                    </div>
                </Modal.Body>
            </Modal>



            {/* pricing model */}

            <Modal
                show={pricingModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => setPricingModal(false)}
            >
                <Modal.Header className="clr-primary-400 py-2" closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className="text-center">
                        <h4 className="text-center   mb-0">
                            Pricing
                        </h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='card'>
                    <div className="row d-flex justify-content-around  m-5">
                        <div className="col-12 col-lg-4 col-md-12 mb-4 ">
                            <Card className="shadow-lg " type='button' >
                                <Card.Body>
                                    <div className=' text-center mb-4'>
                                        <h3 className=''>Annual Plan per Subject</h3>
                                    </div>
                                    <div className='text-center mb-2'>
                                        <h3 className=''>$40 <small>/year</small></h3>
                                    </div>
                                    <div className='text-center mb-4'>
                                        <h3 className=''>$3 <small>/month</small></h3>
                                    </div>
                                    <div className='text-center '>
                                        <button className='  px-5' onClick={() => { setSubscription('1'); setPricingModal(false); setPlanMsg('Annual Plan per Subject') }}>Select Plan</button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-12 col-lg-4 col-md-12 mb-4 ">
                            <Card className="shadow " type='button' >
                                <Card.Body>
                                    <div className=' text-center mb-4'>
                                        <h3 className=''>Monthly Plan per Subject</h3>
                                    </div>
                                    <div className='text-center mb-2'>
                                        <h3 className=''>$60 <small>/year</small></h3>
                                    </div>
                                    <div className='text-center mb-4'>
                                        <h3 className=''>$5 <small>/month</small></h3>
                                    </div>
                                    <div className='text-center '>
                                        <button className='  px-5' onClick={() => { setSubscription('2'); setPricingModal(false); setPlanMsg('Monthly Plan per Subject') }}>Select Plan</button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-12 col-lg-4 col-md-12 mb-4 ">
                            <Card className="shadow " type='button' >
                                <Card.Body>
                                    <div className=' text-center mb-4'>
                                        <h3 className=''>Annual Plan with Unlimited Access</h3>
                                    </div>
                                    <div className='text-center mb-2'>
                                        <h3 className=''>$120 <small>/year</small></h3>
                                    </div>
                                    <div className='text-center mb-4'>
                                        <h3 className=''>$10 <small>/month</small></h3>
                                    </div>
                                    <div className='text-center '>
                                        <button className='  px-5' onClick={() => { setSubscription('3'); setPricingModal(false); setPlanMsg('Annual Plan with Unlimited Access') }}>Select Plan</button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
