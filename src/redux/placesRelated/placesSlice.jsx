import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  placesList: [],
  placesDetailes: [],
  loading: false,
  error: null,
  response: null,
  getresponse: null
};

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true;
    },
    getPlacesSuccess: (state, action) => {
      state.placesList = action.payload;
      state.loading = false;
      state.error = false;
      state.getresponse = null;
    },
    getPlacesDetailedSuccess: (state, action) => {
      state.placesDetailes = action.payload;
      state.loading = false;
      state.error = false;
      state.getresponse = null;
    },
    getPlacesFailed: (state, action) => {
      state.placesList = [];
      state.placesDetailes = [];
      state.error = action.payload;
      state.loading = false;
      state.getresponse = false;
    },
    getPlacesDetailedFailed: (state, action) => {
      state.placesDetailes = [];
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

export const { getRequest, getPlacesSuccess, getPlacesDetailedSuccess, getPlacesFailed, getPlacesDetailedFailed, getError } =
  placesSlice.actions;

export const placesReducer = placesSlice.reducer;
