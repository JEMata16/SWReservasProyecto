import SidebarLayout from "~/layouts/SidebarLayout";
import { api } from "~/utils/api";


const hotelesAdmin = () => {
  const { data, isLoading } = api.hotels.getAll.useQuery({});
  const mutation = api.hotels.deleteById.useMutation();
  if (isLoading) return <span className="loading loading-spinner loading-md"></span>
  const deleteHotel = async (id: string) => {
    try {
      await mutation.mutateAsync({
        text: id
      });
      window.location.reload();
    } catch (error) {
    }
  };
  return (
    <SidebarLayout>
      <div className="w-4/5 m-auto cursor-default">
        <div className="my-10 text-center">
          <div className="flex justify-center">
            <h2 className="text-4xl font-bold">Hoteles</h2>
            <button className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded ml-5">
             <a href="/dashboards/admin/hoteles/agregar"> Agregar</a>
              </button>
          </div>
          <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-10 my-10 justify-items-center items-center pb-10 border-b">
            {data?.map((hotel) => (
              <div className="drop-shadow-2xl text-left rounded space-y-2 bg-white cursor-pointer opacity-80 hover:opacity-100 duration-200">
                <img
                  className="w-full h-1/2 max-h-40 object-cover rounded-t-lg"
                  src={(hotel.images && typeof hotel.images === 'object' && 'img' in hotel.images && Array.isArray(hotel.images.img)) ? hotel.images.img[0] as string : ""}
                  alt=""
                />
                <div className="p-4 space-y-4">
                  <div className="flex justify-between">
                    <p className="text-sm text-red-400">{hotel.name}</p>
                  </div>
                  <p className="font-semibold line-clamp-3">
                    {hotel.description}
                  </p>
                  <button onClick={() => deleteHotel(hotel.id)} className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </SidebarLayout>
  );
}

export default hotelesAdmin;