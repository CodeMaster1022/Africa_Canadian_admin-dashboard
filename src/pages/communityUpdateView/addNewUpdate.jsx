import { Modal, useMediaQuery } from '@mui/material';
import PropTypes, { number } from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import MUIRichTextEditor from 'mui-rte';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// project import
// import ProfileTab from './ProfileTab';
import Avatar from 'components/@extended/Avatar';
import Button from '@mui/material/Button';
import { ThemeMode } from 'config';
// assets

import CameraOutlined from '@ant-design/icons/CameraOutlined';
import userImage from 'assets/images/users/avatar-1.png';

const AddNewUpdate = ({ modalOpen, modalClose }) => {
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [avatar, setAvatar] = useState(userImage);

  const ProfileClose = () => {
    modalClose();
  };
  const [com, setCommunity] = useState('');
  const handleChangeCommunity = (event) => {
    event.preventDefault();
    setCommunity(event.target.value);
  };
  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const isSMScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const modalstyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 24,
    width: isSMScreen ? '90%' : '50%',
    maxHeight: '90vh',
    overflow: 'auto',
    p: isSMScreen ? 2 : 4
  };
  return (
    <>
      <Modal open={modalOpen} onClose={modalClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={modalstyle}>
          <Typography>Add New Update</Typography>
          <Divider />
          <Box sx={{ height: '10px' }} />
          <Divider />
          <Box sx={{ height: '10px' }} />
          <Typography>Cover photo</Typography>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Box>
                <Stack spacing={2.5} alignItems="center">
                  <FormLabel
                    htmlFor="change-avtar"
                    sx={{
                      position: 'relative',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      '&:hover .MuiBox-root': { opacity: 1 },
                      cursor: 'pointer'
                    }}
                  >
                    <Avatar alt="Avatar 1" src={avatar} sx={{ width: 150, height: 150, border: '1px dashed' }} />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        background: theme.palette.mode === ThemeMode.DARK ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Stack spacing={0.5} alignItems="center">
                        <CameraOutlined style={{ color: theme.palette.secondary.lighter, fontSize: '2rem' }} />
                        <Typography sx={{ color: 'secondary.lighter' }}>Upload</Typography>
                      </Stack>
                    </Box>
                  </FormLabel>
                  <TextField
                    type="file"
                    id="change-avtar"
                    placeholder="Outlined"
                    variant="outlined"
                    sx={{ display: 'none' }}
                    onChange={(e) => setSelectedImage(e.target.files?.[0])}
                  />
                </Stack>
              </Box>
            </Grid>
            <>
              <Grid item xs={12}>
                <Grid xs={12}>
                  <Box sx={{ marginTop: '15px', padding: '5px' }}>
                    <Typography sx={{ color: '#8C8C8C' }}>Title</Typography>
                    <TextField sx={{ width: '100%' }} />
                  </Box>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ padding: '5px' }}>
                  <Typography sx={{ color: '#8C8C8C' }}>Community</Typography>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={com}
                      onChange={handleChangeCommunity}
                      placeholder="community"
                    >
                      <MenuItem value={1}>Somalia</MenuItem>
                      <MenuItem value={2}>Somalia</MenuItem>
                      <MenuItem value={3}>Somalia</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid xs={12}>
                <Box sx={{ padding: '10px' }}>
                  <Typography sx={{ color: '#8C8C8C' }}>Body</Typography>
                  <Divider />
                  <Box>
                    <MUIRichTextEditor label="Start typing..." />
                  </Box>
                  <Divider />
                </Box>
              </Grid>
              <Grid xs={12} sx={{ marginTop: '15px' }}>
                <Stack direction="row" justifyContent="flex-end" spacing={2} paddingTop={1}>
                  <Button variant="contained" color="error" onClick={ProfileClose}>
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={ProfileClose}>
                    Save
                  </Button>
                </Stack>
              </Grid>
            </>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};
AddNewUpdate.propTypes = {
  modalOpen: PropTypes.bool,
  id: number,
  modalClose: PropTypes.func
};
export default AddNewUpdate;
