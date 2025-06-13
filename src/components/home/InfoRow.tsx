export const InfoRow = () => {
  return (
    <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 py-10 px-10 bg-gray-100 rounded-2xl">
      
      {/* Identidad o Pasaporte */}
      <div className="flex items-center space-x-2 relative after:hidden md:after:block md:after:absolute md:after:right-0 md:after:top-1/2 md:after:w-[1px] md:after:h-10 md:after:bg-gray-300 md:after:-translate-y-1/2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
        </svg>
        <span className="text-sm text-gray-600">
          Identidad o Pasaporte son válidos para comprar en la tienda.
        </span>
      </div>

      {/* Separador en móviles */}
      <div className="block md:hidden w-full h-[1px] bg-gray-300"></div>

      {/* No entregas en Brasil */}
      <div className="flex items-center space-x-2 relative after:hidden md:after:block md:after:absolute md:after:right-0 md:after:top-1/2 md:after:w-[1px] md:after:h-10 md:after:bg-gray-300 md:after:-translate-y-1/2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
        <span className="text-sm text-gray-600">
          No realizamos entregas en Brasil.
        </span>
      </div>

      {/* Separador en móviles */}
      <div className="block md:hidden w-full h-[1px] bg-gray-300"></div>

      {/* Impuestos */}
      <div className="flex items-center space-x-2 relative after:hidden md:after:block md:after:absolute md:after:right-0 md:after:top-1/2 md:after:w-[1px] md:after:h-10 md:after:bg-gray-300 md:after:-translate-y-1/2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 10h10M7 14h10M7 18h10" />
        </svg>
        <span className="text-sm text-gray-600">
          Los valores mostrados no incluyen I.V.A.
        </span>
      </div>

      {/* Separador en móviles */}
      <div className="block md:hidden w-full h-[1px] bg-gray-300"></div>

      {/* Cambios sin previo aviso */}
      <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m6-6H6" />
        </svg>
        <span className="text-sm text-gray-600">
          Los precios y la cotización pueden sufrir cambios sin previo aviso.
        </span>
      </div>

    </div>
  );
};
