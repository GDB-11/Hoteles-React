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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  
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
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && 
          !event.target.closest('[data-mobile-toggle]')) {
        setIsMobileMenuOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, mobileMenuRef]);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 flex w-full flex-wrap items-center justify-between bg-gradient-to-r from-amber-700 to-amber-900 px-4 md:px-8 py-3 text-amber-50 shadow-lg">
        {/* Left Section: Logo/Brand Name */}
        <div className="flex items-center">
          <NavBarLogo />
        </div>
        
        {/* Mobile Menu Button */}
        <button
          type="button"
          className="ml-auto inline-flex items-center rounded-lg p-2 text-amber-100 hover:bg-amber-800 md:hidden"
          aria-controls="mobile-menu"
          aria-expanded={isMobileMenuOpen}
          onClick={toggleMobileMenu}
          data-mobile-toggle
        >
          <span className="sr-only">Abrir menú principal</span>
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
        
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex md:items-center md:space-x-8">
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
        
        {/* Right Section: Reservation Counter & Clock */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          {/* Reservation Counter with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              className="relative flex items-center text-amber-100 transition-colors duration-300 hover:text-white"
              aria-label={`Ver ${reservationCount} reservas`}
              onClick={toggleDropdown}
            >
              {/* Simple "ticket" or "reservation" icon (SVG) */}
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
              {/* Badge with reservation count */}
              {reservationCount > 0 && (
                <span className="absolute -top-2 -right-3 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white shadow-sm">
                  {reservationCount}
                </span>
              )}
            </button>
            
            {/* Reservations Dropdown */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <div className="border-b border-gray-200 px-4 py-2">
                    <h3 className="font-bold text-gray-900">Mis Reservas</h3>
                  </div>
                  
                  {reservations.length === 0 ? (
                    <div className="px-4 py-3 text-center text-sm text-gray-500">
                      No tienes reservas activas
                    </div>
                  ) : (
                    <>
                      <div className="max-h-80 overflow-y-auto">
                        {reservations.map((reservation) => (
                          <div key={reservation.id} className="border-b border-gray-200 px-4 py-3 last:border-b-0">
                            <div className="flex justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{reservation.roomName}</p>
                                <p className="text-xs text-gray-600">{reservation.location}</p>
                                <p className="text-xs text-gray-600">
                                  {formatDate(reservation.dateRange.startDate)} - {formatDate(reservation.dateRange.endDate)}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {reservation.guests} {reservation.guests === 1 ? "huésped" : "huéspedes"}, {reservation.nights} {reservation.nights === 1 ? 'noche' : 'noches'}
                                </p>
                              </div>
                              <div className="flex flex-col items-end">
                                <p className="text-sm font-bold" style={{ color: colors.primary }}>
                                  S/ {formatToTwoDecimals(reservation.totalPrice)}
                                </p>
                                <button
                                  onClick={() => removeReservation(reservation.id)}
                                  className="mt-1 text-xs text-red-600 hover:text-red-800"
                                >
                                  Eliminar
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="bg-gray-50 px-4 py-3">
                        <div className="mb-2 flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">Total:</p>
                          <p className="text-sm font-bold" style={{ color: colors.primary }}>
                            S/ {formatToTwoDecimals(
                              reservations.reduce((total, r) => total + r.totalPrice, 0)
                            )}
                          </p>
                        </div>
                        
                        <button
                          onClick={clearReservations}
                          className="w-full rounded-md px-4 py-2 text-sm font-medium text-white"
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
          
          {/* Visual separator */}
          <div className="h-6 w-px bg-amber-600"></div>
          
          {/* Clock */}
          <Clock />
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        ref={mobileMenuRef}
        className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-amber-800 shadow-lg`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-4 pb-3 pt-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="block rounded-md px-3 py-2 text-base font-medium text-amber-100 hover:bg-amber-700 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Mobile Reservations */}
          <div className="mt-4 flex items-center justify-between border-t border-amber-700 pt-4">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="mr-2 h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                />
              </svg>
              <span className="text-sm font-medium">Mis Reservas</span>
              {reservationCount > 0 && (
                <span className="ml-2 rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                  {reservationCount}
                </span>
              )}
            </div>
            <button
              onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
              className="flex items-center justify-center rounded-md bg-amber-700 p-2 text-white hover:bg-amber-600"
              aria-label={isMobileDropdownOpen ? "Ocultar reservas" : "Mostrar reservas"}
            >
              {isMobileDropdownOpen ? (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              ) : (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              )}
            </button>
          </div>
          
          {/* Mobile Clock */}
          <div className="mt-2 border-t border-amber-700 pt-4">
            <Clock />
          </div>
        </div>
        
        {/* Mobile dropdown */}
        <div className={`bg-white pb-4 overflow-hidden transition-all duration-300 ${isMobileDropdownOpen ? 'max-h-96' : 'max-h-0'}`}>
            <div className="py-1">
              {reservations.length === 0 ? (
                <div className="px-4 py-3 text-center text-sm text-gray-500">
                  No tienes reservas activas
                </div>
              ) : (
                <>
                  <div className="max-h-60 overflow-y-auto">
                    {reservations.map((reservation) => (
                      <div key={reservation.id} className="border-b border-gray-200 px-4 py-3 last:border-b-0">
                        <div className="flex justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{reservation.roomName}</p>
                            <p className="text-xs text-gray-600">{reservation.location}</p>
                            <p className="text-xs text-gray-600">
                              {formatDate(reservation.dateRange.startDate)} - {formatDate(reservation.dateRange.endDate)}
                            </p>
                            <p className="text-xs text-gray-600">
                              {reservation.guests} {reservation.guests === 1 ? "huésped" : "huéspedes"}, {reservation.nights} {reservation.nights === 1 ? 'noche' : 'noches'}
                            </p>
                          </div>
                          <div className="flex flex-col items-end">
                            <p className="text-sm font-bold" style={{ color: colors.primary }}>
                              S/ {formatToTwoDecimals(reservation.totalPrice)}
                            </p>
                            <button
                              onClick={() => removeReservation(reservation.id)}
                              className="mt-1 text-xs text-red-600 hover:text-red-800"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-gray-50 px-4 py-3">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">Total:</p>
                      <p className="text-sm font-bold" style={{ color: colors.primary }}>
                        S/ {formatToTwoDecimals(
                          reservations.reduce((total, r) => total + r.totalPrice, 0)
                        )}
                      </p>
                    </div>
                    
                    <button
                      onClick={clearReservations}
                      className="w-full rounded-md px-4 py-2 text-sm font-medium text-white"
                      style={{ backgroundColor: colors.primary }}
                    >
                      Limpiar todas
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
    </>
  );
}

export default NavBar;