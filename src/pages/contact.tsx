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
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 font-sans">
        <h2 className="text-4xl font-bold text-orange-600 mb-8">Contact Us!</h2>

        <div className="flex flex-col lg:flex-row lg:space-x-12 items-center w-full max-w-6xl px-4 lg:px-0">

          <div className="lg:w-1/2 bg-white p-8 rounded-lg shadow-md transition duration-500 ease-in-out transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">Get in Touch</h3>
            <form onSubmit={sendEmail} className="space-y-6">
              <div>
                <label htmlFor="from_name" className="block text-lg font-medium text-gray-600 mb-2">Name</label>
                <input type="text" name="from_name" id="from_name" required className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-500" />
              </div>
              <div>
                <label htmlFor="to_name" className="block text-lg font-medium text-gray-600 mb-2">Email</label>
                <input type="email" name="to_name" id="to_name" required className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-500" />
              </div>
              <div>
                <label htmlFor="message" className="block text-lg font-medium text-gray-600 mb-2">Message</label>
                <textarea name="message" id="message" required className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-500" rows={6}></textarea>
              </div>
              <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition duration-200">Send</button>
            </form>
          </div>

          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <div className="h-96 w-full rounded-lg shadow-md overflow-hidden transition duration-500 ease-in-out transform hover:scale-105">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d1964.5314985724071!2d-84.21244636087974!3d10.011655284990503!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sus!4v1712081065701!5m2!1ses-419!2sus"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-none"
              ></iframe>
            </div>
          </div>

        </div>
      </div>

      <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&display=swap');

      .font-sans {
        font-family: 'Nunito', sans-serif;
      }
    `}</style>

      <Footer />
    </>
  );
};

export default ContactForm;
