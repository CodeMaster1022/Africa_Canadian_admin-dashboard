import { useState, useEffect } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import MainCard from 'components/MainCard';
import PropTypes from 'prop-types';
import CanadaMap from './map/canadaMap';
import MarkersPopups from 'sections/maps/MarkersPopups';
import { useLoadScript } from '@react-google-maps/api';
// import { countries } from 'data/location';
import { setTabNumber } from 'redux/mapRelated/mapSlice';
import { Typography } from '@mui/material';
import { countries } from 'data/location';
import AlberatMap from './map/province/Boundary';
const libraries = ['places'];
// Redux
import { useDispatch, useSelector } from 'react-redux';
import useAxios from 'utils/useAxios';
import { getCommunity } from 'redux/communityRelated/communityHandle';

export default function Community() {
  // Fetch Users Data
  const dispatch = useDispatch();
  const [communityData, setCommunityData] = useState([]);
  const { communityList } = useSelector((state) => state.community);
  const axiosInstance = useAxios();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await axiosInstance.get('/admin/communities/').then((res) => {
          setCommunityData(res.data.data);
        });
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    dispatch(getCommunity(communityData));
  }, [communityData, dispatch]);
  useEffect(() => {
    console.log(communityList);
  });
  // eslint-disable-next-line no-unused-vars
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCLFuQW4ZE_EHv4d90HJvj4tGwgEodiEXE',
    libraries
  });

  const { search, tabnumber } = useSelector((state) => state.mapFilter);
  const Tab_Titles = ['Province', 'Boundary', 'Map'];
  const handleChange = (event, newValue) => {
    dispatch(setTabNumber(newValue));
  };
  const a11yProps = (index) => {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`
    };
  };
  const TabPanel = ({ value, index, children }) => {
    return (
      <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`}>
        {value === index && <div>{children}</div>}
      </div>
    );
  };
  TabPanel.propTypes = {
    value: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired
  };
  return (
    <>
      <Tabs value={tabnumber} onChange={handleChange} variant="scrollable" scrollButtons="auto">
        {Tab_Titles.map((Tab_Title, index) => (
          <Tab
            key={index}
            label={Tab_Title}
            {...a11yProps(index)}
            sx={{
              color: (theme) => (theme.palette.mode === 'dark' ? '#008080' : '#7E8487'), // Default color
              '&.Mui-selected': {
                color: (theme) => (theme.palette.mode === 'dark' ? '#ffab00' : '#008080') // Color for active tab
              },
              flexGrow: 0, // Make the tab title stretch
              textAlign: 'center' // Center the text
            }}
          />
        ))}
      </Tabs>
      <TabPanel value={tabnumber} index={0}>
        <MainCard sx={{ height: '90vh' }}>
          <Box>
            <CanadaMap />
          </Box>
        </MainCard>
      </TabPanel>
      <TabPanel value={tabnumber} index={1}>
        <MainCard>
          <AlberatMap />
        </MainCard>
      </TabPanel>
      <TabPanel value={tabnumber} index={2}>
        <MainCard>
          <MarkersPopups data={countries} search={search} />
        </MainCard>
      </TabPanel>
    </>
  );
}
