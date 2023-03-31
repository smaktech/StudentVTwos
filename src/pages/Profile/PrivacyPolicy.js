import React, {useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { Box, Divider, Typography } from '@mui/material';
import { fetchCMS } from '../../api/CMS/CMS';

export default function PrivacyPolicy(){

    // //setting cms data into a variable
    const [cms, setCms] = useState([]);
      // //table data loading indicator
      const [dataLoading, setDataLoading] = useState(false)

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


    return(
        <>
            {dataLoading ? (
                                        <Box sx={{display:'flex',height:'70vh',justifyContent:'center',alignItems:'center'}}>
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
                                                        <Typography variant='h3'>Privacy Policy</Typography>
                                                    </Box>
                                                     
                                                    <Typography sx={{width:'90%',m:'0 auto'}} variant='body'>{cms.privacyPolicy}</Typography>
                                                </Box>
                                            </>
                                        )}
        </>
    );
}