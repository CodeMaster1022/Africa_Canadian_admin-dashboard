import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobsList: [],
  jobsDetails: [],
  total_count: 0,
  has_more: false,
  tablePage: 1,
  items_per_page: 10,
  loading: false,
  subloading: false,
  error: 'This is error',
  response: null,
  getresponse: null
};

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    getPaginationState: (state, action) => {
      state.tablePage = action.payload.page;
      state.total_count = action.payload.total_count;
      state.has_more = action.payload.has_more;
      state.items_per_page = action.payload.items_per_page;
    },
    getRequest: (state) => {
      state.loading = true;
      state.memberLoading = true;
    },
    getjobstSuccess: (state, action) => {
      state.jobsList = action.payload;
      state.loading = false;
      state.error = false;
      state.getresponse = null;
    },
    getjobsDetailSuccess: (state, action) => {
      state.eventDetails = action.payload;
      loading = false;
    },
    getMembersSuccess: (state, action) => {
      state.groupMembers = action.payload;
      state.loading = false;
      state.error = null;
      state.getresponse = null;
      state.memberLoading = false;
    },
    getGroupDetails: (state, action) => {
      state.communityDetails = action.payload;
      state.loading = false;
      state.error = null;
    },
    getMemberDetails: (state, action) => {
      state.memberDetails = action.payload;
      state.loading = false;
      state.error = null;
    },
    getActivateSuccess: (state, action) => {
      state.response = action.payload;
    },
    getFailedTwo: (state, action) => {
      state.getresponse = action.payload;
      state.loading = false;
      state.error = null;
    },
    getError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  getRequest,
  getActivateSuccess,
  getjobsSuccess,
  getMembersSuccess,
  getGroupDetails,
  getMemberDetails,
  getPaginationState,
  getFailedTwo,
  getError,
  getjobsDetailSuccess
} = groupSlice.actions;

export const groupReducer = groupSlice.reducer;
