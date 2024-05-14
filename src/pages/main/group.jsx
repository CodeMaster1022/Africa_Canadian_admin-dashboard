import { Box, Grid, Tabs, Typography } from '@mui/material';
import MarketingCardChart from 'sections/dashboard/MarketingCardChart';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import MainCard from 'components/MainCard';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import GroupTable from 'pages/tables/mui-table/groupTable';
import { useDispatch, useSelector } from 'react-redux';
import { getCommunity } from 'redux/communityRelated/communityHandle';
import useAxios from 'utils/useAxios';
// import EnhancedTable from 'pages/tables/mui-table/datatable';
export default function Community() {
  const dispatch = useDispatch();
  const [comData, setComData] = useState([]);
  const { communityList } = useSelector((state) => state.community);
  const axiosInstance = useAxios();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await axiosInstance.get('/communities/').then((res) => {
          setComData(res.data);
        });
      } catch (error) {
        alert(error.res.data);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    dispatch(getCommunity(comData));
  }, [comData, dispatch]);
  useEffect(() => {
    console.log(communityList);
  });

  const [age, setAge] = useState(10);
  const handleChangeAge = (event) => {
    setAge(event.target.value);
  };
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
        <Grid item xs={12} sm={6} marginTop={3}>
          <MainCard>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Typography fontSize={20} fontWeight={700}>
                Stats
              </Typography>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Select labelId="demo-select-small-label" id="demo-select-small" value={age} label="Age" onChange={handleChangeAge}>
                  <MenuItem value={10}>Monthly</MenuItem>
                  <MenuItem value={20}>Yearly</MenuItem>
                  <MenuItem value={30}>Weekly</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                flexDirection: {
                  xs: 'column',
                  md: 'row'
                },
                justifyContent: 'space-between'
              }}
              gap={4}
            >
              <MainCard sx={{ marginTop: '20px', flexGrow: 1 }}>
                <Typography fontSize={15} sx={{ color: 'grey' }}>
                  Growth
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', paddingTop: '5px' }}>
                  <Typography fontSize={25} fontWeight={700}>
                    4,658
                  </Typography>
                  <Box
                    sx={{
                      borderRadius: '10px',
                      textAlign: 'center',
                      marginLeft: '15px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Typography fontSize={10} sx={{ backgroundColor: '#17BB84', borderRadius: '10px', padding: '4px', color: 'white' }}>
                      +6.9%
                    </Typography>
                  </Box>
                </Box>
              </MainCard>
              <MainCard sx={{ marginTop: '20px', flexGrow: 1 }}>
                <Typography fontSize={15} sx={{ color: 'grey' }}>
                  New Users/Groups
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', paddingTop: '5px' }}>
                  <Typography fontSize={25} fontWeight={700}>
                    43.41%
                  </Typography>
                  <Box
                    sx={{
                      borderRadius: '10px',
                      textAlign: 'center',
                      marginLeft: '15px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Typography fontSize={10} sx={{ backgroundColor: '#17BB84', borderRadius: '10px', padding: '4px', color: 'white' }}>
                      95,422
                    </Typography>
                  </Box>
                </Box>
              </MainCard>
            </Box>
            <Box sx={{ marginTop: '10px' }}>
              <MarketingCardChart />
            </Box>
          </MainCard>
          <MainCard>
            <GroupTable />
          </MainCard>
        </Grid>
      </TabPanel>
    </>
  );
}
