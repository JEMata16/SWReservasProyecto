import Hero from "~/components/Hero";



const About = () => {
    return (
        <>
        <Hero/>
        <div className="w-4/5 m-auto cursor-default">
            <h1 className="text-4xl font-bold text-center m-top-10 py-10">About</h1>
            <div className="w-full m-auto flex flex-col md:flex-row space-y-10 md:space-x-10 justify-between items-center py-10">
                <div className="w-full space-y-5">
                    <img
                        className="w-full drop-shadow-2xl rounded-lg border-8 border-stones-700 cursor-pointer opacity-80 hover:opacity-100 duration-200"
                        src="https://www.2crvr.com/wp-content/uploads/2022/10/One-of-the-many-beautiful-beaches-to-be-found-in-Costa-Rica.jpeg"
                        alt=""
                    />
                    <div>
                        <h2 className="font-bold">Eco-Tourism Adventures</h2>
                        <h1 className="text-2xl font-bold">Adventure Tourism Packages</h1>
                    </div>
                    <p className="text-lg">
                    Costa Rica's breathtaking natural landscapes and diverse ecosystems make it a 
                    prime destination for eco-tourism adventures. A travel agency specializing in 
                    eco-tourism can arrange guided tours to national parks, rainforests, and conservation areas. 
                    Clients can embark on wildlife spotting expeditions, birdwatching tours, or hike through lush forests, all while minimizing their environmental impact.
                    </p>
                    <p className="text-lg">
                    For thrill-seekers, Costa Rica offers a plethora of adrenaline-pumping activities, 
                    and can create tailor-made adventure tourism packages. 
                    From zip-lining through the canopy of the rainforest to white-water rafting down raging rivers, the options are endless. 
                    Whether clients are beginners or seasoned adventurers, the agency ensures safe and exhilarating experiences amidst the country's stunning natural beauty.
                    </p>
                </div>
                <div className="w-full space-y-4 text-left">
                    <h2 className="font-bold">Customized Itinerary Planning</h2>
                    <h1 className="font-bold text-2xl">Cultural Immersion Experiences</h1>
                    <p className="text-lg">
                    Immerse yourself in the rich cultural tapestry of Costa Rica with cultural immersion experiences offered by a Mkconnection associates. 
                    Clients can explore traditional villages, meet local artisans, and engage in authentic cultural activities. 
                    From learning to cook traditional Costa Rican cuisine to participating in indigenous ceremonies, these experiences provide a deeper understanding of the country's vibrant heritage and traditions.
                    </p>
                    <img
                        className="drop-shadow-2xl border-8 border-stones-700 rounded-lg cursor-pointer opacity-80 hover:opacity-100 duration-200"
                        src="https://images.pexels.com/photos/14482337/pexels-photo-14482337.jpeg"
                        alt=""
                    />
                </div>
            </div>

            <div className="w-full h-[400px] my-10 relative">
                <img
                    className="w-full h-full object-cover "
                    src="https://pd.w.org/2023/10/513651cbcc5e18561.75234825.jpeg"
                    alt=""
                />
                {/* <div className="w-full h-full absolute top-0 flex justify-center items-center">
                    <h1 className="text-4xl text-white font-bold px-5 py-2 border cursor-pointer hover:bg-white hover:text-gray-500 hover:duration-300">
                        View Details
                    </h1>
                </div> */}
            </div>

            <div className="my-20 flex justify-between items-center xl:h-[500px]">
                <div className="xl:w-[500px] w-1/3 lg:block hidden">
                    <img
                        className="w-full h-full object-cover"
                        src="https://assets.tourhero.com/dtavom0gn69d6xmkl4j1uph2mcmr"
                        alt=""
                    />
                </div>
                <div className="xl:w-[500px] p-5 text-center space-y-5 sm:space-y-2">
                    <h1 className="md:text-xl sm:text-lg">MkConnection Travels and DMC</h1>
                    <h2 className="md:text-4xl sm:text-base">
                        Costa Rica
                    </h2>
                    <p className="md:text-lg sm:text-xs">
                    Costa Rica, a jewel of Central America, beckons with its breathtaking landscapes, 
                    vibrant culture, and eco-conscious ethos. With its diverse ecosystems, from dense rainforests to sun-kissed beaches, 
                    Costa Rica offers an unparalleled playground for nature enthusiasts and adventurers alike. Discover a land where conservation thrives, 
                    and every moment is infused with Pura Vida – the pure life.
                    </p>
                    <button className="mt-5 px-5 py-2 border border-black hover:bg-gray-400 hover:duration-300">
                        Book Now
                    </button>
                </div>
                <div className="xl:w-[500px] w-1/3 lg:block hidden">
                    <img
                        className="w-full h-full object-cover"
                        src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Monumento_Nacional_de_Costa_Rica_SJO_01_2020_1854.jpg"
                        alt=""
                    />
                </div>
            </div>
        </div>
        </>
    );
};


export default About;