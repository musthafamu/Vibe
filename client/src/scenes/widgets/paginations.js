import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const BasicPagination = ({ page, totalPages, handlePageChange }) => {
  const handleChange = (event, value) => {
    handlePageChange(value);
  };

  // Ensure totalPages is a valid number, fallback to 1 if not
  const validTotalPages = typeof totalPages === 'number' && !isNaN(totalPages) ? totalPages : 1;

  return (
    <Stack spacing={2}>
      <Pagination count={validTotalPages} page={page} onChange={handleChange} color="secondary" />
    </Stack>
  );
};

export default BasicPagination;
