import { useState } from "react";
import SuiteCard from "../../components/hotel/SuiteCard";
import HotelCarousel from "../../components/hotel/HotelCarousel";

function Home() {
  const [count, setCount] = useState(0);

  const tiposHabitacion = [
    { id: "01-STD-S", name: "Standard Simple", url: "https://hoteloroverdesuitesiquitos.com/wp-content/uploads/2021/07/Simple-1-1-scaled.jpg", price: 120, detailsUrl: "habitacion/01-STD-S", amenities: ["1 persona", "Servicios básicos", "TV estándar"] },
    { id: "02-STD-D", name: "Standard Doble", url: "https://losgavilaneshotel.com/wp-content/uploads/2023/09/01-7.jpg", price: 150, detailsUrl: "habitacion/02-STD-D", amenities: ["2 personas", "Servicios básicos", "TV estándar"] },
    { id: "03-SUP-Q", name: "Superior Queen", url: "https://vizahotel.com/images/rooms/matrimonial-queen/img1.jpg", price: 180, detailsUrl: "habitacion/03-SUP-Q", amenities: ["2 personas", "Servicios básicos", "Smart TV"] },
    { id: "04-STD-K", name: "Superior King", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeBY5n0_QIe3TwIkg4vWKvCqOG466-1wWq9g&s", price: 200, detailsUrl: "habitacion/04-STD-K", amenities: ["2 personas", "Servicios básicos", "Smart TV"] },
    { id: "07-JRS-CK", name: "Junior Suite California King", url: "https://e00-telva.uecdn.es/imagenes/2015/05/12/estilo_de_vida/1431423946_17_625.jpg", price: 500, detailsUrl: "habitacion/07-JRS-CK", amenities: ["2 personas", "100% lujo", "Preferencial"] },
  ];

  return (
  <>
    <section className="p-6">
      <HotelCarousel />
      <div className="flex justify-center gap-4">
        {tiposHabitacion.map((tipo) => (
          <SuiteCard
            title={tipo.name}
            imageUrl={tipo.url}
            pricePerNight={tipo.price}
            detailsUrl={tipo.detailsUrl}
            amenities={tipo.amenities}
          />
        ))}
        
      </div>      
    </section>
  </>);
}

export default Home;
