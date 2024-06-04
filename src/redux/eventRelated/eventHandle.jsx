import useAxios from 'utils/useAxios';
import Swal from 'sweetalert2';
import { getRequest, getEventSuccess, getPaginationState, getFailedTwo, getEventDetailSuccess, getError } from './eventSlice';
const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true
});

export const eventCreate =
  ({ id, input }) =>
  async () => {
    const axiosInstance = useAxios();
    try {
      const result = await axiosInstance.post(`/admin/events/${id}/`, input);
      console.log(result.data.message);
      if (result) {
        Toast.fire({
          icon: 'success',
          position: 'center',
          text: `${result.data.message}`,
          title: 'Success!'
        });
      }
    } catch (error) {
      console.log(error);
      Toast.fire({
        icon: 'error',
        position: 'center',
        text: `${error.message}`,
        title: 'Error!'
      });
    }
  };
export const getAllEvent = () => async (dispatch) => {
  const axiosInstance = useAxios();
  dispatch(getRequest());
  try {
    const result = await axiosInstance.get('/admin/events/');
    if (result.data.data.message) {
      dispatch(getFailedTwo(result.data.data.message));
    } else {
      dispatch(getEventSuccess(result.data.data));
      dispatch(getPaginationState(result.data));
    }
  } catch (error) {
    dispatch(getError(error.data));
  }
};
export const getEventById = (id) => async (dispatch) => {
  const axiosInstance = useAxios();
  dispatch(getRequest());
  try {
    const result = await axiosInstance.post(`/admin/events/${id}/`);
    if (result.data) {
      dispatch(getEventDetailSuccess(result.data.data));
    }
  } catch (error) {
    dispatch(getError(error.data));
  }
};
export const getEventByUserId = (id) => async (dispatch) => {
  dispatch(getRequest());
  const axiosInstance = useAxios();
  try {
    const result = await axiosInstance.post('/admin/events/', {
      params: {
        user_id: id
      }
    });
    if (result.data) {
      dispatch(getEventDetailSuccess(result.data.data));
    }
  } catch (error) {
    dispatch(getError(error.data));
  }
};
export const getEventByCommunityId = (id) => async (dispatch) => {
  dispatch(getRequest());
  const axiosInstance = useAxios();
  try {
    const result = await axiosInstance.post('/admin/events/', {
      params: {
        community: id
      }
    });
    if (result.data) {
      dispatch(getEventDetailSuccess(result.data.data));
    }
  } catch (error) {
    dispatch(getError(error.data));
  }
};
export const eventUpdate =
  ({ id, input }) =>
  async () => {
    const axiosInstance = useAxios();
    try {
      const result = await axiosInstance.patch(`/admin/events/${id}/`, input);
      console.log(result.data.message);
      if (result) {
        Toast.fire({
          icon: 'success',
          position: 'center',
          text: `${result.data.message}`,
          title: 'Success!'
        });
      }
    } catch (error) {
      console.log(error);
      Toast.fire({
        icon: 'error',
        position: 'center',
        text: `${error.message}`,
        title: 'Error!'
      });
    }
  };
export const eventDelete = (id) => async () => {
  const axiosInstance = useAxios();
  try {
    const result = await axiosInstance.delete(`/admin/events/${id}/`);
    console.log(result.data.message);
    if (result) {
      Toast.fire({
        icon: 'success',
        position: 'center',
        text: `${result.data.message}`,
        title: 'Success!'
      });
    }
  } catch (error) {
    console.log(error);
    Toast.fire({
      icon: 'error',
      position: 'center',
      text: `${error.message}`,
      title: 'Error!'
    });
  }
};
