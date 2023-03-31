import React, { useEffect, useState } from 'react';
import { current } from '@reduxjs/toolkit';
import DateFnsUtils from "@date-io/date-fns";
import {
    DatePicker,
    MuiPickersUtilsProvider,
    DateTimePicker
} from '@material-ui/pickers';
import { Box, Button, Typography, DialogTitle, TextField } from '@mui/material';
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Stack from '@mui/material/Stack';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import { createTheme } from '@material-ui/core/styles'
import { useSelector } from 'react-redux';
import { dispatch } from '../../redux/store';
import { DialogAnimate } from '../../components/animate';
import { CalendarForm, CalendarStyle, CalendarToolbar } from '../../sections/@dashboard/calendar';
import { getEvents, openModal, closeModal, updateEvent, selectEvent, selectRange } from '../../redux/slices/calendar';

const materialTheme = createMuiTheme({
    overrides: {

        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: "#00AB55",
            },
        },
        MuiPickersCalendarHeader: {
            switchHeader: {
                backgroundColor: "#00AB55",
                color: "red",
            },
        },
        MuiPickersDay: {
            daySelected: {
                backgroundColor: "#00AB55"
            },

        }

    },
});

const selectedEventSelector = (state) => {
    const { events, selectedEventId } = state.calendar;
    if (selectedEventId) {
        return events.find((_event) => _event.id === selectedEventId);
    }
    return null;
};

export default function MuiCalendar() {
    const { events, isOpenModal, selectedRange } = useSelector((state) => state.calendar);
    const selectedEvent = useSelector(selectedEventSelector);
    const [selectedDate, handleDateChange] = useState(new Date());
    const userDetails = useSelector((state) => state.user.info)
    const handleAddEvent = (date) => {
        handleDateChange(date)
        dispatch(openModal({start:date,end:date}));
    };

    const handleCloseModal = () => {
        dispatch(closeModal());
    };

    useEffect(() => {
        if(userDetails?._id)
        {
          dispatch(getEvents(userDetails._id));
        }
        
      }, [dispatch,userDetails]);

    const [value, setValue] = React.useState(new Date());
    return (
        <div className="dashboard_calendar"> 
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    {/* <Stack spacing={3}> */}
                    <ThemeProvider theme={materialTheme}>
                        <StaticDatePicker
                            displayStaticWrapperAs="for Mobile"
                            openTo="day" 
                            value={selectedDate}
                            onChange={(date)=>handleAddEvent(date)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </ThemeProvider>

                    {/* </Stack> */}
                </LocalizationProvider>
                {/* <Box sx={{ display: 'flex' }}>
                    <Box sx={{ flexGrow: .5 }} />
                    <Button sx={{ color: 'primary' }} variant='text'>Cancel</Button>
                    <Button color='primary' variant='text' onClick={handleAddEvent}>ok</Button>
                </Box> */}
                <DialogAnimate open={isOpenModal} onClose={handleCloseModal}>
                    <DialogTitle>{/* {selectedEvent ? 'Edit Event' : 'Add Event'} */} Add Event</DialogTitle>
                    <CalendarForm event={selectedEvent || {}} range={selectedRange} onCancel={handleCloseModal} />
                </DialogAnimate>
            
        </div>
    );
};