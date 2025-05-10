import { CheckCircle, Wifi, Coffee, Users, CreditCard } from "lucide-react";
import colors from "../../helpers/ColorsHelper.js";

function RoomDescription({ roomName, amenities }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: colors.darkBrown }}>Acerca de esta habitación</h2>

            <p className="text-gray-700 mb-6">
                Sumérgete en el lujo y la comodidad de nuestra habitación {roomName.toLowerCase()},
                diseñada para brindarte una experiencia excepcional durante tu estancia.
                Con un equilibrio perfecto entre elegancia peruana tradicional y comodidades modernas,
                esta habitación te ofrece un espacio ideal para descansar después de explorar las maravillas de Perú.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <h3 className="font-bold mb-3 text-lg" style={{ color: colors.darkBrown }}>Características principales</h3>
                    <ul className="space-y-2">
                        {amenities.map((amenity, index) => (
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

            <RoomPolicies maxGuests={parseInt(amenities[0])} />
        </div>
    );
}

// RoomPolicies subcomponent
function RoomPolicies({ maxGuests }) {
    return (
        <div className="border-t border-gray-200 pt-6">
            <h3 className="font-bold mb-3 text-lg" style={{ color: colors.darkBrown }}>Políticas de la habitación</h3>
            <ul className="space-y-2 text-gray-700">
                <li>• Check-in: 12:00 PM / Check-out: 10:00 AM</li>
                <li>• Política de no fumar</li>
                <li>• Se permite un máximo de {maxGuests} huéspedes</li>
                <li>• Mascotas no permitidas</li>
            </ul>
        </div>
    );
}

export default RoomDescription;