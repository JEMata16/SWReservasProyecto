import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "~/utils/api";


const Places = () => {
  const { data, isLoading } = api.hotels.getAll.useQuery();
  if (isLoading) return <div className="text-4x1 font-bold">Loading...</div>
  const router = useRouter();
  return (
    <div className="w-4/5 m-auto cursor-default">
      <div className="my-10 text-center">
        <h1 className="text-4xl font-bold">Our Recommendation</h1>
        <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-10 my-10 justify-items-center items-center pb-10 border-b">
          {data?.map((hotel) => (
            <div className="drop-shadow-2xl text-left rounded space-y-2 bg-white cursor-pointer opacity-80 hover:opacity-100 duration-200">
              <img
                className="w-full h-1/2 max-h-40 object-cover rounded-t-lg"
                src={hotel?.images?.img[0]}
                alt=""
              />
              <div className="p-4 space-y-4">
                <div className="flex justify-between">
                  <p className="text-sm text-red-400">{hotel.name}</p>
                </div>
                <p className="font-semibold">
                  {hotel.description}
                </p>
                <button className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded">
                  <Link href={{ pathname: "/hotel-details", query: { hotelId: hotel.id } }}>
                    See more
                  </Link>
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default Places;