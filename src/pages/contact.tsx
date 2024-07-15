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
      <div className="min-h-screen bg-gradient-to-r from-gray-100 to-orange-50 flex flex-col items-center py-12 font-sans">
        <h2 className="text-4xl font-bold text-black mb-8">Let's Chat!</h2>

        <div className="flex flex-col lg:space-x-7 items-center w-full px-4 lg:px-0">
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
              <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition duration-200">Send Message</button>
            </form>
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
