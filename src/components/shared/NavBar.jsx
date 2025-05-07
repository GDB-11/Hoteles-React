import React, { useState, useEffect } from "react";
import Clock from "./Clock";
import RangeDatePicker from "./RangeDatePicker";

function NavBar() {
  const [reservationCount, setReservationCount] = useState(0);
  const [searchParams, setSearchParams] = useState({
    sede: "",
    tipoHabitacion: "",
    fechas: {
      startDate: null,
      endDate: null,
    },
  });

  // Lista de sedes
  const sedes = [
    "Sol de Surco",
    "Mar de Miraflores",
    "Fortaleza Chachapoyas",
    "Rio Utcubamba Bagua",
    "Palmeras Bagua Grande",
    "Cordillera Blanca Huaraz",
    "Pukallpa Chacas",
    "Bolognesi Chiquián",
    "Campesino Carhuaz",
    "Costero Casma",
  ];

  // Lista de tipos de habitación
  const tiposHabitacion = [
    "Standard Simple",
    "Standard Doble",
    "Superior Queen",
    "Standard King",
    "Standard Twin",
    "Económica Full",
    "Junior Suite California King",
    "Habitación con Litera",
    "Basic Studio",
    "Habitación Sofá Cama",
  ];

  const navLinks = [
    { name: "Inicio", href: "#" },
    { name: "Habitaciones", href: "#" },
    { name: "Reservas", href: "#" },
    { name: "Contacto", href: "#" },
  ];

  // Maneja cambios en los selects
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Maneja cambios en las fechas
  const handleDateChange = (newRange) => {
    setSearchParams((prev) => ({
      ...prev,
      fechas: newRange,
    }));
  };

  // Maneja el envío del formulario
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Búsqueda realizada con parámetros:", searchParams);
    // Aquí podrías hacer un fetch a tu API o navegar a una página de resultados
  };

  return (
    <>
      <nav className="relative z-10 flex w-full items-center justify-between bg-gradient-to-r from-amber-700 to-amber-900 px-8 py-4 text-amber-50 shadow-lg">
        {/* Sección Izquierda: Logo/Nombre de la Marca */}
        <div className="flex items-center">
          <div className="mr-2 h-10 w-10 rounded-full bg-amber-950"></div>
          <div>
            <h1 className="text-xl font-bold text-amber-50">
              HOSPEDAJE Y SABOR
            </h1>
            <p className="text-xs text-amber-50">
              Tradición Peruana de Hospitalidad
            </p>
          </div>
        </div>

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

      {/* Formulario de búsqueda */}
      <div className="bg-amber-200 py-6 px-8 shadow-md">
        <form 
          onSubmit={handleSearch}
          className="mx-auto max-w-6xl"
        >
          <div className="flex flex-col md:flex-row md:items-end md:space-x-4 space-y-4 md:space-y-0">
            {/* Selección de Sede */}
            <div className="flex-1">
              <label htmlFor="sede" className="block mb-1 text-sm font-medium text-amber-900">
                Sede
              </label>
              <select
                id="sede"
                name="sede"
                value={searchParams.sede}
                onChange={handleSelectChange}
                className="w-full rounded-lg border border-amber-300 bg-white p-3 shadow-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value="">Todas las sedes</option>
                {sedes.map((sede) => (
                  <option key={sede} value={sede}>
                    {sede}
                  </option>
                ))}
              </select>
            </div>

            {/* Selección de Tipo de Habitación */}
            <div className="flex-1">
              <label htmlFor="tipoHabitacion" className="block mb-1 text-sm font-medium text-amber-900">
                Tipo de Habitación
              </label>
              <select
                id="tipoHabitacion"
                name="tipoHabitacion"
                value={searchParams.tipoHabitacion}
                onChange={handleSelectChange}
                className="w-full rounded-lg border border-amber-300 bg-white p-3 shadow-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value="">Todos los tipos</option>
                {tiposHabitacion.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </div>

            {/* Selección de Fechas */}
            <div className="flex-1">
              <label htmlFor="fechas" className="block mb-1 text-sm font-medium text-amber-900">
                Fechas de Estadía
              </label>
              <RangeDatePicker
                id="fechas"
                value={searchParams.fechas}
                onChange={handleDateChange}
                placeholder="Selecciona tus fechas"
              />
            </div>

            {/* Botón de Búsqueda */}
            <div>
              <button
                type="submit"
                className="w-full md:w-auto rounded-lg bg-amber-700 px-6 py-3 text-white font-medium shadow-sm hover:bg-amber-800 transition-colors duration-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                Buscar Habitaciones
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default NavBar;