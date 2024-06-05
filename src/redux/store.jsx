import { configureStore } from '@reduxjs/toolkit';
import { placesReducer } from './placesRelated/placesSlice';
import { communityReducer } from './communityRelated/communitySlice';
import { mapFilterReducer } from './mapRelated/mapSlice';
import { updatesReducer } from './updateSlice/updateSlice';
import { usersReducer } from './userRelated/userSlice';
import { groupReducer } from './groupRelated/groupSlice';
import { resourceReducer } from './resourceRelated/resourceSlice';
import { statusReducer } from './statusRelated/statusSlice';
import { groupMemberReducer } from './groupRelated/groupMemberSlice';
const store = configureStore({
  reducer: {
    community: communityReducer,
    places: placesReducer,
    mapFilter: mapFilterReducer,
    updates: updatesReducer,
    users: usersReducer,
    group: groupReducer,
    resource: resourceReducer,
    status: statusReducer,
    groupMember: groupMemberReducer
  }
});

export default store;
