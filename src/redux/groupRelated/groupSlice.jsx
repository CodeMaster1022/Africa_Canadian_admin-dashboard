import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  groupList: [],
  groupMembers: [],
  groupDetails: [],
  memberDetails: [],
  // subjectDetails: [],
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
    getRequest: (state) => {
      state.loading = true;
    },
    getGroupSuccess: (state, action) => {
      state.groupList = action.payload;
      state.loading = false;
      state.error = false;
      state.getresponse = null;
    },
    getMembersSuccess: (state, action) => {
      state.groupMembers = action.payload;
      state.loading = false;
      state.error = null;
      state.getresponse = null;
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
    getFailedTwo: (state, action) => {
      state.groupList = [];
      state.groupMembers = [];
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

export const { getRequest, getGroupSuccess, getMembersSuccess, getGroupDetails, getMemberDetails, getFailedTwo, getError } =
  groupSlice.actions;

export const groupReducer = groupSlice.reducer;
