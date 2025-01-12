import { TimeFilter } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  filter: string;
}

const initialState: FilterState = {
  filter: '7D', // Default filter
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<TimeFilter>) {
      state.filter = action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;