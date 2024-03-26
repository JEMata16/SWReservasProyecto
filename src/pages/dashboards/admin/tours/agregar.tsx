import React, { useState } from "react"
import SidebarLayout from "~/layouts/SidebarLayout"
import { api } from "~/utils/api";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";



const agregarTour = () => {
    const initialTourState = {
        name: '',
        description: '',
        startsAt: '',
        endsAt: '',
        locationId: 1,
        images: [''],
    };

    const [tour, setTour] = useState(initialTourState);
    const mutation = api.tours.addTour.useMutation();
    // CAMBIO NOMBRE DEL TOUR
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setTour(prevTour => ({
            ...prevTour,
            [name as keyof typeof prevTour]: value
        }));
    };
    // SUBMIT DEL FORM
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const tourDataImg = {
                img: tour.images
            };
            await mutation.mutateAsync({
                ...tour,
                images: JSON.stringify(tourDataImg),
            });
            setTour(initialTourState);
        } catch (error) {
            return <div>Error</div>
        }
    };
    // CAMBIO LOCALIZACION DEL TOUR
    const handleLocationChange = (event: SelectChangeEvent<number>): void => {
        const value = event.target.value.toString() || '';
        console.log(value);
        setTour(prevState => ({
            ...prevState,
            locationId: parseInt(value)
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

    // CAMBIO DE IMAGENES
    const handleImageLinkChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const newImages = [...tour.images];
        newImages[index] = value;
        setTour(prevState => ({
            ...prevState,
            images: newImages
        }));
    };

    const handleImageCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const count = parseInt(event.target.value) || 0;
        const newImagesArray = Array(count).fill('');
        setTour(prevTour => ({
            ...prevTour,
            images: newImagesArray
        }));
    };

    // Handle time change for startsAt and endsAt

    const handleStartsAtChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedTime = event.target.value;
        setTour(prevState => ({
            ...prevState,
            startsAt: selectedTime
        }));
    };

    const handleEndsAtChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedTime = event.target.value;
        setTour(prevState => ({
            ...prevState,
            endsAt: selectedTime,
        }));
    };

    return (
        <SidebarLayout>
            <div className="max-w-md mx-auto">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Name:
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={tour.name}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Description:
                        </label>
                        <textarea
                            name="description"
                            value={tour.description}
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
                            value={tour.locationId}
                            label="Location"
                            onChange={handleLocationChange}
                        >
                            {provinces.map(province => (
                                <MenuItem key={province.id} value={province.id}>{province.name}</MenuItem>
                            ))}

                        </Select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Elegir hora inicio: </label>
                        <div className="relative">
                            <input className=" border leading-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 white:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            type="time"
                            value={tour.startsAt}
                            onChange={handleStartsAtChange}
                            required />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Elegir hora de finalización: </label>
                        <div className="relative">
                            <input className=" border leading-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 white:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            type="time"
                            value={tour.endsAt}
                            onChange={handleEndsAtChange}
                            required />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Number of Images:
                        </label>
                        <input
                            type="number"
                            name="imageCount"
                            value={tour.images.length}
                            onChange={handleImageCountChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    {tour.images.map((image, index) => (
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
                            Add Tour
                        </button>
                    </div>
                </form>
            </div>
        </SidebarLayout>
    )
}

export default agregarTour;