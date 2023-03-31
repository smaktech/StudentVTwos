import React, { useEffect, useRef, useState } from 'react'
import { Col, Modal, Nav, Navbar, Row,Tab, TabPane } from 'react-bootstrap'
import Loader from 'react-loader-spinner'; 
import { useSelector, useDispatch } from 'react-redux'; 
// // import { useHistory } from 'react-router';
import { LoadingButton } from '@mui/lab';
import { Avatar, Box,Button,Card,CardActions,CardContent,CardMedia,Divider,Tab as MuiTab, Tabs, Typography,Paper, Table, TableHead, TableRow, TableCell, TableContainer, TableBody } from '@mui/material';
import { setUserInfo } from '../../redux/slices/user';
import { imageBaseUrl } from '../..';
import { fetchCMS } from '../../api/CMS/CMS';
import { editName, fetchUser, updateImage } from '../../api/User/User';
import { dispatch } from '../../redux/store';
import PersonalInformation from './PersonalInformation';
import TermsConditions from './TermsConditions';
import PrivacyPolicy from './PrivacyPolicy';


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

  


export default function Profile() {

    // //sets the visibility of the edit modal 
    const [editModal, setEditModal] = useState(false);

    // //sets the visibility of the edit modal 
    const [editImageModal, setEditImageModal] = useState(false);

    // // sets the user data
    const [userData, setData] = useState([])

    // //table data loading indicator
    const [dataLoading, setDataLoading] = useState(false)

    // //setting cms data into a variable
    const [cms, setCms] = useState([]);

    const [name, setName] = useState('')

    // //sets the loader of apply changes in edit modal
    const [editLoader, setEditLoader] = useState(false);

    // //sets the loader of apply changes in edit modal
    const [editImageLoader, setEditImageLoader] = useState(false);

    const [modalVisible, setModalVisible] = useState(false)
    // // const history = useHistory()

    // //sets and display the line in the success modal!
    const [modalLine1, setModalLine1] = useState('');
    const [modalLine2, setModalLine2] = useState('')

    // //shows the error when users try to add without name
    const [errorMessage, setErrorMessage] = useState(false);
    const [error, showError] = useState(false);

    // //sets the loader for add subject button
    const [addLoader, setAddLoader] = useState(false)

    const [imageFile, setImageFile] = useState(null);
    // //sets image file user want to add
    const [filePreview, setFilePreview] = useState(null);

    // tab values for changing tabs
    const [tabValue, setTabValue] = useState(0);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
      };
    

    // //referance variable for image file choose
    let chooseFileRef = useRef()

    const userDetails = useSelector((state) => state.user.info)
    const reduxDispatch =  useDispatch();
    // // console.log(userDetails)

    useEffect(() => {
        setDataLoading(true)
        
        fetchUser(userDetails._id).then((res) => {
            console.log('res', res);
            // //setting the fetched user data into state variable
            setData(res.user);
            setName(res.user.name)
            reduxDispatch({ type: 'LOGIN', payload:  res.user });
            reduxDispatch(setUserInfo(res.user));
            setDataLoading(false)
        })
            .catch((err) => {
                console.error(err);
            });

    }, [!editImageModal,!modalVisible,userDetails._id])


    useEffect(() => {
        setDataLoading(true)
        fetchCMS().then((res) => {
            console.log('res', res);
            if (res.status) {
                // //setting the fetched user into state variable
                setCms(res.cms);
            }
            setDataLoading(false)
        })
            .catch((err) => {
                console.error(err);
            });

    }, [])

    // //edit the  existing name
    function editUserName() {
        setModalVisible(false);
        setEditLoader(true);
        showError(false);
        if (name !== '') {
            editName(name, userDetails._id)
                .then((res) => {
                    console.log(res);
                    if (res.status) {
                        setEditLoader(false);
                        setModalLine1('Name has been');
                        setModalLine2('updated successfully')
                        setModalVisible(true)
                    }
                    else {
                        setEditLoader(false);
                        showError(true);
                        setErrorMessage('Error occured');
                    }

                })
                .catch((err) => {
                    console.error(err);
                    setEditLoader(false)
                    showError(true);
                    setErrorMessage('Error occured');
                })
        }
        else {
            setAddLoader(false)
            showError(true);
            setErrorMessage('Please fill all the Name');
        }

    }

    // //edit the  existing profile image
    function editProfileImage() {
        setModalVisible(false);
        setEditImageLoader(true)
        showError(false);
        if (name !== '') {
            updateImage(imageFile, userDetails._id)
                .then((res) => {
                    console.log(res);
                    if (res.status) {
                        setEditImageLoader(false);
                        setModalLine1('Profile image has been');
                        setModalLine2('updated successfully')
                        setModalVisible(true)
                        setEditImageModal(false)
                    }
                    else {
                        setEditImageLoader(false);
                        showError(true);
                        setErrorMessage('Error occured');
                    }

                })
                .catch((err) => {
                    console.error(err);
                    setEditImageLoader(false)
                    showError(true);
                    setErrorMessage('Error occured');
                })
        }
        else {
            setEditImageLoader(false)
            setAddLoader(false)
            showError(true);
            setErrorMessage('Please fill all the Name');
        }

    }

    const fileOnChange = (event) => {
        const url = URL.createObjectURL(event.target.files[0]);
        setFilePreview(url)
        setImageFile(event.target.files[0])
    }

    return (
        <>
            <Box sx={{width:'90%',m:'0 auto'}}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleChange} variant="scrollable">
                <MuiTab label="Personal Information" {...a11yProps(0)} />
                <MuiTab label="Terms & Conditions" {...a11yProps(1)} />
                <MuiTab label="Privacy Policy" {...a11yProps(2)} />
                </Tabs>
            </Box>
                <TabPanel value={tabValue} index={0}>
                    <PersonalInformation/>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <TermsConditions/>
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                    <PrivacyPolicy/>
                </TabPanel>
            </Box>
          <div>
            {/* <Tab.Container id="left-tabs-example" defaultActiveKey="PersonalInformation" style={{ backgroundColor: 'yellow' }}>
                <Nav variant="pills" className="flex-row justify-content-start clr-primary-200" style={{ height: 65 }}>
                    <Nav.Item className="mt-3" style={{marginLeft:50}}>
                        <Nav.Link className="borderRadius0  " eventKey="PersonalInformation">Personal Information</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="mt-3">
                        <Nav.Link className="borderRadius0  " eventKey="TermsConditions">Terms & Conditions</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="mt-3">
                        <Nav.Link className="borderRadius0  " eventKey="PrivacyPolicy">Privacy Policy</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Row>
                    <Col sm={12}>
                        <Tab.Content>
                            <Tab.Pane eventKey="PersonalInformation">
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
                                        <div className='w-100 h-100 '>
                                            <div className='mt-4 mx-4'>
                                                <h2 className="txt-5282F0 fw-bold">Basic Details</h2>
                                            </div>
                                            <hr style={{ height: 5, backgroundColor: '#1F1A38' }} />
                                            <div className="d-flex justify-content-end mx-5">
                                                <LoadingButton type='button' className='  px-3  ' onClick={() => setEditModal(true)}>Edit Profile</LoadingButton>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center py-5">
                                                <div className="card shadow-none w-20  ">
                                                    <div className="card-body">
                                                        <div className="d-flex justify-content-center ">
                                                            <img src={imageBaseUrl + (userData.profileImage)} className='w-100 h-100 shadow-lg text-center rounded-circle' alt='profile' />
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-center ">
                                                        <LoadingButton type='button' className='btn w-100 clr-primary-200  ' onClick={() => setEditImageModal(true)}>Update</LoadingButton>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-responsive-xl">
                                            <table className="table table-lg  table-borderless d-flex justify-content-center m-3 ">
                                                <tbody>
                                                    <tr>
                                                        <th><h3>Name: </h3></th>
                                                        <td><h3>{userData.name}</h3></td>
                                                    </tr>
                                                    <tr>
                                                        <th><h4>Email ID: </h4></th>
                                                        <td><h4>{userData.email}</h4></td>
                                                    </tr>
                                                    <tr>
                                                        <th><h4>Phone: </h4></th>
                                                        <td><h4>{userData.phoneNumber}</h4></td>
                                                    </tr>
                                                    <tr>
                                                        <th><h4>School: </h4></th>
                                                        <td><h4>{userData.school}</h4></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            </div>
                                             
                                        </div>
                                    </>
                                )}
                            </Tab.Pane>
                            <Tab.Pane eventKey="TermsConditions">
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
                                        <div className='w-100 h-100 '>
                                            <div className='mt-4 mx-4'>
                                                <h2 className="txt-5282F0 fw-bold">Terms & Conditions</h2>
                                            </div>
                                            <hr style={{ height: 5, backgroundColor: '#1F1A38' }} />
                                            <h5 className="m-4">{cms.termsAndConditions}</h5>
                                        </div>
                                    </>
                                )}
                            </Tab.Pane>
                            <Tab.Pane eventKey="PrivacyPolicy">
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
                                        <div className='w-100 h-100 '>
                                            <div className='mt-4 mx-4'>
                                                <h2 className="txt-5282F0 fw-bold">Pravicy Policy</h2>
                                            </div>
                                            <hr style={{ height: 5, backgroundColor: '#1F1A38' }} />
                                            <h5 className="m-4">{cms.privacyPolicy}</h5>
                                        </div>
                                    </>
                                )}
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container> */}
            </div>


            {/* Modal for edit profile */}
            <Modal
                show={editModal}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => setEditModal(false)}
            >
                <Modal.Header className="clr-primary-400 py-2" closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className="text-center">
                        <h4 className="text-center   mb-0">
                            Edit Profile
                        </h4>

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="labelColor mt-3">
                        <h6>Name</h6>
                        <input type="text" className="form-control txt-5282F0" placeholder="First Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    {/* <div className="labelColor mt-3">
                        <label>Email ID</label>
                        <input type="text" className="form-control txt-5282F0" placeholder="Email Address" />
                    </div>
                    <div className="labelColor mt-3">
                        <label>Phone Number</label>
                        <input type="text" className="form-control txt-5282F0" placeholder="Phone Number" />
                    </div>
                    <div className="labelColor mt-3">
                        <label>School</label>
                        <input type="text" className="form-control txt-5282F0" placeholder="School" />
                    </div> */}

                    <div className="text-center mt-4 pb-3">
                        {editLoader ? (
                            <LoadingButton className="  px-5" >
                                <Loader
                                    type="Puff"
                                    color="#c0ae0c"
                                    height={30}
                                    width={30}
                                />
                            </LoadingButton>
                        ) : (
                            <LoadingButton className="  px-5"
                                onClick={() => editUserName()}
                            >Save Changes</LoadingButton>
                        )}

                    </div>
                </Modal.Body>
            </Modal>


            {/* Modal for edit profile image */}
            <Modal
                show={editImageModal}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => setEditImageModal(false)}
            >
                <Modal.Header className="clr-primary-400 py-2" closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className="text-center">
                        <h4 className="text-center   mb-0">
                            Update Profile Image
                        </h4>

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="labelColor mt-3">
                        <div className="col-6 col-lg-6"    >
                            <h6>Profile Image</h6>
                            <input className="form-control" type="file" ref={ref => chooseFileRef = ref} onChange={(e) => { fileOnChange(e) }} style={{ visibility: 'hidden' }} />
                            <LoadingButton type="button" className=" " onClick={() => chooseFileRef.click()} >Choose Image</LoadingButton>
                        </div>
                        <div className="col-6 col-lg-6 mt-3">
                            <img src={filePreview} className="img-responsive w-100 h-100" alt='profile' visibility='hidden'/>
                        </div>

                    </div>

                    <div className="text-center mt-4 pb-3">
                        {editImageLoader ? (
                            <LoadingButton className="  px-5" >
                                <Loader
                                    type="Puff"
                                    color="#c0ae0c"
                                    height={30}
                                    width={30}
                                />
                            </LoadingButton>
                        ) : (
                            <LoadingButton className="  px-5"
                                onClick={() => editProfileImage()}
                            >Save Changes</LoadingButton>
                        )}

                    </div>
                </Modal.Body>
            </Modal>


            {/* model for successfully edited name */}
            <Modal
                show={modalVisible}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <div className="text-center txt-5282F0 my-4">
                        <img src={'/Assets/modalPhoto.png'} alt='profile' />
                        <h3>{modalLine1}</h3>
                        <h3 className="modalLowerText">{modalLine2}</h3>
                    </div>
                    <div className="text-center mt-4 pb-3">
                        <LoadingButton className="  px-5" style={{ marginRight: 10 }}
                            onClick={() => { setModalVisible(false); setEditModal(false) }}
                        >Back To Profile</LoadingButton>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
