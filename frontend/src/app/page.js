'use client';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHabits, markHabitDone, createHabit } from '../store/habitsSlice';
import { useRouter } from 'next/navigation';

export default function Home() {
  const dispatch = useDispatch();
  // Nos aseguramos de que habits sea un arreglo para evitar errores
  const habits = useSelector((state) => state.habits.items) || []; 
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');

  useEffect(() => {
    // PUNTO 3 APLICADO: Ahora verificamos si existe el 'token' (JWT)
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // Si no hay token, al login
    } else {
      setIsAuth(true);
      dispatch(fetchHabits());
    }
  }, [dispatch, router]);

  const handleLogout = () => {
    // PUNTO 3 APLICADO: Borramos el 'token' para cerrar sesión
    localStorage.removeItem('token');
    router.push('/login');
  };

  const handleAddHabit = (e) => {
    e.preventDefault();
    if (newHabitName.trim() === '') return;
    dispatch(createHabit(newHabitName));
    setNewHabitName(''); // Limpia el cuadro de texto
  };

  if (!isAuth) return null; 

  return (
    <main className="p-10 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Mis Hábitos</h1>
        <button onClick={handleLogout} className="text-red-600 font-bold hover:underline">
          Cerrar Sesión
        </button>
      </div>

      {/* FORMULARIO PARA CREAR HÁBITO */}
      <form onSubmit={handleAddHabit} className="mb-8 flex gap-4">
        <input 
          type="text" 
          placeholder="Ej. Leer 10 páginas, Beber agua..." 
          className="flex-1 p-3 border rounded-lg shadow-sm"
          value={newHabitName}
          onChange={(e) => setNewHabitName(e.target.value)}
        />
        <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 shadow-md">
          Agregar Hábito
        </button>
      </form>
      
      <div className="space-y-6">
        {habits.map((habit) => {
          const progressPercentage = Math.min((habit.streak / 66) * 100, 100);
          const barColor = habit.streak >= 33 ? 'bg-green-500' : 'bg-red-500';

          return (
            <div key={habit._id} className="p-6 bg-white rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-xl">{habit.name}</span>
                <button 
                  onClick={() => dispatch(markHabitDone(habit._id))}
                  className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-sm"
                >
                  Done
                </button>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                <div 
                  className={`h-4 rounded-full transition-all duration-500 ${barColor}`} 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-right text-sm text-gray-500 font-bold">Racha: {habit.streak} / 66 días</p>
            </div>
          );
        })}
        {habits.length === 0 && (
          <p className="text-center text-gray-500">Aún no tienes hábitos. ¡Agrega uno arriba!</p>
        )}
      </div>
    </main>
  );
}