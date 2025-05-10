import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function SuiteCard({
  title = "",
  imageUrl = "",
  pricePerNight = 0,
  detailsUrl = "#",
  amenities = [],
}) {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640);
  
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div className="w-full overflow-hidden rounded-lg border border-amber-200 bg-white shadow-md transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
      {/* Imagen con overlay para precio - responsive height */}
      <div className="relative w-full overflow-hidden aspect-[4/3] sm:aspect-[16/9] md:aspect-[4/3]">
        <img
          src={imageUrl}
          alt={`Habitación ${title}`}
          className="h-full w-full object-cover"
          loading="lazy"
        />

        {/* Badge de precio - responsive sizing */}
        {pricePerNight > 0 && (
          <div className="absolute right-2 sm:right-3 bottom-2 sm:bottom-3 rounded-full bg-amber-700 px-2 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm font-bold text-white shadow-md">
            S/ {pricePerNight}{" "}
            <span className="text-2xs sm:text-xs font-normal">/ noche</span>
          </div>
        )}
      </div>

      {/* Contenido - responsive padding */}
      <div className="p-3 sm:p-4">
        {/* Título - responsive text size */}
        <h3 className="text-base sm:text-lg font-bold text-amber-900 line-clamp-1">{title}</h3>

        {/* Amenidades - responsive layout */}
        {amenities && amenities.length > 0 && (
          <div className="mt-2 sm:mt-3">
            <div className="flex flex-wrap gap-1">
              {/* Show fewer amenities on smaller screens */}
              {amenities.slice(0, isSmallScreen ? 2 : 3).map((amenity, index) => (
                <span
                  key={index}
                  className="rounded-full bg-amber-100 px-1.5 py-0.5 sm:px-2 sm:py-1 text-2xs sm:text-xs text-amber-800 whitespace-nowrap"
                >
                  {amenity}
                </span>
              ))}
              {amenities.length > (isSmallScreen ? 2 : 3) && (
                <span className="rounded-full bg-amber-100 px-1.5 py-0.5 sm:px-2 sm:py-1 text-2xs sm:text-xs text-amber-800">
                  +{amenities.length - (isSmallScreen ? 2 : 3)} más
                </span>
              )}
            </div>
          </div>
        )}

        {/* Botón de detalles - responsive padding */}
        <div className="mt-3 sm:mt-4">
          <Link
            to={detailsUrl}
            className="block w-full rounded-md bg-gradient-to-r from-amber-600 to-amber-800 py-1.5 sm:py-2 text-center text-sm sm:text-base font-medium text-white shadow-sm transition-colors hover:from-amber-700 hover:to-amber-900"
          >
            Ver Detalles
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SuiteCard;