import React, { useState, useRef, useEffect } from "react";
import Clock from "./Clock";
import NavBarLogo from "./NavBarLogo";
import { useReservation } from "../../contexts/ApiContext";
import { Link } from "react-router-dom";
import { formatToTwoDecimals } from "../../helpers/NumberHelper";
import colors from "../../helpers/ColorsHelper";

function NavBar() {
  const { reservations, removeReservation, clearReservations, getReservationCount } = useReservation();
  const reservationCount = getReservationCount();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Promociones", href: "/promociones" },
    { name: "Contacto", href: "/contacto" },
  ];
  
  // Cerrar el dropdown cuando se hace clic fuera de él
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit'
    });
  };
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <nav className="sticky z-10 flex w-full items-center justify-between bg-gradient-to-r from-amber-700 to-amber-900 px-8 py-4 text-amber-50 shadow-lg">
        {/* Sección Izquierda: Logo/Nombre de la Marca */}
        <NavBarLogo />
        
        {/* Sección Central: Links de Navegación con Animación */}
        <div className="flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="group relative inline-block py-2 text-sm font-medium text-amber-100 transition-colors duration-300 hover:text-white"
            >
              <span>{link.name}</span>
              <span className="absolute bottom-0 left-0 block h-0.5 w-0 bg-white transition-all duration-400 ease-out group-hover:w-full"></span>
            </Link>
          ))}
        </div>
        
        {/* Sección Derecha: Contador de Reservas y Reloj */}
        <div className="flex items-center space-x-6">
          {/* Contador de Reservas con Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              className="relative flex items-center text-amber-100 transition-colors duration-300 hover:text-white"
              aria-label={`Ver ${reservationCount} reservas`}
              onClick={toggleDropdown}
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
              {reservationCount > 0 && (
                <span className="absolute -top-2 -right-3 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white shadow-sm">
                  {reservationCount}
                </span>
              )}
            </button>
            
            {/* Dropdown de Reservas */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-100">
                <div className="py-1">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <h3 className="font-bold text-gray-900">Mis Reservas</h3>
                  </div>
                  
                  {reservations.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-gray-500 text-center">
                      No tienes reservas activas
                    </div>
                  ) : (
                    <>
                      <div className="max-h-80 overflow-y-auto">
                        {reservations.map((reservation) => (
                          <div key={reservation.id} className="px-4 py-3 border-b border-gray-200 last:border-b-0">
                            <div className="flex justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{reservation.roomName}</p>
                                <p className="text-xs text-gray-600">{reservation.location}</p>
                                <p className="text-xs text-gray-600">
                                  {formatDate(reservation.dateRange.startDate)} - {formatDate(reservation.dateRange.endDate)}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {reservation.guests} huéspedes, {reservation.nights} {reservation.nights === 1 ? 'noche' : 'noches'}
                                </p>
                              </div>
                              <div className="flex flex-col items-end">
                                <p className="text-sm font-bold" style={{ color: colors.primary }}>
                                  S/ {formatToTwoDecimals(reservation.totalPrice)}
                                </p>
                                <button
                                  onClick={() => removeReservation(reservation.id)}
                                  className="text-xs text-red-600 hover:text-red-800 mt-1"
                                >
                                  Eliminar
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="px-4 py-3 bg-gray-50">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-sm font-medium text-gray-900">Total:</p>
                          <p className="text-sm font-bold" style={{ color: colors.primary }}>
                            S/ {formatToTwoDecimals(
                              reservations.reduce((total, r) => total + r.totalPrice, 0)
                            )}
                          </p>
                        </div>
                        
                        <button
                          onClick={clearReservations}
                          className="w-full px-4 py-2 text-sm font-medium text-white rounded-md"
                          style={{ backgroundColor: colors.primary }}
                        >
                          Limpiar todas
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          
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