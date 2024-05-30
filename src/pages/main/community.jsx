import { useEffect } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import MainCard from 'components/MainCard';
import PropTypes from 'prop-types';
import CanadaMap from './map/canadaMap';
import MarkersPopups from 'sections/maps/MarkersPopups';
import { countries } from 'data/location';
import { setTabNumber } from 'redux/mapRelated/mapSlice';
// import { countries } from 'data/location';
// Province map
import Error from './map/Error';
import AlberatMap from './map/province/Alberta/Boundary';
import YukonMap from './map/province/Yukon/Boundary';
import NunavutMap from './map/province/Nunavut/Boundary';
import OntarioMap from './map/province/Ontario/Boundary';
import NorthWestMap from './map/province/NorthWest/Boundary';
import BritshMap from './map/province/British/Boundary';
import QuebecMap from './map/province/Qubec/Boundary';
import ManitobaMap from './map/province/Manitoba/Boundary';
// Redux
import { useDispatch, useSelector } from 'react-redux';

import { getCommunity } from 'redux/communityRelated/communityHandle';

// Switch Select Province
function getProvince(index) {
  switch (index) {
    case 'Alberta':
      return <AlberatMap />;
    case 'Yukon':
      return <YukonMap />;
    case 'Nunavut':
      return <NunavutMap />;
    case 'Ontario':
      return <OntarioMap />;
    case 'NWT':
      return <NorthWestMap />;
    case 'BC':
      return <BritshMap />;
    case 'Quebec':
      return <QuebecMap />;
    case 'Manitoba':
      return <ManitobaMap />;
    default:
      return <Error />;
  }
}

export default function Community() {
  // Fetch Users Data
  const dispatch = useDispatch();
  const { communityList } = useSelector((state) => state.community);
  const { search, tabnumber } = useSelector((state) => state.mapFilter);
  useEffect(() => {
    dispatch(getCommunity());
  }, [dispatch]);
  useEffect(() => {
    console.log(communityList);
  });

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
        <MainCard>{getProvince(search)}</MainCard>
      </TabPanel>
      <TabPanel value={tabnumber} index={2}>
        <MainCard>
          <MarkersPopups data={countries} search={search} {...mapConfiguration} />
        </MainCard>
      </TabPanel>
    </>
  );
}
