import PromoCard from "../../components/promociones/PromoCard";

function Offers() {
    const promociones = [
        {
            title: "Suite de Lujo con Vista al Mar",
            image: "https://img.freepik.com/foto-gratis/suite-dormitorio-lujo-hotel-resort-gran-altura-mesa-trabajo_105762-1783.jpg",
            originalPricePerNight: 1200,
            discountPercent: 0.30,
            expirationDate: "2025-06-15T23:59:59",
            nights: 3,
            location: "Miraflores, Lima",
            description: "Disfruta de vistas panorámicas al océano Pacífico desde nuestra exclusiva suite de lujo. Incluye desayuno gourmet, acceso al spa y traslado desde el aeropuerto."
        },
        {
            title: "Escapada Familiar",
            image: "https://www.riversideparkhotel.com/wp-content/uploads/2020/11/family_room_oct_2020_1-1366x768-fp_mm-fpoff_0_0.jpg",
            originalPricePerNight: 450,
            discountPercent: 0.25,
            expirationDate: "2025-05-30T23:59:59",
            nights: 2,
            location: "Surco, Lima",
            description: "Perfecta para familias. Habitación con 3 camas, piscina, atracciones para los pequeños y muchos videojuegos. ¡Imperdible!"
        },
        {
            title: "Escapada Romántica en Chachapoyas",
            image: "https://static.vecteezy.com/system/resources/thumbnails/044/020/296/small_2x/sumptuous-circular-bed-in-art-deco-inspired-upscale-suite-exuding-luxury-and-opulence-photo.jpeg",
            originalPricePerNight: 300,
            discountPercent: 0.35,
            expirationDate: "2025-07-20T23:59:59",
            nights: 4,
            location: "Chachapoyas, Amazonas",
            description: "Perfecta para parejas. Habitación con jacuzzi privado, cena a la luz de las velas y tour privado por el Valle Sagrado. ¡Sorprende a tu pareja!"
        },
        {
            "title": "Sabores Auténticos en Chachapoyas",
            "image": "https://www.kayak.com.pe/rimg/himg/37/04/be/expediav2-313208-643faf-864305.jpg?width=1366&height=768&crop=true",
            "originalPricePerNight": 220,
            "discountPercent": 0.20,
            "expirationDate": "2025-05-08T15:39:20",
            "nights": 3,
            "location": "Chachapoyas, Amazonas",
            "description": "Explora los sabores ancestrales de Chachapoyas con clases de cocina, recorridos gastronómicos y cenas en los mejores restaurantes locales."
        },
        {
            "title": "Refugio Tropical en Bagua Grande",
            "image": "https://image-tc.galaxy.tf/wijpeg-ejx8cea1jgcd7ag25qpbl2nah/baya-double-bed-suite-1_wide.jpg?crop=0%2C99%2C1920%2C1080",
            "originalPricePerNight": 300,
            "discountPercent": 0.40,
            "expirationDate": "2025-05-25T23:59:59",
            "nights": 5,
            "location": "Bagua, Amazonas",
            "description": "Disfruta de una escapada tropical en el corazón de Amazonas. Relájate en bungalows rodeados de palmeras, experimenta deportes acuáticos y disfruta de cócteles exóticos."
        },
        {
            "title": "Experiencia Cultural en Lima",
            "image": "https://plus.unsplash.com/premium_photo-1661963239507-7bdf41a5e66b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bHV4dXJ5JTIwaG90ZWwlMjByb29tfGVufDB8fDB8fHww",
            "originalPricePerNight": 450,
            "discountPercent": 0.15,
            "expirationDate": "2025-07-05T23:59:59",
            "nights": 4,
            "location": "Surco, Lima",
            "description": "Explora la riqueza cultural de Lima con un paquete especial. Incluye visitas guiadas a sitios históricos, gastronomía local y actividades recreativas para toda la familia."
        },
        {
            "title": "Lujo y Naturaleza en Huaraz",
            "image": "https://images.trvl-media.com/lodging/97000000/96770000/96761200/96761185/917120ee.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
            "originalPricePerNight": 1200,
            "discountPercent": 0.22,
            "expirationDate": "2025-06-25T23:59:59",
            "nights": 2,
            "location": "Huaraz, Ancash",
            "description": "Vive una experiencia de lujo en medio de los majestuosos paisajes de la Cordillera Blanca. Disfruta de vistas panorámicas, expediciones exclusivas y relajación total."
        },
        {
            "title": "Bienestar y Conexión en Bagua",
            "image": "https://bowerbird-app.s3.us-west-2.amazonaws.com/production/uploads/kit/image/582651/large_hd%2Bvk_DOUXE_flagshipstore_04_LR.jpg",
            "originalPricePerNight": 150,
            "discountPercent": 0.28,
            "expirationDate": "2025-08-15T23:59:59",
            "nights": 3,
            "location": "Bagua, Amazonas",
            "description": "Encuentra paz y bienestar en un retiro rodeado de naturaleza. Disfruta de aguas termales, sesiones de yoga diarias, masajes terapéuticos y una alimentación orgánica."
        }
    ];

    return (
        <section className="p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {promociones.map((promo, index) => (
                    <PromoCard
                        key={index}
                        title={promo.title}
                        image={promo.image}
                        originalPricePerNight={promo.originalPricePerNight}
                        discountPercent={promo.discountPercent}
                        expirationDate={promo.expirationDate}
                        nights={promo.nights}
                        location={promo.location}
                        description={promo.description}
                    />
                ))}                
            </div>
        </section>
    );
}

export default Offers;
