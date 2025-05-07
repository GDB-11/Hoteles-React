import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { calculateNights } from "../../helpers/DateHelper";

const RangeDatePicker = ({
  value = { startDate: null, endDate: null },
  onChange,
  className = "",
  placeholder = "Seleccionar fechas",
  disabled = false,
}) => {
  // State para controlar el mes actual visible
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // State para controlar si el calendario está abierto (cerrado por defecto)
  const [isOpen, setIsOpen] = useState(false);

  // Obtener la fecha actual para limitar selecciones (fechas pasadas)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Nombres de los meses
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  // Nombres de los días de la semana
  const daysOfWeek = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];

  // Función para navegar al mes anterior
  const prevMonth = () => {
    const prevMonthDate = new Date(currentMonth);
    prevMonthDate.setMonth(currentMonth.getMonth() - 1);
    setCurrentMonth(prevMonthDate);
  };

  // Función para navegar al mes siguiente
  const nextMonth = () => {
    const nextMonthDate = new Date(currentMonth);
    nextMonthDate.setMonth(currentMonth.getMonth() + 1);
    setCurrentMonth(nextMonthDate);
  };

  // Función para formatear fechas en formato corto
  const formatDate = (date) => {
    if (!date) return "";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Función para generar los días del mes
  const generateDaysForMonth = (year, month) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Ajustar el primer día de la semana (0=Domingo, 1=Lunes)
    let firstDayOfWeek = firstDayOfMonth.getDay() - 1;
    if (firstDayOfWeek === -1) firstDayOfWeek = 6; // Si es domingo (0), ajustar a 6

    const daysInMonth = lastDayOfMonth.getDate();
    const daysArray = [];

    // Añadir días vacíos al inicio
    for (let i = 0; i < firstDayOfWeek; i++) {
      daysArray.push({ day: null, date: null });
    }

    // Añadir los días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      daysArray.push({ day, date });
    }

    // Completar la última semana con días vacíos
    const remainingCells = 7 - (daysArray.length % 7);
    if (remainingCells < 7) {
      for (let i = 0; i < remainingCells; i++) {
        daysArray.push({ day: null, date: null });
      }
    }

    return daysArray;
  };

  // Organizar los días en semanas
  const groupDaysInWeeks = (days) => {
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    return weeks;
  };

  // Manejo de la selección de fechas
  const handleDateSelect = (date) => {
    if (!date || disabled) return;

    // Evitar seleccionar fechas pasadas
    if (date < today && date.getDate() !== today.getDate()) return;

    let newRange;

    // Lógica para seleccionar el rango
    if (!value.startDate || (value.startDate && value.endDate)) {
      // Si no hay fecha de inicio o ya hay un rango completo, empezar nuevo rango
      newRange = { startDate: date, endDate: null };
    } else {
      // Si hay fecha de inicio pero no de fin
      if (date < value.startDate) {
        // Si la nueva fecha es anterior a la fecha de inicio, invertir el orden
        newRange = { startDate: date, endDate: value.startDate };
      } else {
        // Establecer la fecha de fin
        newRange = { ...value, endDate: date };
      }
    }

    // Llamar a la función onChange externa con el nuevo rango
    if (onChange) {
      onChange(newRange);
    }

    // Cerrar el calendario si se ha seleccionado un rango completo
    if (newRange.startDate && newRange.endDate) {
      setTimeout(() => setIsOpen(false), 300);
    }
  };

  // Verificar si una fecha está en el rango seleccionado
  const isInRange = (date) => {
    if (!date || !value.startDate) return false;

    if (!value.endDate) {
      return date.getTime() === value.startDate.getTime();
    }

    return date >= value.startDate && date <= value.endDate;
  };

  // Verificar si una fecha es la fecha de inicio o fin
  const isStartOrEndDate = (date) => {
    if (!date) return false;

    return (
      (value.startDate && date.getTime() === value.startDate.getTime()) ||
      (value.endDate && date.getTime() === value.endDate.getTime())
    );
  };

  // Generar las semanas del mes actual
  const weeks = groupDaysInWeeks(
    generateDaysForMonth(currentMonth.getFullYear(), currentMonth.getMonth()),
  );

  // Formatear la visualización del rango de fechas
  const getDisplayValue = () => {
    if (!value.startDate) return placeholder;

    const start = formatDate(value.startDate);

    if (!value.endDate) return `${start} - Seleccionar fecha final`;

    const nights = calculateNights(value.startDate, value.endDate);

    const end = formatDate(value.endDate);
    return `${start} - ${end} (${nights} noche${nights > 1 ? "s" : ""})`;
  };

  // Función para limpiar la selección
  const handleClear = () => {
    if (onChange) {
      onChange({ startDate: null, endDate: null });
    }
  };

  // Función para aplicar la selección
  const handleApply = () => {
    if (value.startDate && !value.endDate) {
      // Si solo hay fecha de inicio, establecer un rango de 3 días como ejemplo
      const endDate = new Date(value.startDate);
      endDate.setDate(endDate.getDate() + 3);

      if (onChange) {
        onChange({ ...value, endDate });
      }
    }

    setIsOpen(false);
  };

  // Cerrar el calendario al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      const calendar = document.getElementById("calendar-container");
      if (
        isOpen &&
        calendar &&
        !calendar.contains(event.target) &&
        !event.target.closest(".date-picker-input")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Componente auxiliar ChevronDown
  const ChevronDown = ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );

  return (
    <div className={`relative w-full ${className}`}>
      {/* Input para mostrar el rango seleccionado */}
      <div
        className={`date-picker-input flex w-full cursor-pointer items-center rounded-lg border bg-white p-3 shadow-sm focus:ring-2 focus:ring-amber-700 focus:outline-none ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <Calendar className="mr-2 h-5 w-5 text-amber-700" />
        <span className="flex-grow text-gray-700">{getDisplayValue()}</span>
        <ChevronDown
          className={`h-5 w-5 text-amber-700 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {/* Calendario */}
      {isOpen && (
        <div
          id="calendar-container"
          className="absolute right-0 left-0 z-50 mt-2 w-full rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
        >
          {/* Cabecera del calendario */}
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={prevMonth}
              className="rounded-full p-1 text-amber-700 hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-semibold text-gray-800">
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>
            <button
              type="button"
              onClick={nextMonth}
              className="rounded-full p-1 text-amber-700 hover:bg-gray-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Días de la semana */}
          <div className="mb-2 grid grid-cols-7">
            {daysOfWeek.map((day, index) => (
              <div
                key={index}
                className="py-2 text-center text-xs font-medium text-gray-500"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Días del mes */}
          <div className="grid grid-cols-7 gap-1">
            {weeks.flat().map((dayObj, index) => {
              const { day, date } = dayObj;
              const isToday =
                date &&
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear();
              const isPast = date && date < today && !isToday;
              const inRange = date && isInRange(date);
              const isStartOrEnd = date && isStartOrEndDate(date);

              // Determinar clases condicionales
              let dayClasses =
                "h-10 w-10 flex items-center justify-center rounded-full text-sm";

              if (!day) {
                dayClasses += " opacity-0 cursor-default";
              } else if (isPast) {
                dayClasses += " text-gray-300 cursor-not-allowed";
              } else if (isStartOrEnd) {
                dayClasses += " bg-amber-700 text-white font-semibold";
              } else if (inRange) {
                dayClasses += " bg-amber-100 text-amber-800";
              } else if (isToday) {
                dayClasses +=
                  " border border-amber-700 text-amber-700 font-semibold cursor-pointer hover:bg-gray-100";
              } else {
                dayClasses += " text-gray-700 hover:bg-gray-100 cursor-pointer";
              }

              return (
                <div
                  key={index}
                  className={dayClasses}
                  onClick={() => handleDateSelect(date)}
                >
                  {day}
                </div>
              );
            })}
          </div>

          {/* Botones de acción */}
          <div className="mt-4 flex justify-between">
            <button
              type="button"
              onClick={handleClear}
              className="cursor-pointer rounded-md bg-gray-200 px-3 py-1 text-sm text-gray-600 hover:bg-gray-300 hover:text-gray-800"
            >
              Limpiar
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="cursor-pointer rounded-md bg-blue-700 px-4 py-1 text-sm text-white hover:bg-blue-900"
            >
              Aplicar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Componente completo
const DatePicker = () => {
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const handleDateChange = (newRange) => {
    setDateRange(newRange);
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-lg p-8">
      {/* Uso del componente */}
      <div className="w-full max-w-md">
        <RangeDatePicker
          value={dateRange}
          onChange={handleDateChange}
          placeholder="Selecciona tus fechas"
        />
      </div>
    </div>
  );
};

export default DatePicker;
