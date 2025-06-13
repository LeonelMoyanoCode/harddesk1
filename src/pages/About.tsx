import { FaGlobe, FaShippingFast, FaMobileAlt } from "react-icons/fa";

export const About = () => {
  return (
    <section className="bg-gray-50 py-12 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Sobre Nosotros</h2>
          <p className="text-gray-600 text-lg">
            Somos tu destino confiable para tecnología 100% importada. Calidad y confianza en un solo lugar.
          </p>
        </div>

        {/* Contenido */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Calidad Internacional */}
          <div className="p-6 bg-white shadow-lg rounded-2xl flex flex-col items-center text-center">
            <FaGlobe className="text-blue-600 text-6xl mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Calidad Internacional
            </h3>
            <p className="text-gray-600">
              Traemos lo último en tecnología directamente de los fabricantes más reconocidos del mundo.
            </p>
          </div>

          {/* Envíos Rápidos */}
          <div className="p-6 bg-white shadow-lg rounded-2xl flex flex-col items-center text-center">
            <FaShippingFast className="text-green-600 text-6xl mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Envíos Rápidos</h3>
            <p className="text-gray-600">
              Nos aseguramos de que recibas tus productos a tiempo, sin importar dónde te encuentres.
            </p>
          </div>

          {/* Variedad de Productos */}
          <div className="p-6 bg-white shadow-lg rounded-2xl flex flex-col items-center text-center">
            <FaMobileAlt className="text-purple-600 text-6xl mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Variedad Inigualable
            </h3>
            <p className="text-gray-600">
              Encuentra celulares, accesorios y mucho más, con garantía de originalidad y precio competitivo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
