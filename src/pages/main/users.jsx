import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import UseraTable from 'pages/tables/mui-table/UsersTable';
import MainCard from 'components/MainCard';
import AddNewUserProfile from 'pages/usersProfileView/addNewUser';
// Redux
import { useDispatch, useSelector } from 'react-redux';

import { getUsers } from 'redux/userRelated/userHandle';
export default function Users() {
  const { loading } = useSelector((state) => state.users);
  const [newUserOpen, setNewUserOpen] = useState(false);
  const newUserModalOpen = () => setNewUserOpen(true);
  const newUserModalClose = () => setNewUserOpen(false);
  // Fetch Users Data
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('dispatch======================>');
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <>
      <Box sx={{ padding: 2 }}>
        <Button variant="contained" color="primary" sx={{ padding: 1 }} onClick={newUserModalOpen}>
          Add New User
        </Button>
      </Box>
      <MainCard>{loading ? <h2>loading...</h2> : <UseraTable />}</MainCard>
      <AddNewUserProfile modalOpen={newUserOpen} modalClose={newUserModalClose} />
    </>
  );
}
