import useAxios from 'utils/useAxios';
import { getRequest, getStatusSuccess, getStatusDetailedSuccess, getStatusFailed, getStatusDetailedFailed, getError } from './statusSlice';
import Swal from 'sweetalert2';
const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true
});
export const getStatus = () => async (dispatch) => {
  const axiosInstance = useAxios();
  dispatch(getRequest());

  try {
    const result = await axiosInstance.get('/posts/posts/status/');
    console.log(result);
    if (result.data) {
      dispatch(getStatusSuccess(result.data.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};
export const createStatus =
  ({ image, title, description, group, video, user, documnet }) =>
  async (dispatch) => {
    const axiosInstance = useAxios();
    console.log({ image, title, description, group, video, user, documnet });
    dispatch(getRequest());
    try {
      const result = await axiosInstance.post('/posts/posts/status/', { image, title, description, group, video, user, documnet });
      if (result.data.data) {
        Toast.fire({
          icon: 'success',
          position: 'center',
          text: `${result.data.message}`,
          title: 'Success!'
        });
      }
    } catch (error) {
      Toast.fire({
        icon: 'error',
        position: 'center',
        text: `${error.message}`,
        title: 'Error!'
      });
    }
  };
export const updateStatus =
  ({ input, id }) =>
  async (dispatch) => {
    const axiosInstance = useAxios();
    dispatch(getRequest());
    try {
      const result = await axiosInstance.put(`/posts/posts/status/${id}/`, input);
      if (result.data.data) {
        Toast.fire({
          icon: 'success',
          position: 'center',
          text: `${result.data.message}`,
          title: 'Success!'
        });
      }
    } catch (error) {
      Toast.fire({
        icon: 'error',
        position: 'center',
        text: `${error.message}`,
        title: 'Error!'
      });
    }
  };
export const deleteStatus = (id) => async (dispatch) => {
  const axiosInstance = useAxios();
  dispatch(getRequest());
  try {
    const result = await axiosInstance.delete(`/posts/posts/status/${id}/`);
    if (result.data.data) {
      Toast.fire({
        icon: 'success',
        position: 'center',
        text: `${result.data.message}`,
        title: 'Success!'
      });
    }
  } catch (error) {
    Toast.fire({
      icon: 'error',
      position: 'center',
      text: `${error.message}`,
      title: 'Error!'
    });
  }
};
export const getStatusByUser = (id) => async (dispatch) => {
  const axiosInstance = useAxios();
  dispatch(getRequest());

  try {
    const result = await axiosInstance.get(`/posts/posts/status/${id}`);
    console.log(result);
    if (result.data) {
      dispatch(getStatusDetailedSuccess(result.data.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};
