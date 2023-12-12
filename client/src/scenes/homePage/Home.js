import React from 'react'
import { Select,Box,useMediaQuery} from '@mui/material';
import { useSelector } from "react-redux"; 
import Navbar from '../navBar/Navbar'
import WidgetWrapper from '../../components/WidgetWrapper';
import { UserWidget } from '../widgets/UserWidget';
import { MypostWidget } from '../widgets/MypostWidget';
import {PostsWidget} from '../widgets/PostsWidget';
import AdvertWidget from '../widgets/AdvertWidget';
import FriendListWidget from '../widgets/FriendsWidget';
function Home() {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box sx={{background:"#34bdeb",height:"full"}}>
      <Navbar/>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
 
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath?.toString()} />
        </Box>
        <Box 
        flexBasis={isNonMobileScreens ? "42%":undefined}
        mt={isNonMobileScreens ?undefined :"2rem"}
        >
      <MypostWidget picturePath={picturePath} />
      <Box sx={{marginTop:"2rem"}}>

      <FriendListWidget  userId={_id} />
      </Box>

     <PostsWidget />


          </Box>
           {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}

      </Box>
    
  
      
    </Box>
  )
}

export default Home