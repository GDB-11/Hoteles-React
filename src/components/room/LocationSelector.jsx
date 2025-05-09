import { MapPin, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import colors from "../../helpers/ColorsHelper.js";

function LocationSelector({ locations, selectedLocation, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Manejar clic fuera del dropdown para cerrarlo
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLocationSelect = (location) => {
    onChange(location);
    setIsOpen(false);
  };

  return (
    <div className="w-full" ref={dropdownRef}>
      <label className="block text-sm font-medium mb-1" style={{ color: colors.darkBrown }}>
        Sede del Hotel
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between border rounded-md p-2 bg-white transition-colors hover:bg-amber-50"
          style={{ borderColor: isOpen ? colors.primary : colors.mediumGray }}
        >
          <div className="flex items-center">
            <MapPin size={20} style={{ color: colors.primary }} />
            <span className="ml-2 text-sm">{selectedLocation || "Selecciona una sede"}</span>
          </div>
          <ChevronDown
            size={18}
            className={`transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`}
            style={{ color: colors.primary }}
          />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto"
               style={{ borderColor: colors.mediumGray }}>
            <ul className="py-1">
              {locations.map((location, index) => (
                <li key={index}>
                  <button
                    type="button"
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-amber-50 flex items-center ${
                      selectedLocation === location ? "bg-amber-100 font-medium" : ""
                    }`}
                    onClick={() => handleLocationSelect(location)}
                  >
                    <MapPin
                      size={16}
                      className="mr-2"
                      style={{ color: selectedLocation === location ? colors.primary : "currentColor" }}
                    />
                    {location}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default LocationSelector;