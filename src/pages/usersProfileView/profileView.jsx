import { Modal, useMediaQuery } from '@mui/material';
import PropTypes, { number } from 'prop-types';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
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
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import MoreOutlined from '@ant-design/icons/MoreOutlined';
import CameraOutlined from '@ant-design/icons/CameraOutlined';
import userImage from 'assets/images/users/avatar-1.png';

const ProfileModal = ({ modalOpen, modalClose }) => {
  // Toast Message
  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 5500,
    timerProgressBar: true
  });
  //Password and ConfirmPassword Hide and Hints
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
  // User Avatar
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [avatar, setAvatar] = useState(userImage);
  // When click Edit button, Edit form have to be shown
  const [edit, setEdit] = useState(false);

  const ProfileCancel = () => {
    setEdit(false);
  };
  // Select Community
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
  // When screen has xs, Edit and delete button have to be small
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
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
  // Edit Form Data
  const [input, setInput] = useState({
    fullName: '',
    userName: '',
    email: '',
    phone: '',
    comgroup: '',
    password: '',
    status: ''
  });
  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (
      input.fullName !== '' &&
      input.userName !== '' &&
      input.email !== '' &&
      input.phone !== '' &&
      input.comgroup !== '' &&
      input.password !== '' &&
      input.status !== ''
    ) {
      Toast.fire({
        icon: 'succcess',
        text: 'please enter your all data field',
        title: 'Success!'
      });
    } else {
      Toast.fire({
        icon: 'error',
        position: 'bottom',
        text: 'please enter your all data field',
        title: 'Error!'
      });
    }
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  return (
    <>
      <Modal open={modalOpen} onClose={modalClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={modalstyle}>
          <Typography>User Profile</Typography>
          <Divider />
          <Box sx={{ height: '10px' }} />
          <Divider />
          <Box sx={{ height: '10px' }} />
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {isSMScreen ? (
                <Stack direction="row" justifyContent="flex-end">
                  <IconButton
                    variant="light"
                    color="secondary"
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  >
                    <MoreOutlined />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button'
                    }}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                  >
                    <MenuItem onClick={() => setEdit(true)}>Edit</MenuItem>
                    <MenuItem>Delete</MenuItem>
                  </Menu>
                </Stack>
              ) : (
                <Stack direction="row" justifyContent="flex-end" spacing={2}>
                  {!edit && (
                    <>
                      <Button variant="outlined" onClick={() => setEdit(true)}>
                        <EditOutlined />
                        Edit User
                      </Button>
                    </>
                  )}
                  <Button variant="outlined" color="info">
                    <DeleteOutlined />
                    Delete User
                  </Button>
                </Stack>
              )}
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
            {edit ? (
              <>
                <form onSubmit={handleSubmitEvent} style={{ width: '100%' }}>
                  <Grid container xs={12}>
                    <Grid item xs={6}>
                      <Grid xs={12}>
                        <Box sx={{ marginTop: '15px', padding: '5px' }}>
                          <Typography sx={{ color: '#8C8C8C' }}>Full Name</Typography>
                          <TextField type="text" name="fullName" onChange={handleInput} sx={{ width: '100%' }} />
                        </Box>
                        <Box sx={{ padding: '5px' }}>
                          <Typography sx={{ color: '#8C8C8C' }}>Email Address</Typography>
                          <TextField type="email" name="email" onChange={handleInput} sx={{ width: '100%' }} />
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid xs={12}>
                        <Box sx={{ marginTop: '15px', padding: '5px' }}>
                          <Typography sx={{ color: '#8C8C8C' }}>Username</Typography>
                          <TextField type="text" name="userName" onChange={handleInput} sx={{ width: '100%' }} />
                        </Box>
                        <Box sx={{ padding: '5px' }}>
                          <Typography sx={{ color: '#8C8C8C' }}>Phone Number</Typography>
                          <TextField type="text" name="phone" onChange={handleInput} sx={{ width: '100%' }} />
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
                    <Grid container xs={6}>
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
                    <Grid container xs={6}>
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
                        <Button variant="contained" color="error" onClick={ProfileCancel} type="submit">
                          Cancel
                        </Button>
                        <Button variant="contained" type="submit">
                          Save
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </form>
              </>
            ) : (
              <>
                <Grid item xs={12} sm={6}>
                  <Grid item xs={6}>
                    <Box sx={{ padding: '5px' }}>
                      <Typography sx={{ color: '#8C8C8C' }}>Full Name</Typography>
                      <Typography fontSize={16}>Carson Darrin</Typography>
                    </Box>
                    <Box sx={{ padding: '5px' }}>
                      <Typography sx={{ color: '#8C8C8C' }}>Email Address</Typography>
                      <Typography fontSize={16}>carson.darrin@gmail.com</Typography>
                    </Box>
                    <Box sx={{ padding: '5px' }}>
                      <Typography sx={{ color: '#8C8C8C' }}>Community</Typography>
                      <Typography fontSize={16}>Somalia</Typography>
                    </Box>
                    <Box sx={{ padding: '5px' }}>
                      <Typography sx={{ color: '#8C8C8C' }}>Account Status</Typography>
                      <Typography fontSize={16}>Active</Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Grid item xs={12}>
                    <Box sx={{ padding: '5px' }}>
                      <Typography sx={{ color: '#8C8C8C' }}>Username</Typography>
                      <Typography fontSize={16}>c.darrin</Typography>
                    </Box>
                    <Box sx={{ padding: '5px', width: '100%' }}>
                      <Typography sx={{ color: '#8C8C8C' }}>Phone Number</Typography>
                      <Typography fontSize={16}>+1 34 1234 5678</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </Modal>
    </>
  );
};
ProfileModal.propTypes = {
  modalOpen: PropTypes.bool,
  id: number,
  modalClose: PropTypes.func
};
export default ProfileModal;
