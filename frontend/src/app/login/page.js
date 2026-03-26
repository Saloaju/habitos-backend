'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const router = useRouter();

const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('https://habitos-backend-45kioywjq-saloajus-projects.vercel.app', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (res.ok) {
      const data = await res.json();
      // PUNTO B: Guardamos el JWT en el almacenamiento del navegador
      localStorage.setItem('token', data.token); 
      router.push('/');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

return (
<div className="min-h-screen flex items-center justify-center bg-gray-100">
<div className="bg-white p-8 rounded-xl shadow-md w-96">
<h2 className="text-2xl font-bold mb-6 text-center text-blue-900">Iniciar Sesión</h2>
{error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Usuario</label>
        <input 
          type="text" 
          className="w-full mt-1 p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
        <input 
          type="password" 
          className="w-full mt-1 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-bold">
        Entrar
      </button>
    </form>
    
    <p className="mt-4 text-center text-sm">
      ¿No tienes cuenta? <a href="/register" className="text-blue-600 hover:underline">Regístrate aquí</a>
    </p>
  </div>
</div>
);
}