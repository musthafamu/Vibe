// PostPagination.js
import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PostPagination = ({ page, totalPages, onPageChange }) => {
  const handlePageChange = (event, newPage) => {
    onPageChange(event, newPage);
  };

  return (
    <Stack spacing={2}>
      <Pagination count={totalPages} page={page} onChange={handlePageChange} />
    </Stack>
  );
};

export default PostPagination;
