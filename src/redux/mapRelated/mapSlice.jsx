import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  tabnumber: 0
};

const mapFilterSlice = createSlice({
  name: 'mapFilter',
  initialState,
  reducers: {
    getFilter: (state, action) => {
      state.search = action.payload;
    },
    setTabNumber: (state, action) => {
      state.tabnumber = action.payload;
    }
  }
});
export const { getFilter, setTabNumber } = mapFilterSlice.actions;
export const mapFilterReducer = mapFilterSlice.reducer;
