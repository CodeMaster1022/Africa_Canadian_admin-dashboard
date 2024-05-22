import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import UseraTable from 'pages/tables/mui-table/UsersTable';
import MainCard from 'components/MainCard';
import AddNewUserProfile from 'pages/usersProfileView/addNewUser';
// Redux
import { useDispatch } from 'react-redux';

import { getUsers } from 'redux/userRelated/userHandle';
export default function Users() {
  const [newUserOpen, setNewUserOpen] = useState(false);
  const newUserModalOpen = () => setNewUserOpen(true);
  const newUserModalClose = () => setNewUserOpen(false);
  // Fetch Users Data
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <>
      <Box sx={{ padding: 2 }}>
        <Button variant="contained" color="primary" sx={{ padding: 1 }} onClick={newUserModalOpen}>
          Add New User
        </Button>
      </Box>
      <MainCard>
        <UseraTable />
      </MainCard>
      <AddNewUserProfile modalOpen={newUserOpen} modalClose={newUserModalClose} />
    </>
  );
}
