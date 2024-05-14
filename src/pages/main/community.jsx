import { Box, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import MainCard from 'components/MainCard';
import PropTypes from 'prop-types';
import CanadaMap from './map/canadaMap';
import MapContainerStyled from 'components/third-party/maps/MapContainerStyled';
import ClustersMap from 'sections/maps/clusters-map';

const MAPBOX_THEMES = {
  light: 'mapbox://styles/mapbox/light-v10',
  dark: 'mapbox://styles/mapbox/dark-v10',
  streets: 'mapbox://styles/mapbox/streets-v11',
  outdoors: 'mapbox://styles/mapbox/outdoors-v11',
  satellite: 'mapbox://styles/mapbox/satellite-v9',
  satelliteStreets: 'mapbox://styles/mapbox/satellite-streets-v11'
};

const mapConfiguration = {
  mapboxAccessToken: import.meta.env.VITE_APP_MAPBOX_ACCESS_TOKEN,
  minZoom: 1
};

export default function Community() {
  const Tab_Titles = ['Stats', 'Map'];
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
      <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto">
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
      <TabPanel value={value} index={0}>
        <MainCard>
          <Box sx={{ padding: 2 }}>
            {/* <CommunityMap /> */}
            <CanadaMap />
            {/* <CanadaState /> */}
          </Box>
        </MainCard>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MainCard title="Clusters">
          <MapContainerStyled>
            <ClustersMap
              {...mapConfiguration}
              // mapStyle={theme.palette.mode === ThemeMode.DARK ? MAPBOX_THEMES.dark : MAPBOX_THEMES.light}
              mapStyle={MAPBOX_THEMES.light}
            />
          </MapContainerStyled>
        </MainCard>
      </TabPanel>
    </>
  );
}
