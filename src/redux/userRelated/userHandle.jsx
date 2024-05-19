import { getRequest, getUsersSuccess, getUserDetailedSuccess, getUsersFailed, getUsersDetailedFailed, getError } from './userSlice';
export const getUsers = (data) => async (dispatch) => {
  dispatch(getRequest());
  dispatch(getUsersSuccess(data));
};
