import React, { useState, useEffect } from "react";
import { Clock, Tag, Calendar, ChevronRight } from "lucide-react";
import colors from "./../../helpers/ColorsHelper.js";
import { formatToTwoDecimals } from "../../helpers/NumberHelper.js";

const PromoCard = ({
    title = "",
    image = "",
    originalPricePerNight = 0,
    discountPercent = 0,
    expirationDate = "",
    nights = 0,
    location = "",
    description = ""
}) => {
    const originalTotalPrice = originalPricePerNight * nights;
    const discountedPrice = originalTotalPrice * (1 - discountPercent);
    const discountedPricePerNight = discountedPrice / nights;

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    // Estado para controlar si la oferta ha expirado
    const [isExpired, setIsExpired] = useState(false);

    // Tiempo restante
    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = new Date(expirationDate) - new Date();

            // Verificar si ha expirado
            if (difference <= 0) {
                setIsExpired(true);
                return {
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                };
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        };

        // Verificar inicialmente si ya expiró
        const timeRemaining = calculateTimeLeft();
        setTimeLeft(timeRemaining);

        // Configurar intervalo para actualizar el contador solo si no ha expirado
        let timer;
        if (!isExpired) {
            timer = setInterval(() => {
                const updatedTime = calculateTimeLeft();
                setTimeLeft(updatedTime);
            }, 1000);
        }

        // Limpiar intervalo
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [expirationDate, isExpired]);

    // Formatear fecha de expiración
    const formatExpirationDate = () => {
        const date = new Date(expirationDate);
        return date.toLocaleDateString("es-PE", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div
            className="mx-auto max-w-md overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl h-full flex flex-col relative"
            style={{ backgroundColor: colors.white }}
        >
            {/* Máscara oscura y cinta de expiración - Solo si ha expirado */}
            {isExpired && (
                <>
                    {/* Máscara oscura */}
                    <div className="absolute inset-0 z-10 bg-black opacity-30 pointer-events-none"></div>

                    {/* Cinta diagonal */}
                    <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
                        <div
                            className="absolute w-full text-center py-2 font-bold text-white transform rotate-45 shadow-lg"
                            style={{
                                backgroundColor: colors.primary,
                                top: '15%',
                                right: '-35%',
                                width: '150%'
                            }}
                        >
                            OFERTA EXPIRADA
                        </div>
                    </div>
                </>
            )}

            {/* Ribbon con porcentaje de descuento */}
            <div className="relative">
                <div className="absolute top-4 right-0 z-5">
                    <div
                        className="flex items-center px-3 py-1 font-bold"
                        style={{ backgroundColor: colors.amber, color: colors.white }}
                    >
                        <Tag size={14} className="mr-1" />
                        <span>-{Math.round(discountPercent * 100)}%</span>
                    </div>
                </div>

                {/* Imagen */}
                <div className="relative h-48">
                    <img src={image} alt={title} className="h-full w-full object-cover" />

                    {/* Ubicación */}
                    <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 p-2">
                        <p className="text-sm font-medium text-white">{location}</p>
                    </div>
                </div>
            </div>

            {/* Contenido */}
            <div className="p-5 flex flex-col flex-grow">
                {/* Contador */}
                <div
                    className="mb-4 rounded-lg p-2"
                    style={{ backgroundColor: colors.amber + "20" }}
                >
                    <div className="mb-1 flex items-center">
                        <Clock
                            size={16}
                            style={{ color: colors.primary }}
                            className="mr-1"
                        />
                        <span
                            className="text-xs font-medium"
                            style={{ color: colors.darkBrown }}
                        >
                            Oferta termina en:
                        </span>
                    </div>
                    <div className="grid grid-cols-4 gap-1 text-center">
                        <div className="flex flex-col">
                            <div
                                className="text-lg font-bold"
                                style={{ color: colors.primary }}
                            >
                                {timeLeft.days}
                            </div>
                            <div className="text-xs" style={{ color: colors.darkBrown }}>
                                Días
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div
                                className="text-lg font-bold"
                                style={{ color: colors.primary }}
                            >
                                {timeLeft.hours}
                            </div>
                            <div className="text-xs" style={{ color: colors.darkBrown }}>
                                Horas
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div
                                className="text-lg font-bold"
                                style={{ color: colors.primary }}
                            >
                                {timeLeft.minutes}
                            </div>
                            <div className="text-xs" style={{ color: colors.darkBrown }}>
                                Minutos
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div
                                className="text-lg font-bold"
                                style={{ color: colors.primary }}
                            >
                                {timeLeft.seconds}
                            </div>
                            <div className="text-xs" style={{ color: colors.darkBrown }}>
                                Segundos
                            </div>
                        </div>
                    </div>
                </div>

                {/* Título */}
                <h3
                    className="mb-2 text-xl font-bold"
                    style={{ color: colors.darkBrown }}
                >
                    {title}
                </h3>

                {/* Detalles */}
                <div className="mb-4 flex items-center">
                    <Calendar
                        size={16}
                        style={{ color: colors.primary }}
                        className="mr-1"
                    />
                    <span className="text-sm" style={{ color: colors.darkBrown }}>
                        {nights} noche{nights > 1 ? "s" : ""} | Válido hasta: {formatExpirationDate()}
                    </span>
                </div>

                {/* Descripción */}
                <div
                    className="mb-4 text-sm flex-grow"
                    style={{ color: colors.darkBrown }}
                >
                    <p>{description}</p>
                </div>

                {/* Precios */}
                <div className="mb-4 flex items-end">
                    <div className="mr-2">
                        <span
                            className="text-sm line-through"
                            style={{ color: colors.darkBrown }}
                        >
                            S/. {originalTotalPrice}
                        </span>
                        <div
                            className="text-2xl font-bold"
                            style={{ color: colors.primary }}
                        >
                            S/. {discountedPrice.toFixed(0)}
                        </div>
                    </div>
                    <span className="text-xs pb-1" style={{ color: colors.darkBrown }}>
                        (S/ {formatToTwoDecimals(discountedPricePerNight)} por noche)
                    </span>
                </div>

                {/* CTA */}
                <button
                    className={`flex w-full items-center justify-center rounded-lg py-3 font-bold transition-transform duration-300 
                        ${isExpired ? 'cursor-not-allowed bg-gray-500 text-gray-300' : 'cursor-pointer text-white hover:scale-105'}`}
                    style={{ backgroundColor: isExpired ? '#9E9E9E' : colors.primary }}
                    disabled={isExpired}
                >
                    ¡Reservar Ahora! <ChevronRight size={18} className="ml-1" />
                </button>
            </div>
        </div>
    );
};

export default PromoCard;