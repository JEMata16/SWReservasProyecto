import { Hotel } from "@prisma/client";
import Link from "next/link";
import { api } from "~/utils/api";
import { LoadingSpinner } from "../Loading";



/**
 * Renders a list of hotel recommendations.
 * 
 * @returns {JSX.Element} The JSX element representing the list of hotel recommendations.
 */
const Places = (): JSX.Element => {
  const { data, isLoading }: { data?: Hotel[], isLoading: boolean } = api.hotels.getAll.useQuery({ take: 8 });
  if (isLoading) return <LoadingSpinner/>;
  return (
    <div className="w-4/5 m-auto cursor-default">
      <div className="my-10 text-center">
        <h1 className="text-4xl font-bold">Our Recommendation</h1>
        <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-10 my-10 justify-items-center items-center pb-10 border-b">
          {data?.map((hotel: Hotel) => (
            <div key={hotel.id} className="flex flex-col drop-shadow-2xl text-left rounded space-y-2 bg-white cursor-pointer opacity-80 hover:opacity-100 duration-200 h-full">
              <img
                className="w-full h-1/2 max-h-40 object-cover rounded-t-lg"
                src={(hotel.images && typeof hotel.images === 'object' && 'img' in hotel.images && Array.isArray(hotel.images.img)) ? hotel.images.img[0] as string : ""}
                alt=""
              />
              <div className="flex flex-col justify-between h-full p-4 space-y-4">
                <div className="flex justify-between">
                  <p className="text-sm text-red-400">{hotel.name}</p>
                </div>
                <p className="font-semibold line-clamp-3">
                  {hotel.description}
                </p>
                <div className="mt-auto">
                  <button className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded">
                    <Link href={{ pathname: "/hotel-details", query: { hotelId: hotel.id } }}>
                      See more
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default Places;