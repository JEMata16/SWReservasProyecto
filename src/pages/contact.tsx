import Hero from "~/components/Hero";
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

interface ContactForm {
  user_name: string;
  user_email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return; // Handle potential null reference

    const formData: ContactForm = {
      user_name: (formRef.current.user_name as HTMLInputElement).value,
      user_email: (formRef.current.user_email as HTMLInputElement).value,
      message: (formRef.current.message as HTMLTextAreaElement).value, // Use HTMLTextAreaElement for textarea
    };

    emailjs
      .sendForm(
        'service_5907lrf', // service ID
        'template_cxs8boo', // template ID
        formRef.current,
        { publicKey: 'YHfoHqgMxcMwAV16iJ' } // public key
      )
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );
  };

  return (
    <><div>
      <Hero />
    </div>
    <div className="flex justify-center gap-4">
      <div className="form-container">
        <form onSubmit={sendEmail} className="contact-form">
          <h2>Contacto</h2>
          <label htmlFor="user_name">Nombre</label>
          <input type="text" name="user_name" id="user_name" required />
          <label htmlFor="user_email">Email</label>
          <input type="email" name="user_email" id="user_email" required />
          <label htmlFor="message">Mensaje</label>
          <textarea name="message" id="message" required></textarea>
          <input type="submit" value="Enviar" />
        </form>
      </div>
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d1964.5314985724071!2d-84.21244636087974!3d10.011655284990503!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sus!4v1712081065701!5m2!1ses-419!2sus"
          width="600"
          height="450"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
    </>
  );
};

export default ContactForm;
