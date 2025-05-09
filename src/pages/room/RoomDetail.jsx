import { useParams, useNavigate } from "react-router-dom";
import { useHotelData, useSedeData } from "../../contexts/ApiContext";
import { useEffect, useState } from "react";
import { firstCharToNumber } from "../../helpers/NumberHelper";
import { calculateNights } from "../../helpers/DateHelper";

import Breadcrumbs from "../../components/room/Breadcrumbs";
import RoomHeader from "../../components/room/RoomHeader";
import ImageGallery from "../../components/room/ImageGallery";
import RoomDescription from "../../components/room/RoomDescription";
import RelatedRooms from "../../components/room/RelatedRooms";
import BookingCard from "../../components/room/BookingCard";
import LoadingState from "../../components/room/LoadingState";
import NotFoundState from "../../components/room/NotFoundState";

function RoomDetail() {
    const { id } = useParams();
    const { habitaciones, isLoading } = useHotelData();
    const { sedes, ubicaciones, isLoading: isLoadingSedes, fetchData: fetchSedesData } = useSedeData();
    
    const [habitacion, setHabitacion] = useState(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null
    });
    const [guests, setGuests] = useState(1);
    const [nights, setNights] = useState(1);
    const [selectedLocation, setSelectedLocation] = useState("");
    
    const navigate = useNavigate();

    // Cargar datos de sedes si es necesario
    useEffect(() => {
        if (sedes.length === 0 && !isLoadingSedes) {
            fetchSedesData();
        } else if (sedes.length > 0 && !selectedLocation) {
            // Establecer la primera ubicación como predeterminada cuando se cargan
            setSelectedLocation(sedes[0]);
        }
    }, [sedes, isLoadingSedes, fetchSedesData, selectedLocation]);

    useEffect(() => {
        if (!isLoading && habitaciones.length > 0) {
            const habitacionEncontrada = habitaciones.find(h => h.id === id);

            if (habitacionEncontrada) {
                setHabitacion(habitacionEncontrada);
                setGuests(1);

                // Agregar imágenes simuladas adicionales para la galería
                if (!habitacionEncontrada.imageGallery) {
                    habitacionEncontrada.imageGallery = [
                        habitacionEncontrada.url,
                        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80",
                        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&q=80"
                    ];
                }
            } else {
                console.error("Habitación no encontrada");
            }
        }
    }, [id, habitaciones, isLoading, navigate]);

    // Calculamos el número de noches cuando cambie el rango de fechas
    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const nightsCount = calculateNights(dateRange.startDate, dateRange.endDate);
            setNights(nightsCount > 0 ? nightsCount : 1);
        } else {
            setNights(1);
        }
    }, [dateRange]);

    const handleDateRangeChange = (newRange) => {
        // Create a new object to ensure reference change and convert any string dates to Date objects
        setDateRange({
            startDate: newRange.startDate ? new Date(newRange.startDate) : null,
            endDate: newRange.endDate ? new Date(newRange.endDate) : null
        });
    };

    const handleGuestsChange = (increment) => {
        const newValue = guests + increment;
        if (newValue >= 1 && newValue <= firstCharToNumber(habitacion.amenities[0])) {
            setGuests(newValue);
        }
    };

    const handleLocationChange = (location) => {
        setSelectedLocation(location);
    };

    const nextImage = () => {
        if (habitacion?.imageGallery?.length > 0) {
            setActiveImageIndex((prev) =>
                prev === habitacion.imageGallery.length - 1 ? 0 : prev + 1
            );
        }
    };

    const prevImage = () => {
        if (habitacion?.imageGallery?.length > 0) {
            setActiveImageIndex((prev) =>
                prev === 0 ? habitacion.imageGallery.length - 1 : prev - 1
            );
        }
    };

    // Calcular precio total
    const calculateTotalPrice = () => {
        if (!habitacion) return 0;
        return habitacion.price * nights;
    };

    // Simulando habitaciones relacionadas
    const relatedRooms = habitaciones
        .filter(h => h.id !== id)
        .slice(0, 3);

    if (isLoading || isLoadingSedes) return <LoadingState />;

    if (!habitacion) return <NotFoundState />;

    return (
        <div className="bg-amber-50">
            {/* Breadcrumbs */}
            <Breadcrumbs roomName={habitacion.name} />

            {/* Header Section */}
            <RoomHeader roomName={habitacion.name} />

            <div className="container mx-auto px-4 py-8">
                <div className="md:flex md:space-x-8">
                    {/* Main Content - Left */}
                    <div className="md:w-2/3">
                        {/* Image Gallery */}
                        <ImageGallery 
                            images={habitacion.imageGallery}
                            activeIndex={activeImageIndex}
                            onPrevImage={prevImage}
                            onNextImage={nextImage}
                            onSelectImage={setActiveImageIndex}
                        />

                        {/* Description and Details */}
                        <RoomDescription 
                            roomName={habitacion.name}
                            amenities={habitacion.amenities}
                        />

                        {/* Related Rooms */}
                        <RelatedRooms rooms={relatedRooms} />
                    </div>

                    {/* Sidebar - Right */}
                    <div className="md:w-1/3">
                        {/* Booking Card */}
                        <BookingCard 
                            price={habitacion.price}
                            nights={nights}
                            dateRange={dateRange}
                            onDateChange={handleDateRangeChange}
                            guests={guests}
                            maxGuests={firstCharToNumber(habitacion.amenities[0])}
                            onGuestsChange={handleGuestsChange}
                            locations={sedes}
                            selectedLocation={selectedLocation}
                            onLocationChange={handleLocationChange}
                            calculateTotalPrice={calculateTotalPrice}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomDetail;