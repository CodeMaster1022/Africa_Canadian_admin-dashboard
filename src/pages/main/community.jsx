import { Box, Tabs, Tab } from '@mui/material';
import MainCard from 'components/MainCard';
import PropTypes from 'prop-types';
import CanadaMap from './map/canadaMap';
import MarkersPopups from 'sections/maps/MarkersPopups';
import { useLoadScript } from '@react-google-maps/api';
// import { countries } from 'data/location';
import { useSelector, useDispatch } from 'react-redux';
import { setTabNumber } from 'redux/mapRelated/mapSlice';
import { Typography } from '@mui/material';
import { countries } from 'data/location';
const libraries = ['places'];
export default function Community() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCLFuQW4ZE_EHv4d90HJvj4tGwgEodiEXE',
    libraries
  });

  const { search, tabnumber } = useSelector((state) => state.mapFilter);
  const dispatch = useDispatch();
  const Tab_Titles = ['Stats', 'Map'];
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
          <Box sx={{ padding: 2 }}>
            <CanadaMap />
          </Box>
        </MainCard>
      </TabPanel>
      <TabPanel value={tabnumber} index={1}>
        <MainCard title="Canaadian">
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography fontSize={20}>{search}</Typography>
          </Box>
          <MarkersPopups data={countries} search={search} />
        </MainCard>
      </TabPanel>
    </>
  );
}
