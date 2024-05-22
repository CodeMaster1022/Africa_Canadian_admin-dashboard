import { Modal, useMediaQuery } from '@mui/material';
import PropTypes, { number } from 'prop-types';
import { useEffect, useState } from 'react';
// material-ui
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
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
// project import
// import ProfileTab from './ProfileTab';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import Button from '@mui/material/Button';
import { ThemeMode } from 'config';
// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import CameraOutlined from '@ant-design/icons/CameraOutlined';
import userImage from 'assets/images/users/avatar-1.png';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getCommunity } from 'redux/communityRelated/communityHandle';
const AddNewUserProfile = ({ modalOpen, modalClose }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCommunity());
  }, [dispatch]);
  const { communityList } = useSelector((state) => state.community);
  useEffect(() => console.log(communityList));
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  });
  const [confirmValues, setConfirmValues] = useState({
    password: '',
    showPassword: false
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleConfirmChange = (prop) => (event) => {
    setConfirmValues({ ...confirmValues, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    });
  };
  const handleConfirmClickShowPassword = () => {
    setConfirmValues({
      ...confirmValues,
      showPassword: !confirmValues.showPassword
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
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
          <Typography>Add New User</Typography>
          <Divider />
          <Box sx={{ height: '10px' }} />
          <Divider />
          <Box sx={{ height: '10px' }} />
          <Typography>User Photo</Typography>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Box sx={{ width: '200px' }}>
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
              <Grid item xs={6}>
                <Grid item xs={12}>
                  <Box sx={{ marginTop: '15px', padding: '5px' }}>
                    <Typography sx={{ color: '#8C8C8C' }}>Full Name</Typography>
                    <TextField sx={{ width: '100%' }} />
                  </Box>
                  <Box sx={{ padding: '5px' }}>
                    <Typography sx={{ color: '#8C8C8C' }}>Email Address</Typography>
                    <TextField sx={{ width: '100%' }} />
                  </Box>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid item xs={12}>
                  <Box sx={{ marginTop: '15px', padding: '5px' }}>
                    <Typography sx={{ color: '#8C8C8C' }}>Last Name</Typography>
                    <TextField sx={{ width: '100%' }} />
                  </Box>
                  <Box sx={{ padding: '5px' }}>
                    <Typography sx={{ color: '#8C8C8C' }}>Phone Number</Typography>
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
                      {communityList?.map((com, index) => (
                        <MenuItem key={index} value={index + 1}>
                          {com.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Grid item xs={12}>
                  <Box sx={{ padding: '5px' }}>
                    <Typography sx={{ color: '#8C8C8C' }}>Password</Typography>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={values.showPassword ? 'text' : 'password'}
                      value={values.password}
                      onChange={handleChange('password')}
                      sx={{ width: '100%' }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            color="secondary"
                          >
                            {values.showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid item xs={12}>
                  <Box sx={{ padding: '5px' }}>
                    <Typography sx={{ color: '#8C8C8C' }}>Confirm Password</Typography>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={confirmValues.showPassword ? 'text' : 'password'}
                      value={confirmValues.password}
                      onChange={handleConfirmChange('password')}
                      sx={{ width: '100%' }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleConfirmClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            color="secondary"
                          >
                            {confirmValues.showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ padding: '5px' }}>
                  <Typography sx={{ color: '#8C8C8C' }}>Account Status</Typography>
                  <TextField sx={{ width: '100%' }} />
                </Box>
              </Grid>
              <Grid item xs={12}>
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
AddNewUserProfile.propTypes = {
  modalOpen: PropTypes.bool,
  id: number,
  modalClose: PropTypes.func
};
export default AddNewUserProfile;
