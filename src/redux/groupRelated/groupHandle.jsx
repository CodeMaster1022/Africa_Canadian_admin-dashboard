import useAxios from 'utils/useAxios';
import { getRequest, getGroupSuccess, getMembersSuccess, getGroupDetails, getMemberDetails, getFailedTwo, getError } from './groupSlice';

export const getGroup = () => async (dispatch) => {
  const axiosInstance = useAxios();
  dispatch(getRequest());
  try {
    const result = await axiosInstance.get('/admin/communities/2/groups/');
    if (result.data.data.message) {
      dispatch(getFailedTwo(result.data.data.message));
    } else {
      dispatch(getGroupSuccess(result.data.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};
export const communityDetails = (id) => async (dispatch) => {
  const axiosInstance = useAxios();
  dispatch(getRequest());
  try {
    const result = await axiosInstance.get(`/commuities/${id}`);
    if (result.data.message) {
      dispatch(getFailedTwo(result.data.message));
    } else {
      dispatch(getCommunityDetails(result.data));
    }
  } catch {
    dispatch(getError(error));
  }
};
export const getMembers = (id, address) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axiosInstance.get(`/commuities/${id}/${address}`);
    if (result.data.message) {
      dispatch(getFailedTwo(result.message));
    } else {
      dispatch(getMemberSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};
export const getMembersDetails = (id, address, memberID) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axiosInstance.get(`/commuities/${id}/${address}/${memberID}`);
    if (result.data.message) {
      dispatch(getFailedTwo(result.message));
    } else {
      dispatch(getMemberDetails(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};
