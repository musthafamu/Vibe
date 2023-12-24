import {
    ManageAccountsOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
  } from "@mui/icons-material";
  import { Box, Typography, Divider, useTheme } from "@mui/material";
  import UserImage from "../../components/UserImage";
  import FlexBetween from  "../../components/Flexbetween"
  import WidgetWrapper from "../../components/WidgetWrapper";
  import { useSelector } from "react-redux";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import {colorToken} from "../../theme"
  
  export const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
   const friend=useSelector((state)=>state.user.friends);
   
    const getUser = async () => {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "GET",
        headers: {

             Authorization: `Bearer ${token}` 
            }
            
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      setUser(data);
    };
  
    useEffect(() => {
      getUser();
    }, [token,friend]); 
  
    if (!user) {
      return null;
    }
  
    const {
      firstName,
      lastName,
      location,
      occupation,
      viewedProfile,
      impression,
      friends,
    } = user;
    
  
    return (
      <WidgetWrapper sx={{    boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.1)',}} backgroundColor={colorToken.sky}>
   
        <FlexBetween
          gap="0.5rem"
          pb="1.1rem"
          onClick={() => navigate(`/profile/${userId}`)}
        >
          <FlexBetween gap="1rem">
         <UserImage image={picturePath} />
        
      
        

            <Box>
              <Typography
                variant=""
                color={colorToken.black}
                fontWeight="200"
                fontSize='1.4rem'
                sx={{
                  "&:hover": {
                    color:colorToken.black,
                    cursor: "pointer",
                  },
                }}
              >
                {firstName} {lastName}
              </Typography>
              <Typography color={colorToken.black}>{friends.length}  friends</Typography>
            </Box>
          </FlexBetween>
          <ManageAccountsOutlined />
        </FlexBetween>
  
        <Divider />
  
        {/* SECOND ROW */}
        <Box p="1rem 0">
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <LocationOnOutlined fontSize="large" sx={{ color: colorToken.black }} />
            <Typography color={colorToken.black}>{location}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="1rem">
            <WorkOutlineOutlined fontSize="large" sx={{ color:colorToken.black }} />
            <Typography color={colorToken.black}>{occupation}</Typography>
          </Box>
        </Box>
  
        <Divider />
  
        <Box p="1rem 0">
          <FlexBetween mb="0.5rem">
            <Typography color={colorToken.black}>Who's viewed your profile</Typography>
            <Typography color={colorToken.black} fontWeight="500">
              {viewedProfile}
            </Typography>
          </FlexBetween>
          <FlexBetween>
            <Typography color={colorToken.black}>Impressions of your post</Typography>
            <Typography color={colorToken.black} fontWeight="500">
              {impression}
            </Typography>
          </FlexBetween>
        </Box>
  
        <Divider />
  
        
          
             
  
          
             
      
      </WidgetWrapper>
    );
  };
  
