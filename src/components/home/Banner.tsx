import { imagesLinks } from "../../constants/links";
import { useState, useEffect } from "react";

export const Banner = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % imagesLinks.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isHovered]);

  return (
    <div
      id="carousel"
      className="relative w-full flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Imagen activa */}
      <div className="max-w-[1440px] relative h-[450px]  overflow-hidden rounded-2xl md:rounded-sm md:h-[450px] w-full py-10 px-5 md:ml-10 md:mr-10">
        <img
          src={imagesLinks[activeIndex].imgSrc}
          className="block w-full h-full object-cover rounded-2xl md:rounded-2xl"
        />
      </div>

      {/* Indicadores de diapositivas debajo de la imagen */}
      <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {imagesLinks.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              index === activeIndex ? "bg-gray-800" : "bg-gray-400"
            }`}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setActiveIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};
