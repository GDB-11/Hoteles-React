import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import colors from "../../helpers/ColorsHelper.js";

function RelatedRooms({ rooms }) {
    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.darkBrown }}>Habitaciones similares</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {rooms.map(room => (
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
    );
}

export default RelatedRooms;