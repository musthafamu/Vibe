
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import React from 'react'
import {setPosts} from '../../state/index';
import PostWidget from './PostWidget';
import { Box } from '@mui/material';
export const PostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);
  
    const getPosts = async () => {
      const response = await fetch("http://localhost:3001/posts", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    };

    const getUserPosts = async () => {
        const response = await fetch(
          `http://localhost:3001/posts/${userId}/posts`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
      
        dispatch(setPosts({ posts: data }));
      };
      useEffect(() => {
        if (isProfile) {
          getUserPosts();
        } else {
          getPosts();
        }
      }, []); 
    
  return  (
 
 <Box>  
 {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <Box sx={{    boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.1)',}}>

          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
          </Box>
        )
      )}
 </Box>
  )
}

