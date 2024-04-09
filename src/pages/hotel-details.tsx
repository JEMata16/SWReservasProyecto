import React from 'react';
import HotelDetails from '../components/HotelDetails';
import { NextPageContext } from 'next';
import { useAuth } from '@clerk/nextjs';

interface HotelDetailsPageProps {
  hotelId: string | undefined; 
  onRatingUpdate?: () => Promise<void>;
}

const HotelDetailsPage: React.FC<HotelDetailsPageProps> = ({ hotelId }) => {
  const {userId} = useAuth()
  const handleRatingUpdate = async (newRating: number) => {
    try{
      // const notificationMessage = `The rating for hotel ${hotelId} has been updated to ${newRating}`;
    } catch(error){
      console.error('Error submitting rating:', error);
    }
  }

  return <HotelDetails hotelId={hotelId as string} userId={userId} onRatingUpdate={handleRatingUpdate}/>;
};

export const getServerSideProps = async (context: NextPageContext) => {
  // Fetch data here, for example:
  const { hotelId } = context.query;
  
  // You can perform any necessary data fetching or computations here

  return {
    props: {
      hotelId
    }
  };
};

export default HotelDetailsPage;

