function Footer() {
  return (
    <footer className="sticky top-[100vh] w-full bg-amber-950 p-5 text-amber-100">
      {/* Sección Izquierda: Logo/Nombre de la Marca */}
      <div className="flex items-center p-4">
        <div className="mr-2 h-10 w-10 rounded-full bg-amber-800"></div>
        <div>
          <h1 className="text-xl font-bold text-amber-50">HOSPEDAJE Y SABOR</h1>
          <p className="text-xs text-amber-50">
            Cadena de hoteles con presencia en las principales ciudades de Perú,
            ofreciendo una experiencia única de hospitalidad y gastronomía.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 p-4">
        <div>
          <h4 className="text-lg font-bold">Destinos</h4>
          <ul className="space-y-1 opacity-80">
            <li>Asunción</li>
            <li>Bagua</li>
            <li>Bolognesi</li>
            <li>Carhuaz</li>
            <li>Casma</li>
            <li>Chachapoyas</li>
            <li>Huaraz</li>
            <li>Utcubamba</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold">Enlaces Rápidos</h4>
          <ul className="space-y-1 opacity-80">
            <li>Reservas</li>
            <li>Ofertas especiales</li>
            <li>Restaurantes</li>
            <li>Eventos</li>
            <li>Galería</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold">Contacto</h4>
          <ul className="space-y-1 opacity-80">
            <li>+51 1234 5678</li>
            <li>info@hospedajeysabor.pe</li>
            <li>Oficina Central: Av. Arequipa 1250, Lima, Perú</li>
          </ul>
        </div>
      </div>

      <div className="border-opacity-20 mt-8 border-t border-white pt-8 text-center text-white opacity-60">
        <p>
          © {new Date().getFullYear()} Hospedaje y Sabor. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
