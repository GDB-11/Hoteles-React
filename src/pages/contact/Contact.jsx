// Importamos los hooks y componentes necesarios
import { useState } from 'react'; // Necesitamos importar useState incluso si no importamos React
import './../../'; // Estilos del componente
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

// Definición del componente como función declarativa
function Contact() {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  // Estado para mostrar mensaje de éxito al enviar
  const [submitted, setSubmitted] = useState(false);

  // Función para actualizar el estado cuando el usuario escribe en los campos
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita recargar la página
    // Simula un envío exitoso (en un proyecto real aquí iría una API)
    setSubmitted(true);
    // Limpia el mensaje después de 3 segundos
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="contact-container">
      {/* Sección Hero con imagen y título */}
      <section className="hero">
        <div className="hero-content">
          <h1>Contáctanos</h1>
          <p>"Tradición peruana de hospitalidad"</p>
        </div>
      </section>

      {/* Información de contacto (dirección, teléfono, correo) */}
      <section className="contact-info">
        <div className="info-card">
          <FaMapMarkerAlt className="icon" /> {/* Icono de ubicación */}
          <p>Av. Principal 123, Cusco - Perú</p>
        </div>
        <div className="info-card">
          <FaPhone className="icon" /> {/* Icono de teléfono */}
          <p>+51 84 123 456</p>
        </div>
        <div className="info-card">
          <FaEnvelope className="icon" /> {/* Icono de correo */}
          <p>reservas@hospedajey-sabor.com</p>
        </div>
      </section>

      {/* Contenedor principal: mapa + formulario */}
      <section className="contact-main">
        {/* Mapa de Google Maps */}
        <div className="map">
          <iframe 
            src="https://www.google.com/maps/embed?pb= !1m18!1m12!1m3!1d3732.892589662029!2d-71.96663128502669!3d-13.519446889701414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x916dd8a545960c47%3A0x5190f3e03e8d6b0!2sCusco!5e0!3m2!1ses!2spe!4v1630000000000!5m2!1ses!2spe"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        {/* Formulario de contacto */}
        <div className="contact-form">
          <h2>Escríbenos</h2>
          {/* Mensaje de éxito al enviar */}
          {submitted && <p className="success-message">¡Mensaje enviado con éxito!</p>}
          <form onSubmit={handleSubmit}>
            {/* Campo Nombre */}
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {/* Campo Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {/* Campo Mensaje */}
            <textarea
              name="message"
              placeholder="Tu mensaje"
              value={formData.message}
              onChange={handleChange}
              required
            />
            {/* Botón de enviar */}
            <button type="submit">Enviar</button>
          </form>
        </div>
      </section>

      {/* Redes sociales */}
      <section className="social-media">
        <h3>Síguenos</h3>
        <div className="social-icons">
          {/* Iconos de redes sociales (enlaces ficticios) */}
          <a href="#facebook"><FaFacebook /></a>
          <a href="#instagram"><FaInstagram /></a>
          <a href="#whatsapp"><FaWhatsapp /></a>
        </div>
      </section>
    </div>
  );
}

export default Contact;