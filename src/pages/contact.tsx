import Hero from "~/components/Hero";
import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import Footer from "~/components/Footer";

type ContactForm = {
  from_name: string;
  to_name: string;
  message: string;
};

const ContactForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: ContactForm = {
      from_name: (formRef.current?.from_name as HTMLInputElement).value,
      to_name: (formRef.current?.to_name as HTMLInputElement).value,
      message: (formRef.current?.message as HTMLTextAreaElement).value, // Use HTMLTextAreaElement for textarea
    };

    const templateParams = {
      from_name: formData.from_name,
      to_name: formData.to_name,
      message: formData.message,
    }

    emailjs
      .sendForm(
        'service_r40kq5j', // service ID
        'template_cxs8boo', // template ID
        formRef.current || '', // form ID
        'HfoHqgMxcMwAV16iJ' // public key
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
    <>
      <Hero />
      <div className="text-center mt-10">
        <h2 className="font-bold text-4xl text-gray-800 mb-4">Contact us!</h2>
      </div>

      <div className="flex justify-center">
        <div className="flex flex-row items-center">
          <div className="form-container">
            <form ref={formRef} onSubmit={sendEmail} className="contact-form">
              <h2>Contact</h2>
              <label htmlFor="from_name">Name</label>
              <input type="text" name="from_name" id="from_name" required />
              <label htmlFor="to_name">Email</label>
              <input type="email" name="to_name" id="to_name" required />
              <label htmlFor="message">Message</label>
              <textarea name="message" id="message" required></textarea>
              <button type="submit">Send</button>
            </form>
          </div>
          <div style={{ height: '450px', marginTop: '20px', paddingLeft: '20px' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d1964.5314985724071!2d-84.21244636087974!3d10.011655284990503!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sus!4v1712081065701!5m2!1ses-419!2sus"
              width="600"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ContactForm;
