import { ChevronLeft, ChevronRight } from "lucide-react";
import colors from "../../helpers/ColorsHelper.js";

function ImageGallery({ images, activeIndex, onPrevImage, onNextImage, onSelectImage }) {
    return (
        <div className="relative rounded-lg overflow-hidden shadow-lg mb-8">
            <div className="aspect-video bg-gray-100 relative">
                {images && (
                    <img
                        src={images[activeIndex]}
                        alt={`Vista ${activeIndex + 1}`}
                        className="w-full h-full object-cover"
                    />
                )}

                {/* Navigation arrows */}
                <button
                    onClick={onPrevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full shadow hover:bg-opacity-100 transition-all cursor-pointer"
                >
                    <ChevronLeft size={24} style={{ color: colors.darkBrown }} />
                </button>
                <button
                    onClick={onNextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full shadow hover:bg-opacity-100 transition-all cursor-pointer"
                >
                    <ChevronRight size={24} style={{ color: colors.darkBrown }} />
                </button>

                {/* Image indicators */}
                {images && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => onSelectImage(index)}
                                className={`w-2 h-2 rounded-full ${index === activeIndex
                                    ? 'bg-white'
                                    : 'bg-white bg-opacity-50 cursor-pointer'
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Thumbnail strip */}
            {images && images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto p-2">
                    {images.map((imgSrc, index) => (
                        <button
                            key={index}
                            onClick={() => onSelectImage(index)}
                            className={`flex-shrink-0 w-20 h-16 rounded-md overflow-hidden cursor-pointer ${index === activeIndex ? 'ring-2 ring-amber-600' : ''
                                }`}
                        >
                            <img
                                src={imgSrc}
                                alt={`Miniatura ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ImageGallery;