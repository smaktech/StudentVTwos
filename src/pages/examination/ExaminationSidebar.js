import React from 'react';
import { Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { KanbanColumnAdd } from '../../sections/@dashboard/kanban';
import { deleteUserNotesByUserIdAndNoteId, getUserNotesById } from 'src/api/Courses/Courses';
import { useSelector } from 'react-redux';

import UserTimeline from '../Courses/UserTimeline';

export default function ExaminationSidebar() {


    const [notes, setNotes] = useState([]) 
    const userDetails = useSelector(state => state.user.info)

    const [loadingDelete,setLoadingDelete]= useState(false)
    
    const [userTodayTimeline,setUserTodayTimeline] = useState([]);
    const [userTmrwTimeline,setUserTmrwTimeline] = useState([]);
    
    const appendNotes=(note)=>
    {
      let n = [...notes];
      n.push(note)
      setNotes(n)
    }
    useEffect(() => {
        if (userDetails._id) {
          getUserNotesById(userDetails._id)
            .then((res) => {
              console.log('notes', res);
              if (res.status) {
                setNotes(res.notes.slice(0,3)) 
              }
            })
        }
      }, [userDetails])

    const deleteNote = (userID, noteID,index) => {
   
        if(!loadingDelete)
        {
          setLoadingDelete(true)
          deleteUserNotesByUserIdAndNoteId(userID, noteID)
          .then((data) => {  
            if(data.status)
            {
              let  n = [...notes]
              n.splice(n,1)
              setNotes(n)
            }
            setLoadingDelete(false)
          })
        }
        
      }

      useEffect(() => {

        if(userDetails._id)
        {
          getTimelineByUserId(userDetails._id,moment(Date.now()).format("Y-M-D"))
          .then(res => {
            console.log(res," timeline")
            setUserTodayTimeline(res.data)
          })
          
          var date = new Date() 
          // Add a day
          date.setDate(date.getDate() + 1)
          getTimelineByUserId(userDetails._id,moment(date).format("Y-M-D"))
          .then(res => {
            console.log(res," timeline")
            setUserTmrwTimeline(res.data)
          })
        }
        
      }, [userDetails])
    return ( 
        <Box sx={{ width: '100%', height: '100vh' }}>
             <Grid container spacing={0}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography>Timeline/Activity</Typography>
            </Grid>
            <Grid item xs={12} sx={{ mb: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Card sx={{ boxShadow: 10, width: '100%', height: '250px' }}>
                <CardContent sx={{ p: 0 }}>
                  <Typography sx={{ textAlign: 'center' }} variant='h6'>Today</Typography>
                  <Divider style={{ background: 'black', width: '100%', m: '0 auto' }} variant='middle' />
                    <UserTimeline
                      timeline={userTodayTimeline}
                    />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sx={{ mb: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Card sx={{ boxShadow: 10, width: '100%', height: '250px' }}>
                <CardContent sx={{ p: 0 }}>
                  <Typography sx={{ textAlign: 'center' }} variant='h6'>Tomorrow</Typography>
                  <Divider style={{ background: 'black', width: '100%', m: '0 auto' }} variant='middle' />
                  <UserTimeline
                      timeline={userTmrwTimeline}
                    />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Card sx={{ boxShadow: 10, width: '100%', height: '300px' }}>
                <CardContent sx={{ p: 1 }}>
                  <KanbanColumnAdd appendNotes={appendNotes} />
                  <Box sx={{ width: '100%', textAlign: 'center' }}>
                    {notes?.map((noteDetails, index) => 
                      <Grid item md={12} key={index}>
                        <Box sx={{ boxShadow: 2, my: '10px',   width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography sx={{ textAlign: 'start',  }}>{noteDetails.note.slice(0, 40)}{noteDetails.note.length > 40 ? '...' : ''}</Typography>
                          <Button onClick={() => deleteNote(noteDetails.userID, noteDetails._id,index)}>
                            {loadingDelete?(
                                  <Loader type="Puff" color="#c0ae0c" height={30} width={30} />
                            ):(
                              <DeleteIcon />
                            )}
                            
                          </Button>
                        </Box>
                      </Grid>
                    )}
                   </Box>

                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'center',position: "absolute",bottom: 0,marginLeft: "auto",width: '100%' }}>
                      <Button onClick={() => {
                            history(`/dashboard/courses/notes/${userDetails?._id}`);
                          }} variant='text'>see all notes</Button>
                      
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sx={{ height: '100px', display: 'flex', justifyContent: 'end', alignItems: 'end' }}>
              <Box sx={{ display: 'flex', zIndex: 2, position: 'fixed', bottom: '2%', right: '2%' }}>
                <Box sx={{ borderRadius: '50%', backgroundColor: 'gray', p: 2, color: 'white' }}>
                  <AddCircleIcon sx={{ fontSize: '30px' }} />
                </Box>
                <Box sx={{ ml: 2, borderRadius: '50%', backgroundColor: 'gray', p: 2, color: 'white' }}>
                  <ChatBubbleIcon sx={{ fontSize: '30px' }} />
                </Box>
              </Box>
            </Grid>

          </Grid>
        </Box>

    );
};