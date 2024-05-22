import useAxios from 'utils/useAxios';
import { getRequest, getUsersSuccess, getUserDetailedSuccess, getUsersFailed, getUsersDetailedFailed, getError } from './userSlice';

export const getUsers = () => async (dispatch) => {
  const axiosInstance = useAxios();
  dispatch(getRequest());
  try {
    const result = await axiosInstance.get('/users/users');
    if (result.data.data.message) {
      dispatch(getUsersFailed(result.data.data.message));
    } else {
      dispatch(getUsersSuccess(result.data.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};
// export const addUser = (fields) => async (dispatch) => {
//   const axiosInstance = useAxios();
//   dispatch(getRequest)
//   try {
//     const result = await axiosInstance.post()
//   } catch (error) {

//   }
// }
//   const axiosInstance = useAxios();

//   // dispatch(getRequest());
//   // dispatch(getCommunitySuccess(data));
//   try {
//     const result = await axiosInstance.get('/admin/communities/');
//     if (result.data.data.message) {
//       dispatch(getFailedTwo(result.data.data.message));
//     } else {
//       dispatch(getCommunitySuccess(result.data.data));
//     }
//   } catch (error) {
//     dispatch(getError(error));
//   }
// };
