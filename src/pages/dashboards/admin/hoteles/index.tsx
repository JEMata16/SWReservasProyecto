import SidebarLayout from "~/layouts/SidebarLayout";
import { api } from "~/utils/api";
import { useState } from "react";
import { IconButton, SelectChangeEvent, Select, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';
import { Hotel, Prisma } from "@prisma/client";

const hotelesAdmin = () => {
  const { data, isLoading } = api.hotels.getAll.useQuery({});
  const mutationDelete = api.hotels.deleteById.useMutation();
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);
  const [formState, setFormState] = useState(false);

  if (isLoading) return <span className="loading loading-spinner loading-md"></span>;

  const deleteHotel = async (id: string) => {
    try {
      await mutationDelete.mutateAsync({
        text: id,
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
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
            {data?.map(hotel => (
              <div
                key={hotel.id}
                className="drop-shadow-2xl text-left rounded space-y-2 bg-white cursor-pointer opacity-80 hover:opacity-100 duration-200"
              >
                <img
                  className="w-full h-1/2 max-h-40 object-cover rounded-t-lg"
                  src={
                    hotel.images &&
                      typeof hotel.images === "object" &&
                      "img" in hotel.images &&
                      Array.isArray(hotel.images.img)
                      ? (hotel.images.img[0] as string)
                      : ""
                  }
                  alt=""
                />
                <div className="p-4 space-y-4">
                  <div className="flex justify-between">
                    <p className="text-sm text-red-400">{hotel.name}</p>
                  </div>
                  <p className="font-semibold line-clamp-3">
                    {hotel.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => {
                        setEditingHotel(hotel);
                        setFormState(true);
                      }}
                      className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded"
                    >
                      Editar
                    </button>
                    <IconButton onClick={() => deleteHotel(hotel.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
      {formState && editingHotel && (
        <FormHotel hotel={editingHotel} closeForm={() => setFormState(false)} />
      )}
    </SidebarLayout>
  );
};

const FormHotel = ({ hotel, closeForm }: { hotel: Hotel ; closeForm: () => void }) => {
  const initialHotelState = {
    id: hotel?.id,
    name: hotel?.name,
    rooms: (hotel?.rooms as { rooms: { type: string; capacity: string; }[] } | undefined)?.rooms || [],
    description: hotel?.description,
    locationsId: hotel?.locationsId,
    images: hotel?.images,
  };

  const [hotelData, setHotelData] = useState({
    ...initialHotelState,
    rooms: (hotel?.rooms as { rooms: Prisma.JsonArray } | undefined)?.rooms || [],
    images: (hotel?.images as { img: Prisma.JsonArray } | undefined)?.img || []
  });

  const mutation = api.hotels.editHotel.useMutation();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setHotelData(prevHotel => ({
      ...prevHotel,
      [name]: value,
    }));
  };

  const handleRoomChange = (index: number, field: string, value: string) => {
    const updatedRooms = hotelData.rooms.map((room, i) =>
      i === index ? {...(room as object), [field]: value } : room
    );
    setHotelData(prevState => ({
      ...prevState,
      rooms: updatedRooms,
    }));
  };

  const handleAddRoom = () => {
    setHotelData(prevState => ({
      ...prevState,
      rooms: [...prevState.rooms, { type: '', capacity: '' }],
    }));
  };

  const handleRemoveRoom = (index: number) => {
    const updatedRooms = hotelData.rooms.filter((_, i) => i !== index);
    setHotelData(prevState => ({
      ...prevState,
      rooms: updatedRooms,
    }));
  };

  const handleLocationChange = (event: SelectChangeEvent<number>): void => {
    const value = event.target.value.toString() || '';
    setHotelData(prevState => ({
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
        ...hotelData,
        rooms: hotelData?.rooms.map((room: Prisma.JsonValue) => ({
          type: (room as {type: string})['type'],
          capacity: (room as {capacity: string})['capacity'],
        })),
        images: hotelData.images.map((image) => String(image)),
      };
      await mutation.mutateAsync(dataToSend);
      closeForm();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (index: number, value: string) => {
    const updatedImages = hotelData.images.map((image, i) =>
      i === index ? value : image
    );
    setHotelData(prevState => ({
      ...prevState,
      images: updatedImages,
    }));
  };

  const handleAddImage = () => {
    setHotelData(prevState => ({
      ...prevState,
      images: [...prevState.images, ''], // Add a new empty string for a new image
    }));
  };

  const handleRemoveImage = (index: number) => {
    setHotelData(prevState => ({
      ...prevState,
      images: prevState.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="fixed inset-0 flex mt-6 items-center justify-center bg-gray-500 bg-opacity-75">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-3 pt-2 pb-8 mb-4 h-4/5 overflow-auto">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nombre del Hotel:</label>
          <input
            type="text"
            name="name"
            value={hotelData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Descripción del hotel:</label>
          <textarea
            name="description"
            value={hotelData.description}
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
            value={hotelData.locationsId}
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
        {hotelData?.rooms.map((room: Prisma.JsonValue, index: number) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Tipo de habitación:</label>
            <input
              type="text"
              value={(room as {type: string})['type']}
              onChange={(e) => handleRoomChange(index, 'type', e.target.value)}
              className="shadow appearance-none border mb-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <label className="block text-gray-700 text-sm mb-2 font-bold mb-2">Capacidad:</label>
            <input
              type="text"
              value={(room as {capacity: string})['capacity']}
              onChange={(e) => handleRoomChange(index, 'capacity', e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              type="button"
              onClick={() => handleRemoveRoom(index)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 m-2 rounded focus:outline-none focus:shadow-outline"
            >
              <DeleteIcon/> Habitación
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddRoom}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mb-4"
        >
          <AddIcon /> Habitación
        </button>
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Imágenes:</label>
        {hotelData?.images.map((image, index) => (
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
              <DeleteIcon/> Imagen
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
            {hotel ? 'Actualizar Hotel' : 'Agregar Hotel'}
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

export default hotelesAdmin;
