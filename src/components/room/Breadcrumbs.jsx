import { Link } from "react-router-dom";

function Breadcrumbs({ roomName }) {
    return (
        <div className="container mx-auto px-4 py-4">
            <nav className="text-sm">
                <ol className="flex items-center space-x-2">
                    <li>
                        <Link to="/" className="text-amber-700 hover:text-amber-900">Inicio</Link>
                    </li>
                    <li className="flex items-center">
                        <span className="mx-1 text-gray-500">/</span>
                        <span className="text-gray-600">{roomName}</span>
                    </li>
                </ol>
            </nav>
        </div>
    );
}

export default Breadcrumbs;