"use client";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHabits } from '../store/habitSlice';

export default function Home() {
  const dispatch = useDispatch();
  const habits = useSelector((state) => state.habits.list);

  useEffect(() => {
    // Petición GET al backend para obtener los hábitos
    const fetchHabits = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/habits');
        const data = await response.json();
        
        // Guardar los datos obtenidos en el estado global de Redux
        dispatch(setHabits(data));
      } catch (error) {
        console.error("Error obteniendo hábitos:", error);
      }
    };

    fetchHabits();
  }, [dispatch]);

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-5">Mis Hábitos Atómicos</h1>
      {habits.length === 0 ? (
        <p>No hay hábitos registrados aún.</p>
      ) : (
        <ul className="space-y-3">
          {habits.map((habit) => (
            <li key={habit._id} className="p-4 border rounded shadow">
              <h2 className="text-xl font-semibold">{habit.name}</h2>
              <p>Racha actual: {habit.streak} días</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
