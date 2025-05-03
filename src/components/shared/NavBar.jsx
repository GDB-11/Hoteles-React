import React, { useState, useEffect } from 'react';
import Clock from './Clock';

function NavBar() {
  const [reservationCount, setReservationCount] = useState(0); // Inicializado en 0

  const navLinks = [
    { name: 'Inicio', href: '#' },
    { name: 'Habitaciones', href: '#' },
    { name: 'Reservas', href: '#' },
    { name: 'Contacto', href: '#' },
  ];

  return (
    <nav className="w-full h-18 bg-gradient-to-r from-amber-700 to-amber-800 text-amber-50 flex items-center justify-between px-8 shadow-lg relative z-10">
      {/* Sección Izquierda: Logo/Nombre de la Marca */}
      <a href="#" className="text-2xl font-semibold tracking-tight hover:text-white transition-colors duration-300">
        HOSPEDAJE Y SABOR
      </a>

      {/* Sección Central: Links de Navegación con Animación */}
      <div className="flex items-center space-x-8">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="relative inline-block text-sm font-medium text-amber-100 hover:text-white group transition-colors duration-300 py-2"
          >
            <span>{link.name}</span>
            <span
              className="absolute bottom-0 left-0 block w-0 h-0.5 bg-white group-hover:w-full transition-all duration-400 ease-out"
            ></span>
          </a>
        ))}
      </div>

      {/* Sección Derecha: Contador de Reservas y Reloj */}
      <div className="flex items-center space-x-6">
        {/* Contador de Reservas */}
        <button
          type="button"
          className="relative flex items-center text-amber-100 hover:text-white transition-colors duration-300"
          aria-label={`Ver ${reservationCount} reservas`}
        >
          {/* Ícono simple de "ticket" o "reserva" (SVG) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
            />
          </svg>

          {/* Badge con el número de reservas */}
          {
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full h-5 min-w-[20px] flex items-center justify-center px-1 shadow-sm">
                {reservationCount}
            </span>
          }
        </button>

        {/* Separador visual opcional */}
         <div className="h-6 w-px bg-amber-600"></div>

        {/* Reloj */}
        <Clock />
      </div>
    </nav>
  );
}

export default NavBar;