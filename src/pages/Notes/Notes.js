import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Grid, Typography, CardActions, Button, TextField, styled } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { deleteUserNotesByUserIdAndNoteId, getUserNotesById, updateNoteByUserIdAndNoteId, userNotesById } from '../../api/Courses/Courses';

import Loader from 'react-loader-spinner';
import SingleNote from './SingleNote';
export default function Notes() {

    const CardContentNoPadding = styled(CardContent)(`
    padding: 0px;
    &:last-child {
        padding-bottom: 0;
    }
   `)

    const history = useNavigate();

    const [notes, setNotes] = useState([]);
    const [singleNote, setSingleNote] = useState('');
    const [update, setUpdate] = useState(false)
    const [loading, setLoading] = useState(false)
    const { userId } = useParams();
    const [noteLoading, setNoteLoading] = useState(true)
    console.log(userId)

    const createNote = () => {
        if (!loading) {
            setLoading(true)
            userNotesById(userId, " ")
                .then(data => {
                    if (data.status) {
                        let n = [...notes];
                        n.unshift(data.note)
                        setNotes(n)
                    }
                    setLoading(false)
                })
        }


    }



    const deleteInterface = (index) => {
        let n = [...notes];
        n.splice(index, 0)
        setNotes(n)
    }
    useEffect(() => {


        setNoteLoading(true)
        getUserNotesById(userId)
            .then((res) => {
                if (res.status) {
                    setNotes(res.notes)
                    console.log(res.notes)

                }
                setNoteLoading(false)
            })
    }, [])

    // const sortByTime = notes.sort((a, b) => {
    //     return (a.updatedAt - b.updatedAt)
    // })
    // const sortByTimeData = sortByTime.reverse()


    return (
        <Box sx={{ width: '90%', m: '0 auto' }}>
            <Box sx={{ display: 'flex', mb: 3, justifyContent: 'space-between' }}>
                <Button onClick={() => history(-1)} sx={{ mr: 2 }} variant='contained'><ArrowBackIcon />Back</Button>
                <Typography variant='h5'>My Notes</Typography>
                <Button variant='contained' sx={{ mr: 2 }} onClick={createNote}>
                    {loading ? (

                        <Loader type="Puff" color="#c0ae0c" height={30} width={30} />
                    ) : (
                        <>
                            <AddIcon />Add Note
                        </>
                    )}

                </Button>
            </Box>
            <Grid container spacing={3}>

                {noteLoading ? (

                    <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Loader type="Puff" color="#c0ae0c" height={30} width={30} />
                    </Box>

                ) : (

                    notes.map((note, index) => (
                        <SingleNote
                            note={note}
                            index={index}
                            deleteInterface={deleteInterface}
                        />
                    ))

                )}


            </Grid>
        </Box>
    );
};

;