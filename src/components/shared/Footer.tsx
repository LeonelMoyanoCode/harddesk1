import { socialLinks, contactLink } from "../../constants/links";

export const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 z-0">
      <div className="container max-w-screen-xl mx-auto px-4 md:px-10">
        {/* Sección de Información */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-20 text-center">
          <div>
            <h5 className="text-xl font-semibold mb-4">Sobre Nosotros</h5>
            <p className="text-sm">
              Somos una tienda online dedicada a ofrecer productos de alta
              calidad con un servicio excepcional. ¡Explora nuestro catálogo y
              disfruta de una experiencia única!
            </p>
          </div>

          {/* Enlaces de navegación */}
          <div>
            <h5 className="text-xl font-bold mb-4">Productos</h5>
            <ul className="flex flex-col items-center text-sm space-y-2">
              <li>
                <a href="/shop" className="hover:text-gray-400">
                  Tablet
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-400">
                  Accesorios
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="hover:text-gray-400">
                  Celulares
                </a>
              </li>
            </ul>
          </div>

          {/* Contactos */}
          <div>
            <h5 className="text-xl font-bold mb-4">Contacto</h5>
            <ul className="flex flex-col items-center text-sm space-y-2">
              {contactLink.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-2 text-white hover:text-gray-400"
                  >
                    <div className="text-3xl">{link.icon}</div>
                    <span>{link.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes Sociales */}
          <div>
            <h5 className="text-xl font-bold mb-4">Seguinos</h5>
            <div className="flex space-x-4 justify-center">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-gray-950"
                >
                  <div className="text-3xl">{link.icon}</div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm mt-8">
          <p>&copy; {new Date().getFullYear()} HardDesk</p>
        </div>
      </div>
    </footer>
  );
};
