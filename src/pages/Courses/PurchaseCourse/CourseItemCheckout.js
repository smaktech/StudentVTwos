import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardContent, CardMedia, Checkbox, Grid, Modal, Stack, Typography } from '@mui/material';
import { baseUrl } from 'src';
import { useSelector } from 'react-redux';
import { addToCart } from 'src/api/Subscription/subscription';
import { styled } from "@mui/material/styles";
import { useSnackbar } from 'notistack';

import { useDispatch } from 'react-redux';
import { setCartItems } from '../../../redux/slices/cart';
import Loader from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@mui/material/styles';
const CardContentNoPadding = styled(CardContent)(`
    padding: 8px;
    &:last-child {
        padding-bottom: 0;
    }
   `)
function CourseItemCheckout({ course, index, userCourses}) {

    const [addedToCart, setAddedToCart] = useState(false)
    const [loading, setLoading] = useState(false)
    const [coursePurchased,setCoursePurchased] = useState(false)
    const navigate = useNavigate()
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.only('xs'));
    const reduxDispatch = useDispatch();
    const showSnack = () => {


        enqueueSnackbar('Added To Cart', { variant: 'success' });

    };
    useEffect(() => {

        if(course&&userCourses)
        {
            let result = userCourses?.find(i=>i.courseID?._id==course._id)
       
            if(result) 
            {
                console.log(result)
                setCoursePurchased(true);
            }
        }
        
    },[course,userCourses])

    const { enqueueSnackbar } = useSnackbar();

    const userDetails = useSelector((state) => state.user.info);
    const handleAddToCart = (courseId) => {
        setLoading(true);
        addToCart(courseId, userDetails._id)
            .then(data => {
                if (data.status) {
                    console.log(data)
                    showSnack()
                    reduxDispatch(setCartItems(data?.cart?.courses))
                    setAddedToCart(true)
                }
                setLoading(false)
            })
    }
 
    return (
        
            <Grid item xs={12} md={4} xl={3} key={index} className="mb-2">
                
                    <Card sx={{boxShadow: 10, height: 320, display: 'flex', flexDirection: 'column', pb: 1 }}>
                        <CardMedia
                            component="img"
                            image={`${baseUrl}/${course.image}`}
                            alt="Course Image"
                            sx={{ height: "50%",objectFit:"contain" }}
                        />
                        <CardContentNoPadding sx={{ mt: 'auto' }}>
                            <Typography>{course.name}</Typography>
                        </CardContentNoPadding>
                        <Box className={isSmall?("mb-2"):("")}  sx={{ alignSelf: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', mt: "auto" }}>
                            {coursePurchased?(
                                    <Button   size='large'  variant="contained"  onClick={()=>{ navigate(`/dashboard/courses/${course?._id}/${course?.name}/${course?.classesID?.name}/${course?.subjectID?.name}/${course?.boardID?.name}`)}} >
                                        View Course
                                    </Button>
                            ):(
                                <>
                                    {addedToCart ? (
                                        <Button
                                            size='large'
                                            sx={{ color: 'white', backgroundColor: 'rgb(179,151,5)' }}
                                            variant="outlined" onClick={() => {
                                                navigate("/dashboard/courses/checkout")
                                            }}>View Cart</Button>
        
                                    ) : (
        
                                        loading ? (
                                            <Button variant="outlined">
                                                <Loader type="Puff" color="#c0ae0c" height={20} width={30} />
                                            </Button>
        
                                        ) :
                                            (
                                                <Button
                                                    size='large' 
                                                    variant="contained" onClick={() => {
                                                        handleAddToCart(course._id)
                                                    }}>Add to Cart</Button>
                                            )
                                    )}
                                </>
                                
                            )}
                            
                        </Box>
                    </Card>
                
            </Grid> 
         
    )
}

export default CourseItemCheckout