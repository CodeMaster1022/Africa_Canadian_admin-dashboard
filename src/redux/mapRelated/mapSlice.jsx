import { createSlice } from '@reduxjs/toolkit';
import { countries } from 'data/location';
const initialState = {
  search: '',
  data: countries,
  countAlbertaMember: [],
  tabnumber: 0
  // maxCount: data.length
};

const mapFilterSlice = createSlice({
  name: 'mapFilter',
  initialState,
  reducers: {
    getAlbertaMember: (state) => {
      state.countAlbertaMember = countries.filter((city) => city.province === 'Alberta');
    },
    getFilter: (state, action) => {
      state.search = action.payload;
    },
    setTabNumber: (state, action) => {
      state.tabnumber = action.payload;
    }
  }
});
export const { getFilter, setTabNumber, getAlbertaMember } = mapFilterSlice.actions;
export const mapFilterReducer = mapFilterSlice.reducer;
