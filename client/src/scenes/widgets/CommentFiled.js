import * as React from 'react';
import Box from '@mui/material/Box';
import { useEffect } from 'react';

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { Typography,Divider } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import SendIcon from '@mui/icons-material/Send';
import { colorToken } from '../../theme';
import { Button } from '@mui/material';
import FlexBetween from '../../components/Flexbetween';
import UserImage from '../../components/UserImage';
import { useSelector, useDispatch } from 'react-redux';
import { setComment, setPosts,setCommentAll } from '../../state/index'; // Assuming setComment is your Redux action

export default function CommentField({ comments,isComments,postId }) {
  const { picturePath } = useSelector((state) => state.user);

  const token = useSelector((state) => state.token);
  const [comment, setcomment] = React.useState('');

  const dispatch = useDispatch();

  
  const addComment = async () => {
  
      const response = await fetch(`http://localhost:3001/posts/${postId}/comment`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment }),
        
      })
    
    
      const data = await response.json();
      if (comment.trim().length > 0) {
        dispatch(setComment({ postId, comment: data }));
      }
      setcomment('');

      getComment();
      
       
      
    
  };

  const getComment=async()=>{
    const response = await fetch(`http://localhost:3001/posts/${postId}/comment`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
   
      
    })
    const data= await response.json();
    dispatch(setCommentAll({comments:data}))
  }
  useEffect(() => {
    console.log("is comment changed",isComments)
    getComment();
  }, []);

 

  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <FlexBetween>
        <FormControl variant="standard">
          <InputLabel htmlFor="input-with-icon-adornment">Add comments</InputLabel>
          <Input
            id="comment"
            value={comment}
            onChange={(e) => setcomment(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <UserImage size={25} image={picturePath} />
              </InputAdornment>
            }
          />
        </FormControl>
        <Button onClick={addComment} sx={{ background: colorToken.sky }} size="small" variant="contained" endIcon={<SendIcon />}>
          Send
        </Button>
      </FlexBetween>
     
    </Box>
  );
}
