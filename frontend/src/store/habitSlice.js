import { createSlice } from '@reduxjs/toolkit';

export const habitSlice = createSlice({
  name: 'habits',
  initialState: {
    list: [],
  },
  reducers: {
    setHabits: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setHabits } = habitSlice.actions;
export default habitSlice.reducer;