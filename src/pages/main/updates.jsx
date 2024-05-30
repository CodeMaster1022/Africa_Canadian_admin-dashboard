import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import UpdatesTable from 'pages/tables/mui-table/updatesTable';
import MainCard from 'components/MainCard';
import AddNewUpdate from 'pages/communityUpdateView/addNewUpdate';
// Redux
import { useDispatch } from 'react-redux';
import { getPlaces } from 'redux/placesRelated/placesHandle';
import { getResource } from 'redux/resourceRelated/resourceHandle';
import { getStatus } from 'redux/statusRelated/statusHandle';
export default function Users() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPlaces());
    dispatch(getResource());
    dispatch(getStatus());
  }, [dispatch]);
  const [newUpdateOpen, setNewUpdateOpen] = useState(false);
  const newUpdateModalOpen = () => setNewUpdateOpen(true);
  const newUpdateModalClose = () => setNewUpdateOpen(false);

  return (
    <>
      <Box sx={{ padding: 2 }}>
        <Button variant="contained" color="primary" sx={{ padding: 1 }} onClick={newUpdateModalOpen}>
          Create New Update
        </Button>
      </Box>
      <MainCard>
        <UpdatesTable />
      </MainCard>
      <AddNewUpdate modalOpen={newUpdateOpen} modalClose={newUpdateModalClose} />
    </>
  );
}
