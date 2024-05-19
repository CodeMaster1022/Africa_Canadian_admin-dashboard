import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  usersList: [],
  userDetail: [],
  loading: false,
  error: null,
  response: null,
  getresponse: null
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true;
    },
    getUsersSuccess: (state, action) => {
      state.usersList = action.payload;
      state.loading = false;
      state.error = false;
      state.getresponse = null;
    },
    getUserDetailedSuccess: (state, action) => {
      state.updatesDetail = action.payload;
      state.loading = false;
      state.error = false;
      state.getresponse = null;
    },
    getUsersFailed: (state, action) => {
      state.updatesList = [];
      state.updatesDetail = [];
      state.error = action.payload;
      state.loading = false;
      state.getresponse = false;
    },
    getUsersDetailedFailed: (state, action) => {
      state.updatesDetail = [];
      state.loading = false;
      state.error = action.payload;
      state.getresponse = false;
    },
    getError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { getRequest, getUsersSuccess, getUserDetailedSuccess, getUsersFailed, getUsersDetailedFailed, getError } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
