// hooks
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { imageBaseUrl } from '../index';
import useAuth from '../hooks/useAuth';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user } = useAuth();
  const userDetails = useSelector((state) => state.user.info)


  const [avatar, setAvatar] = useState(null)

  useEffect(() => {
    if (userDetails?.profileImage) {
      if (userDetails.profileImage.includes('https://') || userDetails.profileImage.includes('http://')) {
        setAvatar(userDetails.profileImage)
      } else {
        setAvatar(`${imageBaseUrl}${userDetails.profileImage}`)
      }
    }

  }, [userDetails])
  console.log("userDetails navbar", avatar)
  return (
    <Avatar
      src={avatar}
      alt={userDetails?.name}
      color={avatar ? 'default' : createAvatar(userDetails?.name).color}
      {...other}
    >
      {createAvatar(userDetails?.name).name}
    </Avatar>
  );
}
