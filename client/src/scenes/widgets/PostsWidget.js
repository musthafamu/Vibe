import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../../state/index';
import { UserPost } from './userPost';
import { Box } from '@mui/material';
import BasicPagination from './paginations';
import { Feeds } from './FeedsWidget';

export const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const [page, setPage] = useState(2);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState();
  const [loading, setLoading] = useState(true);

  const getPosts = async (currentPage) => {
    try {
      const response = await fetch(`http://localhost:3001/posts?page=${currentPage}&limit=${limit}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      
      
      const data = await response.json();
      const totalPages = Math.round(data.total / 10);


      setTotalPages( totalPages)
     console.log(data)
      dispatch(setPosts({
        posts: data.results,
      }));

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
 
  };

  const getUserPosts = async () => {
    const response = await fetch(`http://localhost:3001/posts/${userId}/posts`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (isProfile) {
          await getUserPosts();
        } else {
          await getPosts(page);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isProfile, page]);

  return (
    <>
      {loading ? (
        <p>Loading....</p>
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
                <React.Fragment key={_id}>
                  {isProfile ? (
                    <UserPost
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
                  ) : (
                    <Feeds
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
                  )}
                </React.Fragment>
              )
            )}
            {!isProfile &&
          <Box sx={{ display: 'flex', justifyContent: 'center', margin: '25px' }}>
            <BasicPagination
               page={page}
               totalPages={totalPages}
               onPageChange={handlePageChange}
            />
          </Box>
}
        </>
      )}
    </>
  );
};
