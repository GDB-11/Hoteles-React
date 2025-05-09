import { useHotelData } from "../../contexts/ApiContext";
import SuiteCard from "../../components/hotel/SuiteCard";
import HotelCarousel from "../../components/hotel/HotelCarousel";

function Home() {
  const { habitaciones, isLoading, error } = useHotelData();

  return (
    <>
      <section className="p-6">
        <HotelCarousel />
        
        <h2 className="text-3xl font-bold text-center my-8" style={{color: '#332211'}}>
          Nuestras Habitaciones
        </h2>
        
        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{borderColor: '#bb4d00'}}></div>
            <p className="mt-4 text-center text-gray-600">Cargando habitaciones...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-red-600 text-center">
              <h2 className="text-xl font-bold mb-2">Error al cargar las habitaciones</h2>
              <p>{error}</p>
              <button 
                className="mt-4 px-4 py-2 text-white rounded-md"
                style={{backgroundColor: '#bb4d00'}}
                onClick={() => window.location.reload()}
              >
                Reintentar
              </button>
            </div>
          </div>
        ) : !habitaciones || habitaciones.length === 0 ? (
          <p className="text-center">No hay habitaciones disponibles en este momento.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {habitaciones.map((habitacion) => (
              <SuiteCard
                key={habitacion.id}
                title={habitacion.name}
                imageUrl={habitacion.url}
                pricePerNight={habitacion.price}
                detailsUrl={habitacion.detailsUrl}
                amenities={habitacion.amenities}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default Home;