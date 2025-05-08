import React from "react";

function SuiteCard({
  title = "",
  imageUrl = "",
  pricePerNight = 0,
  detailsUrl = "#",
  amenities = []
}) {
  return (
    <div className="w-80 overflow-hidden rounded-lg border border-amber-200 bg-white shadow-md transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
      {/* Imagen con overlay para precio */}
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={imageUrl} 
          alt={`Habitación ${title}`} 
          className="h-full w-full object-cover"
        />
        
        {/* Badge de precio */}
        {pricePerNight > 0 && (
          <div className="absolute bottom-3 right-3 rounded-full bg-amber-700 px-3 py-1 text-sm font-bold text-white shadow-md">
            S/ {pricePerNight} <span className="text-xs font-normal">/ noche</span>
          </div>
        )}
      </div>
      
      {/* Contenido */}
      <div className="p-4">
        {/* Título */}
        <h3 className="text-lg font-bold text-amber-900">{title}</h3>
        
        {/* Amenidades */}
        {amenities && amenities.length > 0 && (
          <div className="mt-3">
            <div className="flex flex-wrap gap-1">
              {amenities.slice(0, 3).map((amenity, index) => (
                <span key={index} className="rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-800">
                  {amenity}
                </span>
              ))}
              {amenities.length > 3 && (
                <span className="rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-800">
                  +{amenities.length - 3} más
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Botón de detalles */}
        <div className="mt-4">
          <a 
            href={detailsUrl}
            className="block w-full rounded-md bg-gradient-to-r from-amber-600 to-amber-800 py-2 text-center font-medium text-white shadow-sm transition-colors hover:from-amber-700 hover:to-amber-900"
          >
            Ver Detalles
          </a>
        </div>
      </div>
    </div>
  );
}

export default SuiteCard;