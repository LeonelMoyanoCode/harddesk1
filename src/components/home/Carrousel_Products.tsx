import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";


export const ProductCarousel = ({ products }: { products: any[] }) => {
  const swiperRef = useRef<any>(null);

  // Detiene el autoplay cuando el mouse está sobre el carrusel
  const handleMouseEnter = () => {
    if (swiperRef.current) swiperRef.current.autoplay.stop();
  };

  // Reanuda el autoplay cuando el mouse sale del carrusel
  const handleMouseLeave = () => {
    if (swiperRef.current) swiperRef.current.autoplay.start();
  };

  return (
    <div className="my-8 relative z-10">
      <h2 className="text-2xl font-semibold text-center mb-6">Productos Populares</h2>
      
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={10}
        slidesPerView={2}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="product-carousel"
        navigation={false}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="max-w-[250px] flex flex-col items-center p-4 border rounded-lg shadow-md bg-white">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-[200px] h-[200px] object-cover rounded"
              />
              <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-500">${product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-400">
                Marca: {product.brand} | Color: {product.colors[0].color_name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Flechas de navegación */}
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <GrFormPrevious size={24} />
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <MdOutlineNavigateNext size={24} />
      </button>
    </div>
  );
};
