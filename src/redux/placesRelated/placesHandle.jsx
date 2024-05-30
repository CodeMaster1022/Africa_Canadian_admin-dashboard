import useAxios from 'utils/useAxios';
import { getRequest, getPlacesSuccess, getPlacesDetailedSuccess, getPlacesFailed, getPlacesDetailedFailed, getError } from './placesSlice';

export const getPlaces = () => async (dispatch) => {
  const axiosInstance = useAxios();
  dispatch(getRequest());

  try {
    const result = await axiosInstance.get('/posts/posts/places');
    if (result.data.data) {
      dispatch(getPlacesSuccess(result.data.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};
export const placesDetails = (id) => async (dispatch) => {
  const axiosInstance = useAxios();
  dispatch(getRequest());
  try {
    const result = await axiosInstance.get(`posts/posts/places/${id}`);
    if (result.data.message) {
      dispatch(getPlacesDetailedFailed(result.data.message));
    } else {
      dispatch(getPlacesDetailedSuccess(result.data));
    }
  } catch {
    dispatch(getError(error));
  }
};
