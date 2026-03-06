import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    { id: 1, name: 'Leer 2 páginas de un libro', daysCompleted: 10 },
    { id: 2, name: 'Tomar 1 vaso de agua al despertar', daysCompleted: 60 },
    { id: 3, name: 'Hacer 5 respiraciones profundas', daysCompleted: 5 },
    { id: 4, name: 'Caminar 10 minutos', daysCompleted: 30 },
    { id: 5, name: 'Anotar 1 agradecimiento', daysCompleted: 45 },
  ],
};

const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {}, // Sin funcionalidad por ahora
});

export default habitsSlice.reducer;