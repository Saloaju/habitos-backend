import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Función ayudante para sacar el token y armar el encabezado
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}` // PUNTO C: Envío de JWT desde el frontend
  };
};

export const fetchHabits = createAsyncThunk('habits/fetchHabits', async () => {
  const response = await fetch('https://habitos-backend-45kioywjq-saloajus-projects.vercel.app', { headers: getAuthHeaders() });
  return response.json();
});

export const createHabit = createAsyncThunk('habits/createHabit', async (name) => {
  const response = await fetch('https://habitos-backend-45kioywjq-saloajus-projects.vercel.app', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ name })
  });
  return response.json();
});

export const markHabitDone = createAsyncThunk('habits/markDone', async (id) => {
  const response = await fetch(`https://habitos-backend-45kioywjq-saloajus-projects.vercel.app`, { 
    method: 'POST',
    headers: getAuthHeaders()
  });
  return response.json();
});

const habitsSlice = createSlice({
  name: 'habits',
  initialState: { items: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.fulfilled, (state, action) => { 
        // Si no hay token, el backend devuelve un error, evitamos guardarlo en la lista
        if (Array.isArray(action.payload)) state.items = action.payload; 
      })
      .addCase(createHabit.fulfilled, (state, action) => { 
        if (action.payload._id) state.items.push(action.payload); 
      })
      .addCase(markHabitDone.fulfilled, (state, action) => {
        if (action.payload._id) {
          const index = state.items.findIndex(h => h._id === action.payload._id);
          if (index !== -1) state.items[index] = action.payload;
        }
      });
  },
});

export default habitsSlice.reducer;