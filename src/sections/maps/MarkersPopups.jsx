import PropTypes from 'prop-types';
import { useState, memo } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
// third-party
import { Map } from 'react-map-gl';

// project-import
import MapControl from 'components/third-party/map/MapControl';
import MapMarker from 'components/third-party/map/MapMarker';
import MapPopup from 'components/third-party/map/MapPopup';
import { CalendarOutlined, ContactsOutlined, CheckOutlined, ExportOutlined, EnvironmentOutlined } from '@ant-design/icons';

// ==============================|| MAPBOX - MARKERS AND POPUP ||============================== //

function MarkersPopups({ search, data, ...other }) {
  const [popupInfo, setPopupInfo] = useState(null);
  return (
    <Map
      initialViewState={{
        latitude: 56.1304,
        longitude: -106.3468,
        zoom: 3.5
      }}
      {...other}
    >
      <MapControl />
      {data
        .filter((city) => city.province === search)
        .map(
          (city, index) => (
            // search === city.province && (
            <MapMarker
              key={`marker-${index}`}
              latitude={city.latlng[0]}
              longitude={city.latlng[1]}
              onClick={(event) => {
                event.originalEvent.stopPropagation();
                setPopupInfo(city);
              }}
            />
          )
          // )
        )}

      {popupInfo && (
        <MapPopup latitude={popupInfo.latlng[0]} longitude={popupInfo.latlng[1]} onClose={() => setPopupInfo(null)}>
          <Box
            sx={{
              mb: 1,
              width: '500px',
              display: 'flex',
              alignItems: 'left'
            }}
          ></Box>
          <Box>
            <img
              src={popupInfo.image}
              style={{ width: '100%', height: '200px', backgroundSize: 'cover', backgroundPosition: 'center' }}
              alt="hello"
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Typography variant="h3">{popupInfo.name}</Typography>
            <Box sx={{ backgroundColor: 'blue', borderRadius: '50px', paddingX: '5px', marginLeft: '20px' }}>
              <CheckOutlined style={{ color: 'white' }} />
            </Box>
          </Box>
          <Stack direction="row" alignItems="center" spacing={1} paddingTop={0.5}>
            <Typography variant="h4" color={'grey'}>
              {popupInfo.nickName}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1} paddingTop={0.5}>
            <CalendarOutlined />
            <Typography variant="h5" sx={{ marginTop: '5px' }}>
              {popupInfo.joined}
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1} paddingTop={0.5}>
            <ContactsOutlined />
            <Typography variant="h5">{popupInfo.country}</Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1} paddingTop={0.5}>
            <EnvironmentOutlined />
            <Typography variant="h5">{popupInfo.code}</Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1} paddingTop={0.5}>
            <Button variant="outlined" fullWidth color="info">
              View Detail
              <ExportOutlined style={{ marginLeft: '30px' }} />
            </Button>
          </Stack>
        </MapPopup>
      )}
    </Map>
  );
}

export default memo(MarkersPopups);

MarkersPopups.propTypes = { data: PropTypes.array, search: PropTypes.string, other: PropTypes.any };
