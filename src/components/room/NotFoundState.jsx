import { useNavigate } from "react-router-dom";
import colors from "../../helpers/ColorsHelper.js";

function NotFoundState() {
    const navigate = useNavigate();
    
    return (
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
}

export default NotFoundState;