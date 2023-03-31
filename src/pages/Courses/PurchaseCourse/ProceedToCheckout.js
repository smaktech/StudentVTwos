import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { styled } from "@mui/material/styles";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { getCourseById } from '../../../api/Courses/Courses';
import CheckoutCart from './CheckoutCart';

export default function ProceedToCheckout() {

    const [courseId, setCourseId] = useState()

    const courseIdArray = JSON.parse(localStorage.getItem('carts'))
    console.log(courseIdArray)


    // courseIdArray.forEach((id, i) => {
    //     setCourseId(id)
    // })

    // useEffect(() => {
    //     getCourseById(courseId) // this method will take courseId and give course
    //         .then((res) => {
    //             console.log(res)
    //         })
    // }, [])


    const CardContentNoPadding = styled(CardContent)(`
    padding: 8px;
    &:last-child {
        padding-bottom: 0;
    }
   `)

    // respondive mui grid spacing
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <Box sx={{ width: '90%', m: '20px auto' }}>

            {/* <Grid container spacing={isSmall ? 1 : 3} sx={{ width: '100%', mx: '0 auto' }}>
                {courses.map((course, index) => (
                    <>
                        {console.log(course)}
                        <Grid item xs={6} md={4} xl={3} key={index}>
                            <Card sx={{ position: 'relative', borderTopLeftRadius: 0, borderTopRightRadius: 0, height: '370px' }}>
                                <CardMedia

                                    component="img"
                                    height="250"
                                    image={`${baseUrl}/${course.image}`}
                                    alt="Paella dish"
                                />
                                <CardContentNoPadding>
                                    <Typography>{course.name}</Typography>
                                </CardContentNoPadding>
                                <Box sx={{ height: '50px', position: 'absolute', bottom: '3%', right: '3%' }}>
                                    <Button onClick={() => {
                                        handleAddToCard(course._id)
                                    }}>Add to Cart</Button>
                                </Box>
                            </Card>
                        </Grid>
                    </>
                ))}
            </Grid> */}
            <CheckoutCart />
        </Box>
    );
};