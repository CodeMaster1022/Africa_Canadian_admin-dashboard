import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Tabs, Tab } from '@mui/material';
import MainCard from 'components/MainCard';
import PropTypes from 'prop-types';
import CanadaMap from './map/canadaMap';
import MarkersPopups from 'sections/maps/MarkersPopups';
import { countries } from 'data/location';
import { setTabNumber } from 'redux/mapRelated/mapSlice';

// Province map
import AlbertaMap from './map/province/Alberta/Alberta';
// Redux
import { useDispatch, useSelector } from 'react-redux';

import { getCommunity } from 'redux/communityRelated/communityHandle';

export default function Community() {
  // Fetch Users Data
  const dispatch = useDispatch();
  const { search, tabnumber } = useSelector((state) => state.mapFilter);
  const [jsonData, setJsonData] = useState({});
  const query = 'Alberta';
  useEffect(() => {
    dispatch(getCommunity());
  }, [dispatch]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (search === '') {
          const response = await axios.get(`/dataSet/${query}.json`);
          setJsonData(response.data);
        } else {
          const response = await axios.get(`/dataSet/${search}.json`);
          setJsonData(response.data);
        }
      } catch (error) {
        console.error('error fetch Data', error);
      }
    };
    fetchData();
  }, [search]);
  useEffect(() => {
    console.log('search is changed', search);
  }, [search]);
  useEffect(() => {
    console.log('123------------------------->', jsonData, search);
  }, [jsonData, search]);

  const mapConfiguration = {
    mapboxAccessToken: import.meta.env.VITE_APP_MAPBOX_ACCESS_TOKEN,
    minZoom: 1
  };
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
        <MainCard>
          <Box>
            <CanadaMap />
          </Box>
        </MainCard>
      </TabPanel>
      <TabPanel value={tabnumber} index={1}>
        {search === 'Alberta' && <AlbertaMap regionName={jsonData} regionFlag={query} />}
        {search !== 'Alberta' && search !== '' && Object.keys(jsonData).length > 0 && (
          <AlbertaMap regionName={jsonData} regionFlag={search} />
        )}
      </TabPanel>
      <TabPanel value={tabnumber} index={2}>
        <MainCard>
          <MarkersPopups data={countries} search={search} {...mapConfiguration} />
        </MainCard>
      </TabPanel>
    </>
  );
}
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       if (index) {
//         const response = await axios.get(`../main/map/province/dataSet/${index}.json`);
//       } else {
//         const response = await axios.get(`../main/map/province/dataSet/Alberta.json`);
//       }
//       setJsonData(response.data);
//     } catch (error) {
//       console.error('error fetch Data', error);
//     }
//   };
//   fetchData();
// }, []);
