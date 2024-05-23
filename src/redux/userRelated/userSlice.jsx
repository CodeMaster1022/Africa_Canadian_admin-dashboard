import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
  usersList: [],
  userDetail: [],
  loading: false,
  error: null,
  response: null,
  getresponse: null,
  tempDetails: []
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
    },
    userAdded: (state, action) => {
      state.status = 'added';
      state.response = null;
      state.error = null;
      state.tempDetails = action.payload;
    },
    authFailed: (state, action) => {
      state.status = 'failed';
      state.response = action.payload;
    },
    authError: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    },
    getDeleteSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.response = null;
    }
  }
});

export const {
  getRequest,
  userAdded,
  authFailed,
  getUsersSuccess,
  getUserDetailedSuccess,
  getUsersFailed,
  getUsersDetailedFailed,
  getError,
  getDeleteSuccess,
  authError
} = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
