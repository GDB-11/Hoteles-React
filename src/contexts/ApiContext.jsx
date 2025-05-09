import { createContext, useState, useContext } from "react";

// Contexto para todas las APIs
const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  // Data modelo para hotel (tipod de habitaciones)
  const [hotelData, setHotelData] = useState({
    habitaciones: [],
    isLoading: false,
    error: null
  });

  // Data modelo para sedes (sedes y ubicaciones)
  const [sedeData, setSedeData] = useState({
    sedes: [],
    ubicaciones: [],
    isLoading: false,
    error: null
  });

  // Data modelo para reservaciones
  const [reservationData, setReservationData] = useState({
    reservations: [],
    isLoading: false,
    error: null
  });

  // Función para cargar datos de hotel
  const fetchHotelData = async () => {
    try {
      setHotelData(prev => ({ ...prev, isLoading: true }));

      //Obtener data de habitaciones
      const response = await fetch('https://api.npoint.io/96f8b8f82e6b78454da7');

      if (!response.ok) {
        throw new Error(`Error HTTP tipos habitación: ${response.status}`);
      }

      const data = await response.json();

      setHotelData({
        habitaciones: data.tiposHabitacion,
        isLoading: false,
        error: null
      });
    } catch (err) {
      setHotelData(prev => ({
        ...prev,
        isLoading: false,
        error: err.message
      }));
      console.error("Error al obtener datos:", err);
    }
  };

  // Función para cargar datos de las sedes
  const fetchSedesData = async () => {
    try {
      setSedeData(prev => ({ ...prev, isLoading: true }));

      //obtener sedes
      const response = await fetch('https://api.npoint.io/b563e00799e6608408a3');

      if (!response.ok) {
        throw new Error(`Error HTTP tipos habitación: ${response.status}`);
      }

      const data = await response.json();
      const sedes = [...new Set(data.sedes.map(s => s.nombre))];
      const ubicaciones = [...new Set(data.sedes.map(s => s.ubicacion))];

      setSedeData({
        sedes: sedes,
        ubicaciones: ubicaciones,
        isLoading: false,
        error: null
      });
    } catch (err) {
      setSedeData(prev => ({
        ...prev,
        isLoading: false,
        error: err.message
      }));
    }
  };

  // Funciones para manejar las reservaciones
  const addReservation = (reservation) => {
    setReservationData(prev => ({
      ...prev,
      reservations: [...prev.reservations, reservation]
    }));
  };

  const removeReservation = (reservationId) => {
    setReservationData(prev => ({
      ...prev,
      reservations: prev.reservations.filter(res => res.id !== reservationId)
    }));
  };

  const clearReservations = () => {
    setReservationData(prev => ({
      ...prev,
      reservations: []
    }));
  };

  const getReservationCount = () => {
    return reservationData.reservations.length;
  };

  return (
    <ApiContext.Provider
      value={{
        hotel: {
          ...hotelData,
          fetchData: fetchHotelData
        },
        sede: {
          ...sedeData,
          fetchData: fetchSedesData
        },
        reservation: {
          ...reservationData,
          addReservation,
          removeReservation,
          clearReservations,
          getReservationCount
        }
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

// Hooks
export const useHotelData = () => {
  const { hotel } = useContext(ApiContext);
  return hotel;
};

export const useSedeData = () => {
  const { sede } = useContext(ApiContext);
  return sede;
};

export const useReservation = () => {
  const { reservation } = useContext(ApiContext);
  return reservation;
};