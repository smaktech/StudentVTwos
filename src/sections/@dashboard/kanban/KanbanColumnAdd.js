import { useState, useRef, useEffect } from 'react';
import { useSnackbar } from 'notistack';
// @mui
import { OutlinedInput, Paper, Button, ClickAwayListener } from '@mui/material';
// redux
import { useDispatch } from '../../../redux/store'; 
// components
import Iconify from '../../../components/Iconify';
import { userNotesById } from '../../../api/Courses/Courses';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

export default function KanbanColumnAdd({}) {

  const userDetails = useSelector((state) => state.user.info)
  const userId = userDetails?._id
  const nameRef = useRef(null);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (open) {
      if (nameRef.current) {
        nameRef.current.focus();
      }
    }
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleCreateColumn = () => {
    console.log(userId, name)
    userNotesById(userId, name)
      .then((res) => {
        if (res.status) {
          console.log(res)
        }
      })
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      userNotesById(userId, name)
        .then((res) => {
          if (res.status) {
            console.log(res)
          }
        })
      event.target.value = ''
    }
  };

  return (
    <Paper sx={{ /* minWidth: 280, width: 280 */ width: '100%' }}>
      {!open && (
        <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          endIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />}
          onClick={handleOpen}
        >
          My Notes
        </Button>
      )}

      {open && (
        <ClickAwayListener onClickAway={handleCreateColumn} >
          <OutlinedInput
            fullWidth
            // placeholder="New section"
            // inputRef={nameRef}
            // value={name}
            onChange={handleChangeName}
            onKeyUp={handleKeyUp}
            sx={{ typography: 'h6' }}
          />
        </ClickAwayListener>
      )}
    </Paper>
  );
}
