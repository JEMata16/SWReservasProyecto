import { useAuth } from "@clerk/nextjs";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import TourDetails from "~/components/TourDetails";

interface HotelDetailsPageProps {
    tourId: string | undefined;
  }
  
  const TourDetailsPage: React.FC<HotelDetailsPageProps> = ({tourId}) => {
    const {userId} = useAuth()
  
  
    return <TourDetails tourId={tourId as string} userId={userId} />;
  };

  export const getServerSideProps = async (context: NextPageContext) => {
    // Fetch data here, for example:
    const { tourId } = context.query;
    
    // You can perform any necessary data fetching or computations here
  
    return {
      props: {
        tourId
      }
    };
  };
  
  export default TourDetailsPage;