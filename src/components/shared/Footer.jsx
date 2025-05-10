import React from 'react';
import { useSedeData } from "../../contexts/ApiContext";
import { MapPin, Phone, Mail, Facebook, Instagram, MessageSquare } from 'lucide-react';

const Footer = () => {
  const { sedes, isLoading } = useSedeData();
  const currentYear = new Date().getFullYear();
  
  // Definición de la paleta de colores (alineada con la página principal)
  const colors = {
    primary: '#bb4d00',
    darkBrown: '#332211',
    amber: '#bb7700',
    beige: '#f5f0e6'
  };

  // Social media icons
  const socialLinks = [
    { name: 'Facebook', icon: <Facebook size={16} />, href: '#' },
    { name: 'Instagram', icon: <Instagram size={16} />, href: '#' },
    { name: 'WhatsApp', icon: <MessageSquare size={16} />, href: '#' }
  ];

  // Enlaces rápidos
  const quickLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Reservas', href: '/reservas' },
    { name: 'Promociones', href: '/promociones' },
    { name: 'Restaurantes', href: '/restaurantes' },
    { name: 'Eventos', href: '/eventos' },
    { name: 'Contacto', href: '/contacto' }
  ];

  return (
    <footer 
      className="py-10 text-white w-full"
      style={{ backgroundColor: colors.darkBrown }}
    >
      <div className="container mx-auto px-4">
        {/* Grid de 4 columnas para desktop, 2 para tablet, 1 para móvil */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Columna 1: Logo e información */}
          <div>
            <div className="flex items-center mb-4">
              <div 
                className="mr-2 h-12 w-12 rounded-full bg-gradient-to-b from-amber-800 to-transparent"
              >
                <svg
                  viewBox="0 0 128 128"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  className="w-full h-full"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path
                    d="M3.68 43.11l17.03.21s-.07-10.03 0-10.78c.07-.74.67-.97 1.63-.97h11.52s4.21-19.72 30.67-19.58c25.08.13 29.89 19.36 29.89 19.36s11.22.15 11.96.15s1.11.59 1.11 1.41v10.26h16.78l-.8 1.93l-4.9 8.25l-109.24-.01l-5.65-10.23z"
                    fill="#fadbbc"
                  ></path>
                  <path
                    d="M20.6 51.7l-10.7.01s-4.53-7.4-4.93-7.98c-.53-.75-1.72-.63-2.11-.57c-.67.09-.14 1.17.61 2.25s3.94 6.43 3.94 6.43v72.02h113.22l.09-71.78s3.98-6.54 4.37-7.19s.98-1.69.26-1.73c-.78-.04-1.68-.18-2.45 1.03c-.88 1.39-4.58 7.16-4.58 7.16h-10.8V40.17h-16.6s-.59-22.84-27.15-22.68c-26.55.17-26.25 22.66-26.25 22.66H20.74c0 .01-.14 11.35-.14 11.55z"
                    fill="#b99277"
                  ></path>
                  <path fill="#e2c090" d="M9.86 56.19h10.59v44.28l-10.68.1z"></path>
                  <path
                    d="M23.14 44.67v44.38l81.98-.09v-44.1H85.81s1.38-22.41-21.45-22.65c-23.67-.26-21.91 22.28-21.91 22.28l-19.31.18z"
                    fill="#e2c090"
                  ></path>
                  <path
                    d="M42.45 44.49l-6.16.05v79.36h6.37c.01 0-.15-79.41-.21-79.41z"
                    fill="#fadbbc"
                  ></path>
                  <path
                    d="M85.81 44.86h6.39l-.01 79.01h-6.67s.45-79.37.29-79.01z"
                    fill="#fadbbc"
                  ></path>
                  <path
                    d="M118.25 56.56h-10.32v43.9h10.22l.1-43.9z"
                    fill="#e2c090"
                  ></path>
                  <path
                    fill="#ffa828"
                    d="M50.22 99.45l-.03 24.75H78.2l.03-25.51z"
                  ></path>
                  <path fill="#546f7a" d="M52.8 102.66v18.63h9.88v-18.57z"></path>
                  <path fill="#546f7a" d="M65.51 102.85h9.76l.25 18.44h-9.94z"></path>
                  <path
                    d="M20.69 99.03c0 .31.08 26.61.23 26.84c.15.23 7.43.31 7.74 0c.08-.08 0-27 0-27l-7.97.16z"
                    fill="#faddc3"
                  ></path>
                  <path
                    d="M99.67 99.27s-.29 25.44-.08 26.07c.08.23 7.33.43 7.74.15c.23-.15.23-26.3.23-26.3l-7.89.08z"
                    fill="#faddc3"
                  ></path>
                  <path
                    d="M113.79 116.93c-1.48-.06-4.56-1.43-4.25-6.26c.3-4.73 2.66-7.38 4.25-7.44s4.25 4.08 4.25 7.56c0 4.02-1.65 6.25-4.25 6.14z"
                    fill="#2f7c31"
                  ></path>
                  <path
                    d="M14.67 103.29c-1.49.06-4.48 3.96-4.37 8.33c.12 4.61 2.6 5.67 4.19 5.79c1.59.12 4.37-1.83 4.25-6.08s-2.59-8.1-4.07-8.04z"
                    fill="#2f7c31"
                  ></path>
                  <path
                    d="M10.96 116.64c-.16.4.06 7.23.06 7.23l6.73-.01s.11-6.99.11-7.23c.01-.23-6.82-.19-6.9.01z"
                    fill="#e2c090"
                  ></path>
                  <path
                    d="M110.18 116.34c-.06-.3 6.91-.24 6.97-.06c.13.39-.1 7.62-.1 7.62h-6.85l-.02-7.56z"
                    fill="#e2c090"
                  ></path>
                  <path
                    d="M19.42 91.91s.07 5.86.12 6.83s-.11 1.89 2.06 1.91c2.13.02 84.69.04 85.76.04c1.07 0 2.28-.61 2.38-2.14c.1-1.52.05-6.43.05-6.43l-46.36-1.6l-44.01 1.39z"
                    fill="#af0c1a"
                  ></path>
                  <path
                    d="M109.79 92.12s.05-2.2.05-2.88c0-.69-.61-1.22-2.37-1.26c-1.76-.04-84.52-.15-86.24-.15s-1.76.9-1.84 1.74c-.08.84.02 2.34.02 2.34l90.38.21z"
                    fill="#fadbbc"
                  ></path>
                  <path fill="#6c1507" d="M46.9 37.64h8.64v45.64H46.9z"></path>
                  <path fill="#6c1507" d="M73.05 37.64h8.64v45.64h-8.64z"></path>
                  <path fill="#6c1507" d="M54.17 56.37h20v9h-20z"></path>
                  <path fill="#536f79" d="M95.68 46.61h6.38v10.06h-6.38z"></path>
                  <path fill="#536f79" d="M95.65 60.63h6.38v10.06h-6.38z"></path>
                  <path fill="#536f79" d="M95.65 74.9h6.38v10.06h-6.38z"></path>
                  <path fill="#536f79" d="M26.74 47.06h6.38v10.06h-6.38z"></path>
                  <path fill="#536f79" d="M26.71 61.08h6.38v10.06h-6.38z"></path>
                  <path fill="#536f79" d="M26.71 75.35h6.38v10.06h-6.38z"></path>
                  <path fill="#536f79" d="M11.91 61.16h6.38v10.06h-6.38z"></path>
                  <path fill="#536f79" d="M11.91 75.42h6.38v10.06h-6.38z"></path>
                  <path fill="#536f79" d="M109.94 60.67h6.38v10.06h-6.38z"></path>
                  <path fill="#536f79" d="M109.94 74.94h6.38V85h-6.38z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold">HOSPEDAJE Y SABOR</h3>
            </div>
            
            <p className="text-white opacity-80 mb-6">
              Cadena de hoteles con presencia en las principales ciudades de Perú, 
              ofreciendo una experiencia única de hospitalidad y gastronomía.
            </p>
            
            {/* Social links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  aria-label={social.name}
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                  style={{ color: colors.darkBrown }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Columna 2: Destinos */}
          <div>
            <h4 className="text-lg font-bold mb-4">Destinos</h4>
            {isLoading ? (
              <p className="text-white opacity-60">Cargando destinos...</p>
            ) : (
              <ul className="space-y-2 text-white opacity-80">
                {sedes && sedes.length > 0 ? (
                  sedes.map((sede, index) => (
                    <li key={index}>
                      <a 
                        href={`/destinos/${sede.toLowerCase()}`} 
                        className="hover:text-amber-300 transition-colors duration-200 flex items-center"
                      >
                        <span className="mr-1">•</span> {sede}
                      </a>
                    </li>
                  ))
                ) : (
                  <>
                    <li><a href="#" className="hover:text-amber-300 transition-colors duration-200">Lima</a></li>
                    <li><a href="#" className="hover:text-amber-300 transition-colors duration-200">Cusco</a></li>
                    <li><a href="#" className="hover:text-amber-300 transition-colors duration-200">Arequipa</a></li>
                    <li><a href="#" className="hover:text-amber-300 transition-colors duration-200">Trujillo</a></li>
                    <li><a href="#" className="hover:text-amber-300 transition-colors duration-200">Piura</a></li>
                  </>
                )}
              </ul>
            )}
          </div>
          
          {/* Columna 3: Enlaces Rápidos */}
          <div>
            <h4 className="text-lg font-bold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-white opacity-80">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="hover:text-amber-300 transition-colors duration-200 flex items-center"
                  >
                    <span className="mr-1">•</span> {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Columna 4: Contacto */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contacto</h4>
            <ul className="space-y-3 text-white opacity-80">
              <li className="flex items-center group">
                <Phone size={18} className="mr-2 group-hover:text-amber-300" />
                <a href="tel:+5184123456" className="hover:text-amber-300 transition-colors duration-200">
                  +51 84 123 456
                </a>
              </li>
              <li className="flex items-center group">
                <Mail size={18} className="mr-2 group-hover:text-amber-300" />
                <a href="mailto:reservas@hospedajey-sabor.com" className="hover:text-amber-300 transition-colors duration-200">
                  reservas@hospedajey-sabor.com
                </a>
              </li>
              <li className="flex items-start group">
                <MapPin size={18} className="mr-2 mt-1 group-hover:text-amber-300" />
                <span className="hover:text-amber-300 transition-colors duration-200">
                  Oficina Central: Av. Principal 123, Cusco - Perú
                </span>
              </li>
            </ul>
            
            {/* Botón de reserva */}
            <a 
              href="/reservas" 
              className="mt-6 inline-block px-4 py-2 rounded-full text-white font-medium transition-all hover:scale-105 hover:shadow-lg"
              style={{backgroundColor: colors.primary}}
            >
              Reservar Ahora
            </a>
          </div>
        </div>
        
        {/* Copyright y políticas */}
        <div className="border-t border-white border-opacity-20 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center text-white opacity-70">
            <p>© {currentYear} Hospedaje y Sabor. Todos los derechos reservados.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="/privacidad" className="hover:text-amber-300 transition-colors text-sm">Política de Privacidad</a>
              <a href="/terminos" className="hover:text-amber-300 transition-colors text-sm">Términos y Condiciones</a>
              <a href="/cookies" className="hover:text-amber-300 transition-colors text-sm">Política de Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;