import { useParams, useNavigate, Link } from "react-router-dom";
import { useHotelData } from "../../contexts/ApiContext";
import { useEffect, useState } from "react";
import {
    Users,
    Wifi,
    CreditCard,
    Coffee,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    ArrowRight
} from "lucide-react";
import colors from "./../../helpers/ColorsHelper.js";
import { firstCharToNumber, formatToTwoDecimals } from "../../helpers/NumberHelper";
import RangeDatePicker from "../../components/shared/RangeDatePicker";
import { calculateNights } from "../../helpers/DateHelper";

function RoomDetail() {
    const { id } = useParams();
    const { habitaciones, isLoading } = useHotelData();
    const [habitacion, setHabitacion] = useState(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null
    });
    const [guests, setGuests] = useState(1);
    const [nights, setNights] = useState(1);
    const navigate = useNavigate();

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
        console.log("dateRange effect triggered:", dateRange);
        
        if (dateRange.startDate && dateRange.endDate) {
            console.log("Dates found - calculating nights:", 
                dateRange.startDate instanceof Date, 
                dateRange.endDate instanceof Date
            );
            const nightsCount = calculateNights(dateRange.startDate, dateRange.endDate);
            console.log("Calculated nights:", nightsCount);
            setNights(nightsCount > 0 ? nightsCount : 1);
        } else {
            console.log("No complete date range, using default night count");
            setNights(1);
        }
    }, [dateRange]);

    const handleDateRangeChange = (newRange) => {
        console.log("New range received:", newRange); // For debugging
        
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

    if (isLoading) return (
        <div className="container mx-auto px-4 py-16">
            <div className="flex justify-center items-center h-64">
                <div className="animate-pulse text-xl text-amber-800">
                    Cargando información de la habitación...
                </div>
            </div>
        </div>
    );

    if (!habitacion) return (
        <div className="container mx-auto px-4 py-16">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h2 className="text-2xl font-bold text-amber-800 mb-4">Habitación no encontrada</h2>
                <p className="text-gray-600 mb-6">La habitación que estás buscando no existe o ha sido removida.</p>
                <button
                    onClick={() => navigate("/")}
                    className="px-6 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors"
                    style={{ backgroundColor: colors.primary }}
                >
                    Volver al inicio
                </button>
            </div>
        </div>
    );

    return (
        <div className="bg-amber-50">
            {/* Breadcrumbs */}
            <div className="container mx-auto px-4 py-4">
                <nav className="text-sm">
                    <ol className="flex items-center space-x-2">
                        <li>
                            <Link to="/" className="text-amber-700 hover:text-amber-900">Inicio</Link>
                        </li>
                        <li className="flex items-center">
                            <span className="mx-1 text-gray-500">/</span>
                            <span className="text-gray-600">{habitacion.name}</span>
                        </li>
                    </ol>
                </nav>
            </div>

            {/* Header Section */}
            <div style={{ backgroundColor: colors.beige }} className="py-6">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold" style={{ color: colors.darkBrown }}>
                        {habitacion.name}
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="md:flex md:space-x-8">
                    {/* Main Content - Left */}
                    <div className="md:w-2/3">
                        {/* Image Gallery */}
                        <div className="relative rounded-lg overflow-hidden shadow-lg mb-8">
                            <div className="aspect-video bg-gray-100 relative">
                                {habitacion.imageGallery && (
                                    <img
                                        src={habitacion.imageGallery[activeImageIndex]}
                                        alt={`${habitacion.name} - vista ${activeImageIndex + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                )}

                                {/* Navigation arrows */}
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full shadow hover:bg-opacity-100 transition-all"
                                >
                                    <ChevronLeft size={24} style={{ color: colors.darkBrown }} />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full shadow hover:bg-opacity-100 transition-all"
                                >
                                    <ChevronRight size={24} style={{ color: colors.darkBrown }} />
                                </button>

                                {/* Image indicators */}
                                {habitacion.imageGallery && (
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                        {habitacion.imageGallery.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setActiveImageIndex(index)}
                                                className={`w-2 h-2 rounded-full ${index === activeImageIndex
                                                        ? 'bg-white'
                                                        : 'bg-white bg-opacity-50'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Thumbnail strip */}
                            {habitacion.imageGallery && habitacion.imageGallery.length > 1 && (
                                <div className="flex space-x-2 overflow-x-auto p-2">
                                    {habitacion.imageGallery.map((imgSrc, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveImageIndex(index)}
                                            className={`flex-shrink-0 w-20 h-16 rounded-md overflow-hidden ${index === activeImageIndex ? 'ring-2 ring-amber-600' : ''
                                                }`}
                                        >
                                            <img
                                                src={imgSrc}
                                                alt={`Miniatura ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Description and Details */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                            <h2 className="text-2xl font-bold mb-4" style={{ color: colors.darkBrown }}>Acerca de esta habitación</h2>

                            <p className="text-gray-700 mb-6">
                                Sumérgete en el lujo y la comodidad de nuestra habitación {habitacion.name.toLowerCase()},
                                diseñada para brindarte una experiencia excepcional durante tu estancia.
                                Con un equilibrio perfecto entre elegancia peruana tradicional y comodidades modernas,
                                esta habitación te ofrece un espacio ideal para descansar después de explorar las maravillas de Perú.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <h3 className="font-bold mb-3 text-lg" style={{ color: colors.darkBrown }}>Características principales</h3>
                                    <ul className="space-y-2">
                                        {habitacion.amenities.map((amenity, index) => (
                                            <li key={index} className="flex items-center">
                                                <CheckCircle size={18} className="mr-2 flex-shrink-0" style={{ color: colors.primary }} />
                                                <span>{amenity}</span>
                                            </li>
                                        ))}
                                        <li className="flex items-center">
                                            <CheckCircle size={18} className="mr-2 flex-shrink-0" style={{ color: colors.primary }} />
                                            <span>Baño privado</span>
                                        </li>
                                        <li className="flex items-center">
                                            <CheckCircle size={18} className="mr-2 flex-shrink-0" style={{ color: colors.primary }} />
                                            <span>Acceso a piscina y áreas comunes</span>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-bold mb-3 text-lg" style={{ color: colors.darkBrown }}>Servicios incluidos</h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-center">
                                            <Wifi size={18} className="mr-2 flex-shrink-0" style={{ color: colors.primary }} />
                                            <span>WiFi de alta velocidad</span>
                                        </li>
                                        <li className="flex items-center">
                                            <Coffee size={18} className="mr-2 flex-shrink-0" style={{ color: colors.primary }} />
                                            <span>Desayuno buffet peruano</span>
                                        </li>
                                        <li className="flex items-center">
                                            <Users size={18} className="mr-2 flex-shrink-0" style={{ color: colors.primary }} />
                                            <span>Servicio a la habitación</span>
                                        </li>
                                        <li className="flex items-center">
                                            <CheckCircle size={18} className="mr-2 flex-shrink-0" style={{ color: colors.primary }} />
                                            <span>Limpieza diaria</span>
                                        </li>
                                        <li className="flex items-center">
                                            <CreditCard size={18} className="mr-2 flex-shrink-0" style={{ color: colors.primary }} />
                                            <span>Sin cargo por cancelación (72h antes)</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-6">
                                <h3 className="font-bold mb-3 text-lg" style={{ color: colors.darkBrown }}>Políticas de la habitación</h3>
                                <ul className="space-y-2 text-gray-700">
                                    <li>• Check-in: 12:00 PM / Check-out: 10:00 AM</li>
                                    <li>• Política de no fumar</li>
                                    <li>• Se permite un máximo de {parseInt(habitacion.amenities[0])} huéspedes</li>
                                    <li>• Mascotas no permitidas</li>
                                </ul>
                            </div>
                        </div>

                        {/* Related Rooms */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.darkBrown }}>Habitaciones similares</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {relatedRooms.map(room => (
                                    <div key={room.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                        <div className="h-40 bg-gray-200">
                                            <img src={room.url} alt={room.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-bold" style={{ color: colors.darkBrown }}>{room.name}</h3>
                                            <p className="text-amber-600 font-bold mt-1">S/ {room.price} / noche</p>
                                            <Link
                                                to={`/habitacion/${room.id}`}
                                                className="flex items-center mt-3 text-sm font-medium"
                                                style={{ color: colors.primary }}
                                            >
                                                Ver detalles <ArrowRight size={16} className="ml-1" />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Right */}
                    <div className="md:w-1/3">
                        {/* Booking Card */}
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                            <div className="flex items-center mb-6">
                                <h3 className="text-2xl font-bold" style={{ color: colors.darkBrown }}>S/ {habitacion.price}</h3>
                                <span className="text-gray-600 pl-1.5">/ noche</span>
                            </div>

                            <form className="space-y-4">
                                {/* Date Range Picker */}
                                <div>
                                    <label className="block text-sm font-medium mb-1" style={{ color: colors.darkBrown }}>Fechas de estancia</label>
                                    <RangeDatePicker
                                        value={dateRange}
                                        onChange={handleDateRangeChange}
                                        placeholder="Selecciona las fechas"
                                    />
                                </div>

                                {/* Guests selection */}
                                <div>
                                    <label className="block text-sm font-medium mb-1" style={{ color: colors.darkBrown }}>Huéspedes</label>
                                    <div className="flex items-center border rounded-md p-2" style={{ borderColor: colors.mediumGray }}>
                                        <Users size={18} style={{ color: colors.primary }} />
                                        <div className="flex items-center justify-between w-full pl-2">
                                            <span className="text-sm">{guests} {guests === 1 ? 'Huésped' : 'Huéspedes'}</span>
                                            <div className="flex space-x-2">
                                                <button
                                                    type="button"
                                                    onClick={() => handleGuestsChange(-1)}
                                                    className={`w-6 h-6 flex items-center justify-center rounded-full ${guests > 1 ? 'bg-gray-200' : 'bg-gray-100 text-gray-400'
                                                        }`}
                                                >
                                                    -
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleGuestsChange(1)}
                                                    className={`w-6 h-6 flex items-center justify-center rounded-full ${guests < firstCharToNumber(habitacion.amenities[0]) ? 'bg-gray-200' : 'bg-gray-100 text-gray-400'
                                                        }`}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <button
                                    type="button"
                                    className="w-full py-3 rounded-full text-white font-medium text-center"
                                    style={{ backgroundColor: colors.primary }}
                                >
                                    Reservar Ahora
                                </button>
                            </form>

                            {/* Price Breakdown */}
                            <div className="mt-6 border-t border-gray-200 pt-4">
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">S/ {formatToTwoDecimals(habitacion.price)} x {nights} {nights === 1 ? 'noche' : 'noches'}</span>
                                    <span>S/ {formatToTwoDecimals((habitacion.price * nights)*(1-0.18))}</span>
                                </div>
                                
                                {/* Mostrar IGV si hay un rango de fechas válido */}
                                {dateRange.startDate && dateRange.endDate && (
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">IGV (18%)</span>
                                        <span>S/ {formatToTwoDecimals(habitacion.price * nights * 0.18)}</span>
                                    </div>
                                )}
                                
                                <div className="flex justify-between font-bold mt-3 pt-3 border-t border-gray-200">
                                    <span>Total</span>
                                    <span>S/ {formatToTwoDecimals(calculateTotalPrice())}</span>
                                </div>
                            </div>

                            {/* Información de estadía */}
                            {dateRange.startDate && dateRange.endDate && (
                                <div className="mt-4 p-3 bg-amber-50 rounded-md">
                                    <p className="text-sm text-amber-800 font-medium">
                                        Tu estancia de {nights} {nights === 1 ? 'noche' : 'noches'} está lista para ser reservada
                                    </p>
                                </div>
                            )}

                            {/* Policies */}
                            <div className="mt-6 text-xs text-gray-500">
                                <p>No se realizará ningún cargo hasta confirmar la reserva. Cancelación gratuita 72 horas antes del check-in.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomDetail;