import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { api } from '~/utils/api';
import Hero from '~/components/Hero';
import { FormControl, InputBase, InputLabel, MenuItem, NoSsr, alpha, styled } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import { Form } from 'react-router-dom';
import { Hotel, Tours } from '@prisma/client';
import Footer from '~/components/Footer';


const StyledSearch = styled('div')({
    display: 'flex',
    alignItems: 'center',
    borderBottom: '2px solid #ccc',
    padding: '6.5px 5px',
    '&:hover': {
        borderBottom: '2px solid #555',
    },
});

const StyledInput = styled(InputBase)({
    padding: '5px',
    flex: 1,
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
});

const StyledSearchIcon = styled(SearchIcon)({
    marginRight: '5px',
});
type DataItem = Hotel[] | Tours[]
const AllPlaces = () => {
    const [selectedLocation, setSelectedLocation] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const { data: hotelsData, isLoading: hotelsLoading } = api.hotels.hotelBasedOnLocations.useQuery({ locationId: selectedLocation });
    const { data: toursData, isLoading: toursLoading } = api.tours.toursBasedOnLocation.useQuery({ locationId: selectedLocation });
    const provinces = [
        { id: 1, name: 'San José' },
        { id: 2, name: 'Limón' },
        { id: 3, name: 'Puntarenas' },
        { id: 4, name: 'Heredia' },
        { id: 5, name: 'Alajuela' },
        { id: 6, name: 'Cartago' },
        { id: 7, name: 'Guanacaste' }
    ];
    const filterData = (data: DataItem) => {
        return data.filter((item) => {
          // Add your filtering logic here
          // For example, if you want to filter by name, you can do:
          return item.name.toLowerCase().includes(searchInput.toLowerCase());
        });
      };

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    const handleLocationChange = (event: SelectChangeEvent<number>, child: React.ReactNode) => {
        setSelectedLocation(parseInt(event.target.value.toString()));
    };

    const selectedProvince = provinces.find(province => province.id === selectedLocation)?.name;
    const filteredHotelsData = hotelsData ? filterData(hotelsData) : [];
    const filteredToursData = toursData ? filterData(toursData) : [];
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
                    <FormControl>
                        <StyledSearch>
                            <StyledSearchIcon />
                            <StyledInput
                                placeholder="Search..."
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={handleSearchInputChange}
                            />
                        </StyledSearch>
                    </FormControl>
                </NoSsr>
            </div>
            <div className="w-4/5 m-auto cursor-default">
                <div className="my-10 text-center">
                    <h2 className="text-4xl font-bold">Hotels in {selectedProvince}</h2>
                    <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-10 my-10 justify-items-center items-center pb-10 border-b">
                        {filteredHotelsData?.map((hotel) => (
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
                    <h2 className="text-4xl font-bold">Tours in {selectedProvince}</h2>
                    <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-10 my-10 justify-items-center items-center pb-10 border-b">
                        {filteredToursData?.map((tours) => (
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
            <Footer/>
        </>
    );
}



export default AllPlaces;
