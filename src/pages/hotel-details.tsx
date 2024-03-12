import React from 'react';
import HotelDetails from '../components/HotelDetails';
import { useRouter } from 'next/router';

interface HotelDetailsPageProps {
  hotelId: string | undefined; // Adjust the type based on your actual data type
}

const HotelDetailsPage: React.FC<HotelDetailsPageProps> = () => {
  const router = useRouter();
  const { hotelId } = router.query;

  // Now, you can use the hotelId in your component logic

  return <HotelDetails hotelId={hotelId as string} />;
};

export default HotelDetailsPage;

