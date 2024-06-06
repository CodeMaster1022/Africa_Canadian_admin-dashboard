import { useEffect } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import MainCard from 'components/MainCard';
import PropTypes from 'prop-types';
import CanadaMap from './map/canadaMap';
import MarkersPopups from 'sections/maps/MarkersPopups';
import { countries } from 'data/location';
import { setTabNumber } from 'redux/mapRelated/mapSlice';
// data set
import sask from '../main/map/province/dataSet/Sask.json';
import alberta from '../main/map/province/dataSet/alberta.json';
import ontario from '../main/map/province/dataSet/Ontario.json';
import manitoba from '../main/map/province/dataSet/Manitoba.json';
import britishColombia from '../main/map/province/dataSet/BritishColombia.json';
import yukon from '../main/map/province/dataSet/Yukon.json';
import northWest from '../main/map/province/dataSet/NorthWest.json';
// import caleton from '../main/map/province/dataSet/Caleton.json';
import quebec from '../main/map/province/dataSet/Quebec.json';
// import nunavut from '../main/map/province/dataSet/Nunavut.json';
import nobascotia from '../main/map/province/dataSet/NovaScotia.json';
// import { countries } from 'data/location';
// Province map
import Error from './map/Error';
import AlbertaMap from './map/province/Alberta/Alberta';
// import YukonMap from './map/province/Yukon/Boundary';
// import NunavutMap from './map/province/Nunavut/Boundary';
// import OntarioMap from './map/province/Ontario/Boundary';
// import NorthWestMap from './map/province/NorthWest/Boundary';
// import BritshMap from './map/province/British/Boundary';
// import QuebecMap from './map/province/Qubec/Boundary';
// import ManitobaMap from './map/province/Manitoba/Boundary';
// Redux
import { useDispatch, useSelector } from 'react-redux';

import { getCommunity } from 'redux/communityRelated/communityHandle';

// Switch Select Province
function getProvince(index) {
  switch (index) {
    case 'Alberta':
      return <AlbertaMap regionName={alberta} regionFlag="alberta" />;
    case 'Sask':
      return <AlbertaMap regionName={sask} regionFlag="Sask" />;
    case 'Yukon':
      return <AlbertaMap regionName={yukon} regionFlag="Yukon" />;
    // case 'Nunavut':
    // return <AlbertaMap regionName={nunavut} regionFlag="Nunavut" />;
    case 'Ontario':
      return <AlbertaMap regionName={ontario} regionFlag="Ontario" />;
    case 'NWT':
      return <AlbertaMap regionName={northWest} regionFlag="NorthWest" />;
    case 'BC':
      return <AlbertaMap regionName={britishColombia} regionFlag="BritishColombia" />;
    case 'Quebec':
      return <AlbertaMap regionName={quebec} regionFlag="Quebec" />;
    case 'Manitoba':
      return <AlbertaMap regionName={manitoba} regionFlag="Manitoba" />;
    case 'NFL_L':
      return <AlbertaMap regionName={nobascotia} regionFlag="NovaScotia" />;
    default:
      return <Error />;
  }
}

export default function Community() {
  // Fetch Users Data
  const dispatch = useDispatch();
  const { search, tabnumber } = useSelector((state) => state.mapFilter);
  useEffect(() => {
    dispatch(getCommunity());
  }, [dispatch]);

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
        {getProvince(search)}
      </TabPanel>
      <TabPanel value={tabnumber} index={2}>
        <MainCard>
          <MarkersPopups data={countries} search={search} {...mapConfiguration} />
        </MainCard>
      </TabPanel>
    </>
  );
}
