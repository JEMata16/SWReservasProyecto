import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { api } from '~/utils/api';
import Hero from '~/components/Hero';
import { FormControl, InputBase, InputLabel, MenuItem, NoSsr, alpha, styled } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const AllPlaces = () => {
    const [selectedLocation, setSelectedLocation] = useState(6);
    const { data: hotelsData, isLoading: hotelsLoading } = api.hotels.hotelBasedOnLocations.useQuery({ locationId: selectedLocation });
    const {data: toursData, isLoading: toursLoading} = api.tours.toursBasedOnLocation.useQuery({locationId: selectedLocation});
    const provinces = [
        { id: 1, name: 'San José' },
        { id: 2, name: 'Limón' },
        { id: 3, name: 'Puntarenas' },
        { id: 4, name: 'Heredia' },
        { id: 5, name: 'Alajuela' },
        { id: 6, name: 'Cartago' },
        { id: 7, name: 'Guanacaste' }
    ];



    const handleLocationChange = (event: SelectChangeEvent<number>, child: React.ReactNode) => {
        setSelectedLocation(parseInt(event.target.value.toString())); 
    };

    const selectedProvince = provinces.find(province => province.id === selectedLocation)?.name;

    return (
        <>
            <Hero />
            <div className='flex justify-center mt-10'>
                <NoSsr>
                    <FormControl
                        sx={{ m: 1, minWidth: 140 }}
                        variant='standard'>
                        <InputLabel id="province">Province</InputLabel>
                        <Select
                            labelId="province"
                            id="provinceSelect"
                            value={selectedLocation}
                            label="Location"
                            onChange={handleLocationChange}
                        >
                            {provinces.map(province => (
                                <MenuItem key={province.id} value={province.id}>{province.name}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search..."
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                </NoSsr>
            </div>
            <div className="w-4/5 m-auto cursor-default">
                <div className="my-10 text-center">
                    <h2 className="text-4xl font-bold">Hotels in {selectedProvince}</h2>
                    <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-10 my-10 justify-items-center items-center pb-10 border-b">
                        {hotelsData?.map((hotel) => (
                            <div key={hotel.id} className="drop-shadow-2xl text-left rounded space-y-2 bg-white cursor-pointer opacity-80 hover:opacity-100 duration-200">
                                <img
                                    className="w-full h-1/2 max-h-40 object-cover rounded-t-lg"
                                    src={(hotel.images && typeof hotel.images === 'object' && 'img' in hotel.images && Array.isArray(hotel.images.img)) ? hotel.images.img[0] as string : ""}
                                    alt=""
                                />
                                <div className="p-4 space-y-4">
                                    <div className="flex justify-between">
                                        <p className="text-sm text-red-400">{hotel.name}</p>
                                    </div>
                                    <p className="font-semibold">{hotel.description}</p>
                                    <button className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded">
                                        <Link href={{ pathname: "/hotel-details", query: { hotelId: hotel.id } }}>
                                            See more
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </section>
                    <h2 className="text-4xl font-bold">Tours in {selectedProvince}</h2>
                    <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-10 my-10 justify-items-center items-center pb-10 border-b">
                        {toursData?.map((tour) => (
                            <div key={tour.id} className="drop-shadow-2xl text-left rounded space-y-2 bg-white cursor-pointer opacity-80 hover:opacity-100 duration-200">
                                <img
                                    className="w-full h-1/2 max-h-40 object-cover rounded-t-lg"
                                    src={(tour.images && typeof tour.images === 'object' && 'img' in tour.images && Array.isArray(tour.images.img)) ? tour.images.img[0] as string : ""}
                                    alt=""
                                />
                                <div className="p-4 space-y-4">
                                    <div className="flex justify-between">
                                        <p className="text-sm text-red-400">{tour.name}</p>
                                    </div>
                                    <p className="font-semibold">{tour.description}</p>
                                    <button className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded">
                                        <Link href={{ pathname: "/tour-details", query: { tourId: tour.id } }}>
                                            See more
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        </>
    );
}



export default AllPlaces;
