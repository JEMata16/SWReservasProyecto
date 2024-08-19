import { IconButton, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Prisma, Tours } from "@prisma/client";
import { useState } from "react";
import { LoadingSpinner } from "~/components/Loading";
import SidebarLayout from "~/layouts/SidebarLayout";
import { api } from "~/utils/api";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';

const toursAdmin = () => {
  const [editingTour, setEditingTour] = useState<Tours | null>(null);
  const [formState, setFormState] = useState(false);

  const { data, isLoading } = api.tours.getAll.useQuery({});
  const mutation = api.tours.deleteById.useMutation();
  if (isLoading) return <LoadingSpinner />;
  



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
                  <p className="font-semibold line-clamp-3">
                    {tour.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => {
                        setEditingTour(tour);
                        setFormState(true);
                      }}
                      className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded"
                    >
                      Editar
                    </button>
                    <IconButton onClick={() => deleteTour(tour.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
      {formState && editingTour && (
        <FormTour tour={editingTour} closeForm={() => setFormState(false)} />
      )}
    </SidebarLayout>
  );
}

const FormTour = ({ tour, closeForm }: { tour: Tours; closeForm: () => void }) => {
  const initialHotelState = {
    id: tour?.id,
    name: tour?.name,
    description: tour?.description,
    startsAt: tour?.startsAt || "",
    endsAt: tour?.endsAt || "",
    locationId: tour?.locationId,
    images: tour?.images,
  };

  const [tourData, setTourData] = useState({
    ...initialHotelState,
    images: (tour?.images as { img: Prisma.JsonArray } | undefined)?.img || []
  });

  const mutation = api.tours.editTour.useMutation();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setTourData(prevHotel => ({
      ...prevHotel,
      [name]: value,
    }));
  };

  const handleLocationChange = (event: SelectChangeEvent<number>): void => {
    const value = event.target.value.toString() || '';
    setTourData(prevState => ({
      ...prevState,
      locationsId: parseInt(value),
    }));
  };

  const provinces = [
    { id: 1, name: 'San José' },
    { id: 2, name: 'Limón' },
    { id: 3, name: 'Puntarenas' },
    { id: 4, name: 'Heredia' },
    { id: 5, name: 'Alajuela' },
    { id: 6, name: 'Cartago' },
    { id: 7, name: 'Guanacaste' },
  ];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const dataToSend = {
        ...tourData,
        images: tourData.images.map((image) => String(image)),
      };
      await mutation.mutateAsync(dataToSend);
      closeForm();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  const handleStartsAtChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTime = event.target.value;
    setTourData(prevState => ({
      ...prevState,
      startsAt: selectedTime
    }));
  };

  const handleEndsAtChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTime = event.target.value;
    setTourData(prevState => ({
      ...prevState,
      endsAt: selectedTime,
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    const updatedImages = tourData.images.map((image, i) =>
      i === index ? value : image
    );
    setTourData(prevState => ({
      ...prevState,
      images: updatedImages,
    }));
  };

  const handleAddImage = () => {
    setTourData(prevState => ({
      ...prevState,
      images: [...prevState.images, ''], // Add a new empty string for a new image
    }));
  };

  const handleRemoveImage = (index: number) => {
    setTourData(prevState => ({
      ...prevState,
      images: prevState.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="fixed inset-0 flex mt-6 items-center justify-center bg-gray-500 bg-opacity-75">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-3 pt-2 pb-8 mb-4 h-4/5 overflow-auto">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nombre del Tour:</label>
          <input
            type="text"
            name="name"
            value={tourData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Descripción del tour:</label>
          <textarea
            name="description"
            value={tourData.description}
            onChange={handleChange}
            rows={5}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Localización:</label>
          <Select
            sx={{ minWidth: 120 }}
            labelId="province"
            id="provinceSelect"
            value={tourData.locationId}
            label="Location"
            onChange={handleLocationChange}
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {provinces.map(province => (
              <MenuItem key={province.id} value={province.id}>
                {province.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Elegir hora inicio: </label>
          <div className="relative">
            <input className=" border leading-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 white:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="time"
              value={tour.startsAt ?? "00:00"}

              onChange={handleStartsAtChange}
              required />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Elegir hora de finalización: </label>
          <div className="relative">
            <input className=" border leading-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 white:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="time"
              value={tour.endsAt ?? "00:00"}
              onChange={handleEndsAtChange}
              required />
          </div>
        </div>


        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Imágenes:</label>
          {tourData?.images.map((image, index) => (
            <div key={index}>
              <input
                type="text"
                value={(image as string)}
                onChange={(e) => handleImageChange(index, e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 m-2 rounded focus:outline-none focus:shadow-outline"
              >
                <DeleteIcon /> Imagen
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddImage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mb-4"
          >
            <AddIcon /> Imagen
          </button>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {tour ? 'Actualizar Tour' : 'Agregar Tour'}
          </button>
          <button
            type="button"
            onClick={closeForm}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default toursAdmin;