import { Box, Typography,Divider, useTheme } from "@mui/material";
import WidgetWrapper from '../../components/WidgetWrapper';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../state/index"
import { colorToken } from "../../theme";
import Friend from '../../components/Friend'
const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); 
  return (
    <WidgetWrapper >
      <Typography
        color={colorToken.black}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
        <Divider/>
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.length >0 ? friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        )):(<Typography sx={{textAlign:"center"}} >no friends</Typography>)    }
          </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;