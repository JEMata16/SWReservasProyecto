import React, { useState } from "react"
import SidebarLayout from "~/layouts/SidebarLayout"
import { api } from "~/utils/api";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";



const agregarHotel = () => {
    const initialHotelState = {
        name: '',
        rooms: [{ type: '', capacity: '' }],
        description: '',
        locationsId: 1,
        images: [''],
    };

    const [hotel, setHotel] = useState(initialHotelState);
    const mutation = api.hotels.addHotel.useMutation();
    // CAMBIO NOMBRE DEL HOTEL
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setHotel(prevHotel => ({
            ...prevHotel,
            [name as keyof typeof prevHotel]: value
        }));
    };
    // SUBMIT DEL FORM
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const hotelDataImg = {
                img: hotel.images
            };
            await mutation.mutateAsync({
                ...hotel,
                images: JSON.stringify(hotelDataImg),
            });
            setHotel(initialHotelState);
        } catch (error) {
            return <div>Error</div>
        }
    };
    // CAMBIO LOCALIZACION DEL HOTEL
    const handleLocationChange = (event: SelectChangeEvent<number>): void => {
        const value = event.target.value.toString() || '';
        console.log(value);
        setHotel(prevState => ({
            ...prevState,
            locationsId: parseInt(value)
        }));
    };
    const provinces = [
        { id: 1, name: 'San José' },
        { id: 2, name: 'Limón' },
        { id: 3, name: 'Puntarenas' },
        { id: 4, name: 'Heredia' },
        { id: 5, name: 'Alajuela' },
        { id: 6, name: 'Cartago' },
        { id: 7, name: 'Guanacaste' }
    ];

    // CAMBIO DE CUARTOS DEL HOTEL
    type Room = {
        type: string;
        capacity: string;
        [key: string]: string; // This is an index signature
    };
    const handleRoomChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const newRooms = hotel.rooms.map((room, roomIndex) => {
            if (roomIndex === index) {
                return {
                    ...room,
                    [name]: value
                };
            }
            return room;
        });

        setHotel(prevHotel => ({
            ...prevHotel,
            rooms: newRooms
        }));
    };

    const handleRoomCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const count = parseInt(event.target.value) || 0;
        setHotel(prevHotel => {
          const newRooms = [...prevHotel.rooms]; // Create a copy of the existing rooms array
          if (count > prevHotel.rooms.length) {
            // If the new count is greater than the current count, add new rooms
            Array(count - prevHotel.rooms.length).fill(0).forEach(() => {
              newRooms.push({ type: '', capacity: '' });
            });
          } else if (count < prevHotel.rooms.length) {
            // If the new count is less than the current count, remove rooms
            newRooms.splice(count);
          }
          return {
            ...prevHotel,
            rooms: newRooms
          };
        });
      };

    // CAMBIO DE IMAGENES
    const handleImageLinkChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const newImages = [...hotel.images];
        newImages[index] = value;
        setHotel(prevState => ({
            ...prevState,
            images: newImages
        }));
    };

    const handleImageCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const count = parseInt(event.target.value) || 0;
        setHotel(prevHotel => {
          const newImagesArray = [...prevHotel.images]; // Create a copy of the existing images array
          if (count > prevHotel.images.length) {
            // If the new count is greater than the current count, add new images
            Array(count - prevHotel.images.length).fill(0).forEach(() => {
              newImagesArray.push('');
            });
          } else if (count < prevHotel.images.length) {
            // If the new count is less than the current count, remove images
            newImagesArray.splice(count);
          }
          return {
            ...prevHotel,
            images: newImagesArray
          };
        });
      };


    return (
        <SidebarLayout>
            <div className="max-w-md mx-auto pt-6">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Name:
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={hotel.name}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    {/* Add inputs for other fields */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Description:
                        </label>
                        <textarea
                            name="description"
                            value={hotel.description}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Locations:
                        </label>
                        <Select
                            sx={{ minWidth: 120 }}
                            labelId="province"
                            id="provinceSelect"
                            value={hotel.locationsId}
                            label="Location"
                            onChange={handleLocationChange}
                            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            {provinces.map(province => (
                                <MenuItem key={province.id} value={province.id}>{province.name}</MenuItem>
                            ))}

                        </Select>
                    </div>
                    {/* Add similar inputs for other fields like rooms, images */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Number of Rooms:
                        </label>
                        <input
                            type="number"
                            name="roomCount"
                            value={hotel.rooms.length}
                            onChange={handleRoomCountChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    {hotel.rooms.map((room, index) => (
                        <div key={index} className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Room {index + 1}:
                            </label>
                            <input
                                type="text"
                                name="type"
                                value={room.type}
                                placeholder="Type"
                                onChange={e => handleRoomChange(index, e)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <input
                                type="number"
                                name="capacity"
                                value={room.capacity}
                                placeholder="Capacity"
                                onChange={e => handleRoomChange(index, e)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                            />
                        </div>
                    ))}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Number of Images:
                        </label>
                        <input
                            type="number"
                            name="imageCount"
                            value={hotel.images.length}
                            onChange={handleImageCountChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    {hotel.images.map((image, index) => (
                        <div key={index} className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Image {index + 1}:
                            </label>
                            <input
                                type="text"
                                name="img"
                                value={image}
                                placeholder="Image URL"
                                onChange={e => handleImageLinkChange(index, e)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    ))}
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Add Hotel
                        </button>
                    </div>
                </form>
            </div>
        </SidebarLayout>
    )
}

export default agregarHotel;