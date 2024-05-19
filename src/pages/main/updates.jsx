import { useState } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import UpdatesTable from 'pages/tables/mui-table/updates';
import MainCard from 'components/MainCard';
import AddNewUpdate from 'pages/communityUpdateView/addNewUpdate';

export default function Users() {
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
