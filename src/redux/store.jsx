import { configureStore } from '@reduxjs/toolkit';
import { placesReducer } from './placesRelated/placesSlice';
import { communityReducer } from './communityRelated/communitySlice';
import { mapFilterReducer } from './mapRelated/mapSlice';
const store = configureStore({
  reducer: {
    community: communityReducer,
    places: placesReducer,
    mapFilter: mapFilterReducer
  }
});

export default store;
