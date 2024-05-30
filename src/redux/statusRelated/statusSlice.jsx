import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  statusList: [],
  statusDetailes: [],
  loading: false,
  error: null,
  response: null,
  getresponse: null
};

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true;
    },
    getStatusSuccess: (state, action) => {
      state.statusList = action.payload;
      state.loading = false;
      state.error = false;
      state.getresponse = null;
    },
    getStatusDetailedSuccess: (state, action) => {
      state.statusDetailes = action.payload;
      state.loading = false;
      state.error = false;
      state.getresponse = null;
    },
    getStatusFailed: (state, action) => {
      state.statusList = [];
      state.statusDetailes = [];
      state.error = action.payload;
      state.loading = false;
      state.getresponse = false;
    },
    getStatusDetailedFailed: (state, action) => {
      state.statusDetailes = [];
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

export const { getRequest, getStatusSuccess, getStatusDetailedSuccess, getStatusFailed, getStatusDetailedFailed, getError } =
  statusSlice.actions;

export const statusReducer = statusSlice.reducer;
