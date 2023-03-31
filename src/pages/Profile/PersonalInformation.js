import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import { Modal } from 'react-bootstrap'
import { Modal as MuiModal, Paper, Button, Grid,Box, Typography, Card, Avatar, CardActions, Divider } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import palette from '../../theme/palette';
import { editName, fetchUser, updateImage } from '../../api/User/User';
import { setUserInfo } from '../../redux/slices/user';
import { imageBaseUrl } from '../..';

export default function PersonalInformation() {

    // //sets the loader of apply changes in edit modal
    const [editImageLoader, setEditImageLoader] = useState(false);
    // //sets the loader for add subject button
    const [addLoader, setAddLoader] = useState(false)


    const [imageFile, setImageFile] = useState(null);
    // //sets and display the line in the success modal!
    const [modalLine1, setModalLine1] = useState('');
    const [modalLine2, setModalLine2] = useState('')
    // //shows the error when users try to add without name
    const [errorMessage, setErrorMessage] = useState(false);
    const [error, showError] = useState(false);
    // //sets the loader of apply changes in edit modal
    const [editLoader, setEditLoader] = useState(false);
    // //sets the visibility of the edit modal 
    const [editImageModal, setEditImageModal] = useState(false);
    // //table data loading indicator
    const [dataLoading, setDataLoading] = useState(false)
    // //sets the visibility of the edit modal 
    const [editModal, setEditModal] = useState(false);
    // // sets the user data
    const [userData, setData] = useState([])

    // //sets image file user want to add
    const [filePreview, setFilePreview] = useState(null);

    const [name, setName] = useState('')
    const [modalVisible, setModalVisible] = useState(false)

    // //referance variable for image file choose
    let chooseFileRef = useRef()

    const userDetails = useSelector((state) => state.user.info)
    const reduxDispatch = useDispatch();

    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        setDataLoading(true)

        fetchUser(userDetails._id).then((res) => {
            console.log('res', res);
            // //setting the fetched user data into state variable
            setData(res.user);
            setName(res.user.name)
            reduxDispatch({ type: 'LOGIN', payload: res.user });
            reduxDispatch(setUserInfo(res.user));
            setDataLoading(false)
        })
            .catch((err) => {
                console.error(err);
            });

    }, [!modalVisible, userDetails._id])


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
    console.log(userData.profileImage)
    return (
        <>
            {dataLoading ? (

                <Box sx={{ display: 'flex', height: '70vh', justifyContent: 'center', alignItems: 'center' }}>
                    <Loader
                        type="Puff"
                        color="#c0ae0c"
                        height={30}
                        width={30}
                    />
                </Box>
            ) : (
                <>
                    <Box>
                        <Box>
                            <Typography variant='h3'>Basic Details</Typography>
                        </Box>
                        <Grid container>

                            <Grid item xs={8} md={8} xl={8}>
                                <Box sx={isSmall?{mt: 1 }:{ display: 'flex', justifyContent: 'center', alignItems: 'center',mt: 1 }}>
                                    <Card sx={{  display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',width: 200, height: 200  }}>
                                        <Box>
                                            <Avatar
                                                alt={userData?.name?.toUpperCase()}
                                                src={imageBaseUrl + (userData.profileImage)}
                                                sx={{ width: 100, height: 100 }}
                                            />
                                        </Box>
                                        <CardActions>
                                            <Button onClick={() => setEditImageModal(true)} size="small">Update</Button>
                                        </CardActions>
                                    </Card>
                                </Box>
                            </Grid>
                            <Grid item xs={4} md={4} xl={4}>
                                    <Box sx={{ display: 'flex', justifyContent: 'end', mt: 1 }}>
                                        <Button
                                            onClick={() => setEditModal(true)}
                                            variant='contained'
                                        >Edit Profile</Button>
                                    </Box>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} md={8} xl={8}>
                                <Box sx={isSmall?{mt:5}:{ mt: 5, alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                                    <Box >
                                        <Typography sx={{ mb: 1, fontSize: '1.25rem' }}>
                                            <span style={{ fontWeight: 'bold' }}> Name:</span> { ('')} {userData.name}
                                        </Typography>
                                        <Typography sx={{ mb: 1, fontSize: '1.25rem' }}>
                                            <span style={{ fontWeight: 'bold' }}>   Email Id:</span>  { ('')} {userData.email}
                                        </Typography>
                                        <Typography sx={{ mb: 1, fontSize: '1.25rem' }}>
                                            <span style={{ fontWeight: 'bold' }}>   Phone Id: </span>  { ('')} {userData.phoneNumber}
                                        </Typography>
                                        <Typography sx={{ mb: 1, fontSize: '1.25rem' }}>
                                            <span style={{ fontWeight: 'bold' }}>  School Id:</span> { ('')} {userData.school}
                                        </Typography>
                                    </Box>
                            {/* <TableContainer component={Paper}>
                                <Table size="small" sx={{ minWidth: 650, m: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} aria-label="simple table">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell sx={{ fontSize: '25px' }} align="left">Name:</TableCell>
                                            <TableCell sx={{ fontSize: '25px' }} align="left">{userData.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ fontSize: '25px' }} align="left">Email ID:</TableCell>
                                            <TableCell sx={{ fontSize: '25px' }} align="left">{userData.email}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ fontSize: '25px' }} align="left">Phone:</TableCell>
                                            <TableCell sx={{ fontSize: '25px' }} align="left">{userData.phoneNumber}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ fontSize: '25px' }} align="left">School:</TableCell>
                                            <TableCell sx={{ fontSize: '25px' }} align="left">{userData.school}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer> */}
                                </Box>

                            </Grid>

                        </Grid>
                        
                        
                    </Box>
                </>
            )}


            {/* Modal for edit profile */}
            {/* <MuiModal>

            </MuiModal> */}
            <Modal
                show={editModal}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => setEditModal(false)}
            >
                <Modal.Header className="clr-primary-400 py-2" closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className="text-center">
                        {/* <h4 className="text-center   mb-0">
                            Edit Profile
                        </h4> */}
                        <Typography variant='h4' color={'primary'}>Edit Profile</Typography>

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
                            // <LoadingButton className="  px-5"
                            //     onClick={() => editUserName()}
                            // >Save Changes</LoadingButton>
                            <Button
                                variant='outlined'
                                onClick={() => editUserName()}>
                                Save Changes
                            </Button>
                        )}

                    </div>
                </Modal.Body>
            </Modal>


            {/* Modal for edit profile image */}
            {/* <MuiModal
                open={editImageModal}
                onClose={() => setEditImageModal(false)}
            >
                <Box>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </MuiModal> */}
            {
                console.log(theme.palette.text.primary)
            }

            <Modal
                show={editImageModal}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => setEditImageModal(false)}
            >
                <Modal.Header className="clr-primary-400 py-2" closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className="text-center">
                        {/* <h4 className="text-center   mb-0">
                            Update Profile Image
                        </h4> */}
                        <Typography variant='h4' color={'primary'}>Update Profile Image</Typography>

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row labelColor mt-1">
                        <div className="col-12 col-lg-12  " style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}   >
                            <Typography variant='h6' color={'primary'}>Profile Image</Typography>
                            {/* <h6>Profile Image</h6> */}

                            {/* <LoadingButton type="button" className=" " onClick={() => chooseFileRef.click()} >Choose Image</LoadingButton> */}
                            <Button variant='text' onClick={() => chooseFileRef.click()}>
                                <Avatar src={filePreview} style={{ width: 100, height: 100 }} alt='profile' />
                            </Button>
                            <input className="form-control" type="file" ref={ref => chooseFileRef = ref} onChange={(e) => { fileOnChange(e) }} style={{ visibility: 'hidden', height: 0 }} />
                            {/* <img src={filePreview} className="img-responsive w-100 h-100" alt='profile' visibility='hidden' /> */}
                        </div>

                    </div>

                    <div className="text-center  pl-10 pb-3">
                        {editImageLoader ? (
                            // <LoadingButton className="  px-5" >
                            //     <Loader
                            //         type="Puff"
                            //         color="#c0ae0c"
                            //         height={30}
                            //         width={30}
                            //     />
                            // </LoadingButton>
                            <Button
                            >
                                <Loader
                                    type="Puff"
                                    color="#c0ae0c"
                                    height={30}
                                    width={30}
                                />
                            </Button>
                        ) : (
                            // <LoadingButton className="  px-5"
                            //     onClick={() => editProfileImage()}
                            // >Save Changes</LoadingButton>
                            <Button
                                variant='outlined'
                                onClick={() => editProfileImage()}>
                                Save Changes
                            </Button>
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
                    <div className="text-center txt-5282F0 my-4" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                        <img src={'/Assets/modalPhoto.png'} alt='profile' />
                        <h3>{modalLine1}</h3>
                        <h3 className="modalLowerText">{modalLine2}</h3>
                    </div>
                    <div className="text-center mt-4 pb-3">
                        {/* <LoadingButton className="  px-5" style={{ marginRight: 10 }}
                            onClick={() => { setModalVisible(false); setEditModal(false) }}
                        >Back To Profile</LoadingButton> */}
                        <Button
                            variant='text'
                            onClick={() => { setModalVisible(false); setEditModal(false) }}>
                            Back To Profile
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

        </>
    );
}