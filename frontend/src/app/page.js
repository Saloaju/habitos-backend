'use client';
import { useSelector } from 'react-redux';

export default function Home() {
  const habits = useSelector((state) => state.habits.items);

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Mis Hábitos Atómicos</h1>
      
      <div className="space-y-6">
        {habits.map((habit) => {
          // Lógica para cambiar de rojo a verde hacia los 66 días
          const progressPercentage = Math.min((habit.daysCompleted / 66) * 100, 100);
          const barColor = habit.daysCompleted >= 33 ? 'bg-green-500' : 'bg-red-500';

          return (
            <div key={habit.id} className="p-5 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-lg">{habit.name}</span>
                {/* Botón Done sin funcionalidad */}
                <button className="px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700 transition">
                  Done
                </button>
              </div>
              
              {/* Barra de progreso */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
                <div 
                  className={`h-3 rounded-full ${barColor}`} 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-right text-xs text-gray-500 font-medium">
                {habit.daysCompleted} / 66 días
              </p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
