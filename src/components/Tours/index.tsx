import { Button } from "@mui/material";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "~/utils/api";


const Tours = () => {
  const { data, isLoading } = api.tours.getAll.useQuery();
  if (isLoading) return <div className="text-4x1 font-bold">Loading...</div>
  const router = useRouter();
  return (
    <div className="w-4/5 m-auto cursor-default">
      <div className="my-10 text-center">
        <h1 className="text-4xl font-bold">Our Tours Recommendation</h1>
        <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-10 my-10 justify-items-center items-center pb-10 border-b">
          {data?.map((tours) => (
            <div key={tours.id} className="flex flex-col drop-shadow-2xl text-left rounded space-y-2 bg-white cursor-pointer opacity-80 hover:opacity-100 duration-200" style={{ height: "360px" }}>
              <img
                className="w-full h-1/2 max-h-40 object-cover rounded-t-lg"
                src={(tours.images && typeof tours.images === 'object' && 'img' in tours.images && Array.isArray(tours.images.img)) ? tours.images.img[0] as string : ""}
                alt=""
              />
              <div className="flex flex-col justify-between h-full p-4">
                <div>
                  <p className="text-sm text-red-400">{tours.name}</p>
                  <p className="font-semibold line-clamp-3">{tours?.description}</p>
                </div>
                <div className="mt-auto">
                  <button className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded">
                    <Link href={{ pathname: "/tour-details", query: { tourId: tours.id } }}>
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

export default Tours;