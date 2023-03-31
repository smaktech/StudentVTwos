import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { updateNoteByUserIdAndNoteId,deleteUserNotesByUserIdAndNoteId } from 'src/api/Courses/Courses'
import { Box, Card, CardContent, Grid, Typography, CardActions, Button, TextField, styled } from '@mui/material';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'; 
import Loader from 'react-loader-spinner';
const CardContentNoPadding = styled(CardContent)(`
padding: 0px;
&:last-child {
    padding-bottom: 0;
}
`)

function SingleNote({note,index,deleteInterface}) {


    const [text,setText] = useState(note.note)
    const userDetails = useSelector((state) => state.user.info)
    const userId = userDetails?._id
    const [deleteLoading,setDeleteLoading] = useState(false)
    useEffect(()=>{
        setText(note.note)
    },[note])
    const deleteNote = (noteID,index) => {

        if(!deleteLoading)
        {
            setDeleteLoading(true)
            console.log(userId, noteID)
            deleteUserNotesByUserIdAndNoteId(userId, noteID)
                .then((data) => {
                     if(data.status)
                     {
                        deleteInterface(index)
    
                     } 
                     setDeleteLoading(false)
                }).catch((error) => {
                    console.log(error)
                })
        }
        
    }

    
    const updateNote = (noteId) => {
        console.log(noteId)
        updateNoteByUserIdAndNoteId(userDetails._id, noteId, text)
            .then(data => {
                 
            })
    }
  return (
            <Grid item xs={12} md={4} key={index}>
                <Card sx={{ boxShadow: 10, height: '250px' }}>
                    <CardContentNoPadding>
                        {/* <Typography>{note.note}</Typography> */}
                        <TextField
                            label={`last updated - ${moment(note.updatedAt).format('D-M-Y H:m:s')}`}
                            sx={{ width: '100%' }}
                            variant="filled"
                            multiline
                            rows={7}
                            // value={singleNote}
                            value={text}
                            // value={singleNote}
                            onChange={(e) => setText(e.target.value)}
                            onBlur={() => updateNote(note._id)}
                        />
                    </CardContentNoPadding>
                    <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
                         
                        <Button onClick={() => deleteNote(note._id,index)}>
                            {deleteLoading?(
                                <Loader type="Puff" color="#c0ae0c" height={30} width={30} />
                            ):(

                                <DeleteIcon />
                            )}
                            
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
  )
}

export default SingleNote