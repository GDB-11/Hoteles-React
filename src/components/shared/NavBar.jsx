import React, { useState } from "react";
import Clock from "./Clock";
import NavBarLogo from "./NavBarLogo";

function NavBar() {
  const [reservationCount, setReservationCount] = useState(0);

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Promociones", href: "/promociones" },
    { name: "Contacto", href: "/contacto" },
  ];

  return (
    <>
      <nav className="relative z-10 flex w-full items-center justify-between bg-gradient-to-r from-amber-700 to-amber-900 px-8 py-4 text-amber-50 shadow-lg">
        {/* Sección Izquierda: Logo/Nombre de la Marca */}
        <NavBarLogo />

        {/* Sección Central: Links de Navegación con Animación */}
        <div className="flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="group relative inline-block py-2 text-sm font-medium text-amber-100 transition-colors duration-300 hover:text-white"
            >
              <span>{link.name}</span>
              <span className="absolute bottom-0 left-0 block h-0.5 w-0 bg-white transition-all duration-400 ease-out group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Sección Derecha: Contador de Reservas y Reloj */}
        <div className="flex items-center space-x-6">
          {/* Contador de Reservas */}
          <button
            type="button"
            className="relative flex items-center text-amber-100 transition-colors duration-300 hover:text-white"
            aria-label={`Ver ${reservationCount} reservas`}
          >
            {/* Ícono simple de "ticket" o "reserva" (SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
              />
            </svg>

            {/* Badge con el número de reservas */}
            {
              <span className="absolute -top-2 -right-3 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white shadow-sm">
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
    </>
  );
}

export default NavBar;
