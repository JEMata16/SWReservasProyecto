
function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-8 mt-8">
    <div className="mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p>&copy; 2023 MkConnectioncr. All Rights Reserved.</p>
        </div>
        <div className="flex flex-col md:space-x-8 mb-4 md:mb-0 text-center">
          <p>Tel: +(506) 2430-7062</p>
          <p>Email: info@mkconnectioncr.com</p>
        </div>
        <div className="flex space-x-4">
          <a href="/about" className="hover:text-white">About us</a>
          <a href="/contact" className="hover:text-white">Contact Us!</a>
          <a href="/affiliation" className="hover:text-white">Affiliate</a>
        </div>
      </div>
    </div>
  </footer>
  );
}

export default Footer;
