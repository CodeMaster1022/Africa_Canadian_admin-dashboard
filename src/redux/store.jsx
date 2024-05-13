import { configureStore } from '@reduxjs/toolkit';
import { placesReducer } from './placesRelated/placesSlice';
import { communityReducer } from './communityRelated/communitySlice';
const store = configureStore({
  reducer: {
    community: communityReducer,
    places: placesReducer
  }
});

export default store;
