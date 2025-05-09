import { formatToTwoDecimals } from "../../helpers/NumberHelper";
import RangeDatePicker from "../../components/shared/RangeDatePicker";
import colors from "../../helpers/ColorsHelper.js";
import GuestSelector from "./GuestSelector.jsx";
import LocationSelector from "./LocationSelector.jsx";

function BookingCard({
    price,
    nights,
    dateRange,
    onDateChange,
    guests,
    maxGuests,
    onGuestsChange,
    locations,
    selectedLocation,
    onLocationChange,
    calculateTotalPrice
}) {
    const handleGuestsChange = (increment) => {
        onGuestsChange(increment);
    };

    const isFormValid = () => {
        return dateRange.startDate && dateRange.endDate && selectedLocation;
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <div className="flex items-center mb-6">
                <h3 className="text-2xl font-bold" style={{ color: colors.darkBrown }}>S/ {price}</h3>
                <span className="text-gray-600 pl-1.5">/ noche</span>
            </div>

            <form className="space-y-4">
                {/* Location Selector */}
                <LocationSelector
                    locations={locations}
                    selectedLocation={selectedLocation}
                    onChange={onLocationChange}
                />

                {/* Date Range Picker */}
                <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: colors.darkBrown }}>Fechas de estancia</label>
                    <RangeDatePicker
                        value={dateRange}
                        onChange={onDateChange}
                        placeholder="Selecciona las fechas"
                    />
                </div>

                {/* Guest Selector Component */}
                <GuestSelector 
                    guests={guests}
                    maxGuests={maxGuests}
                    onChange={handleGuestsChange}
                />

                {/* CTA Button */}
                <button
                    type="button"
                    className="w-full py-3 rounded-full text-white font-medium text-center transition-all hover:bg-amber-700 active:scale-[0.98] cursor-pointer"
                    style={{ backgroundColor: colors.primary }}
                >
                    Reservar Ahora
                </button>
            </form>

            {/* Price Breakdown */}
            {/* Mostrar breakdown completo si hay un rango de fechas válido y una sede seleccionada */}
            <div className="mt-6 border-t border-gray-200 pt-4">
                {isFormValid() && (
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-600">S/ {formatToTwoDecimals(price * (1 - 0.18))} x {nights} {nights === 1 ? 'noche' : 'noches'}</span>
                        <span>S/ {formatToTwoDecimals((price * nights) * (1 - 0.18))}</span>
                    </div>
                )}

                {isFormValid() && (
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-600">IGV (18%)</span>
                        <span>S/ {formatToTwoDecimals(price * nights * 0.18)}</span>
                    </div>
                )}

                <div className="flex justify-between font-bold mt-3 pt-3 border-t border-gray-200">
                    <span>Total</span>
                    <span>S/ {isFormValid() ? formatToTwoDecimals(calculateTotalPrice()) : "-"}</span>
                </div>
            </div>

            {/* Información de estadía */}
            {isFormValid() && (
                <div className="mt-4 p-3 bg-amber-50 rounded-md">
                    <p className="text-sm text-amber-800 font-medium">
                        Tu estancia de {nights} {nights === 1 ? 'noche' : 'noches'} en {selectedLocation} está lista para ser reservada
                    </p>
                </div>
            )}

            {/* Policies */}
            <div className="mt-6 text-xs text-gray-500">
                <p>No se realizará ningún cargo hasta confirmar la reserva. Cancelación gratuita 72 horas antes del check-in.</p>
            </div>
        </div>
    );
}

export default BookingCard;