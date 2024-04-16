import React from 'react';
import { NextPageContext } from 'next';
import { useAuth } from '@clerk/nextjs';
import AffiliateHotelDetails from '~/components/AffiliateHotelDetails';

interface HotelDetailsPageProps {
    hotelId: string | undefined; 
  }
  
  const HotelDetailsPage: React.FC<HotelDetailsPageProps> = ({ hotelId }) => {
    const {userId} = useAuth()
    return <AffiliateHotelDetails hotelId={hotelId as string} userId={userId} />;
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