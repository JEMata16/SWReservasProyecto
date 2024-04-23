import Hero from "~/components/Hero";

const Cars = () => {
  return (
    <>
      <Hero />
      <div className="flex items-center justify-center w-screen h-screen">
        <iframe
          src="https://www.adobecar.cr/iframer.aspx?id=MKCTT&Lang=ENG"
          className="w-1/2 h-screen border rounded-lg shadow-lg"
        ></iframe>
      </div>

    </>
  );
};
export default Cars;