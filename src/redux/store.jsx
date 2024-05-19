import { configureStore } from '@reduxjs/toolkit';
import { placesReducer } from './placesRelated/placesSlice';
import { communityReducer } from './communityRelated/communitySlice';
import { mapFilterReducer } from './mapRelated/mapSlice';
import { updatesReducer } from './updateSlice/updateSlice';
import { usersReducer } from './userRelated/userSlice';
const store = configureStore({
  reducer: {
    community: communityReducer,
    places: placesReducer,
    mapFilter: mapFilterReducer,
    updates: updatesReducer,
    users: usersReducer
  }
});

export default store;
