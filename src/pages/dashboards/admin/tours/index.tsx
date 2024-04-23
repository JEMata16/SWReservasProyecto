import { LoadingSpinner } from "~/components/Loading";
import SidebarLayout from "~/layouts/SidebarLayout";
import { api } from "~/utils/api";


const toursAdmin = () => {
  const { data, isLoading } = api.tours.getAll.useQuery();
  const mutation = api.tours.deleteById.useMutation();
  if (isLoading) return <LoadingSpinner/>;
  const deleteTour = async (id: string) => {
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
            <h2 className="text-4xl font-bold">Tours</h2>
            <button className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded ml-5">
             <a href="/dashboards/admin/tours/agregar"> Agregar</a>
              </button>
          </div>
          <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-10 my-10 justify-items-center items-center pb-10 border-b">
            {data?.map((tour) => (
              <div className="drop-shadow-2xl text-left rounded space-y-2 bg-white cursor-pointer opacity-80 hover:opacity-100 duration-200">
                <img
                  className="w-full h-1/2 max-h-40 object-cover rounded-t-lg"
                  src={(tour.images && typeof tour.images === 'object' && 'img' in tour.images && Array.isArray(tour.images.img)) ? tour.images.img[0] as string : ""}
                  alt=""
                />
                <div className="p-4 space-y-4">
                  <div className="flex justify-between">
                    <p className="text-sm text-red-400">{tour.name}</p>
                  </div>
                  <p className="font-semibold">
                    {tour.description}
                  </p>
                  <button onClick={() => deleteTour(tour.id)} className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded">
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

export default toursAdmin;