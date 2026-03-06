'use client';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900">
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}