import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../../state/index';
import PostWidget from './PostWidget';
import { Box } from '@mui/material';
import BasicPagination from './paginations';

export const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const getPosts = async () => {
    try {
      const response = await fetch(`http://localhost:3001/posts?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      // Calculate total pages based on the total count from the server response headers
      const totalCount = parseInt(response.headers.get('X-Total-Count'), 10);
      const totalPages = Math.ceil(totalCount / limit);
      setTotalPages(totalPages);

      dispatch(setPosts({ posts: data }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getUserPosts = async () => {
    const response = await fetch(`http://localhost:3001/posts/${userId}/posts`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    }
  }, [isProfile, userId, token]);

  useEffect(() => {
    getPosts();
  }, [page, limit, token, dispatch]);

  return (
    <Box>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {Array.isArray(posts) &&
            posts.map(
              ({
                _id,
                userId,
                firstName,
                createdDate,
                lastName,
                description,
                location,
                picturePath,
                userPicturePath,
                likes,
                comments,
              }) => (
                <Box key={_id} sx={{ boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.1)' }}>
                  <PostWidget
                    postId={_id}
                    createdDate={createdDate}
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

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <BasicPagination page={page} totalPages={totalPages} handlePageChange={handlePageChange} />
          </Box>
        </>
      )}
    </Box>
  );
};
