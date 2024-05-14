import { Box } from '@mui/material';
import MainCard from 'components/MainCard';
// import CommunityMap from 'components/CommunityMap';
import CanadaMap from './map/canadaMap';
export default function Community() {
  return (
    <>
      <MainCard>
        <Box sx={{ padding: 2 }}>
          {/* <CommunityMap /> */}
          <CanadaMap />
        </Box>
      </MainCard>
    </>
  );
}
