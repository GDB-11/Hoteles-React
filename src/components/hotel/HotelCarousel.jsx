import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import colors from "./../../helpers/ColorsHelper.js";

const HotelCarousel = ({
  images,
  autoPlayInterval = 4000,
  showCaption = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Sample images array (replace with your actual hotel images)
  const defaultImages = [
    {
      src: "https://www.royalsorrento.com/wp-content/uploads/sites/343/2021/11/1-Royal-Junior-Suite-7.jpg",
      alt: "Las mejores habitaciones",
      caption: "Estamos comprometidos con tu comodidad",
    },
    {
      src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWxzfGVufDB8fDB8fHww",
      alt: "Piscinas",
      caption: "Contamos con las mejores instalaciones",
    },
    {
      src: "https://images.unsplash.com/photo-1703565426315-4209c2e88eea?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWwlMjByZXN0YXVyYW50fGVufDB8fDB8fHww",
      alt: "Restaurante Gourmet",
      caption:
        "Experimenta la mejor gastronomía peruana en nuestros restaurantes",
    },
    {
      src: "https://bookyourluxuryhotelsuite.com/wp-content/uploads/2018/11/Ambassador_Suite_Hotel_Principe.jpg",
      alt: "Suite de lujo",
      caption: "Lujo y comodidad en nuestras habitaciones premium",
    },
  ];

  // Use provided images or default ones
  const carouselImages = images || defaultImages;

  // Function to go to next slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1,
    );
  }, [carouselImages.length]);

  // Function to go to previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1,
    );
  };

  // Function to go to a specific slide
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Setup autoplay
  useEffect(() => {
    let interval;

    if (autoPlayInterval > 0 && !isHovering) {
      interval = setInterval(() => {
        nextSlide();
      }, autoPlayInterval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [autoPlayInterval, isHovering, nextSlide]);

  return (
    <div
      className="relative mb-12 overflow-hidden rounded-lg shadow-xl"
      style={{ height: "600px" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Main carousel container */}
      <div className="relative h-full w-full">
        {/* Images */}
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover"
            />

            {/* Semi-transparent gradient overlay at the bottom */}
            <div className="absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-black to-transparent opacity-70"></div>

            {/* Image caption */}
            {showCaption && (
              <div className="absolute bottom-0 left-0 z-20 w-full p-6">
                <h3 className="mb-2 text-3xl font-bold text-white drop-shadow-lg">
                  {image.caption}
                </h3>
              </div>
            )}
          </div>
        ))}

        {/* Previous button */}
        <button
          className="bg-opacity-30 hover:bg-opacity-50 absolute top-1/2 left-4 z-20 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white backdrop-blur-sm transition-all"
          onClick={prevSlide}
          aria-label="Anterior"
        >
          <ChevronLeft size={24} color={colors.primary} />
        </button>

        {/* Next button */}
        <button
          className="bg-opacity-30 hover:bg-opacity-50 absolute top-1/2 right-4 z-20 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white backdrop-blur-sm transition-all"
          onClick={nextSlide}
          aria-label="Siguiente"
        >
          <ChevronRight size={24} color={colors.primary} />
        </button>

        {/* Indicators/dots */}
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 w-3 cursor-pointer rounded-full transition-all ${
                index === currentIndex
                  ? "scale-125 bg-white"
                  : "bg-opacity-50 hover:bg-opacity-75 bg-white"
              }`}
              aria-label={`Ir a la imagen ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelCarousel;
