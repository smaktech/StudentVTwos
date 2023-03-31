import { Box, Button, Card, Link, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';

export default function PaymentSuccess() {
    const navigate = useNavigate()
    return (
        <Card sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ width: '40%' }}>
                <img src="https://i.ibb.co/rQSfLkG/success.png" alt="" width={"100%"} />
                <Box sx={{ textAlign: 'center', mt: 5 }}>
                    <Typography variant='h5'>Your Payment is Successfull</Typography>
                    <Typography sx={{ mb: 3 }}>Thank you for your payment. An automated payment receipt will be sent to your registered email.</Typography>
                    <Button variant="outlined"  onClick={()=>navigate("/dashboard/app")} >Back to Dashboard</Button>
                </Box>
            </Box>
        </Card>
    );
};

;