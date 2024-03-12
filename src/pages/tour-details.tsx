import { useRouter } from "next/router";
import TourDetails from "~/components/TourDetails";

interface HotelDetailsPageProps {
    tourId: string | undefined; // Adjust the type based on your actual data type
  }
  
  const HotelDetailsPage: React.FC<HotelDetailsPageProps> = () => {
    const router = useRouter();
    const { tourId } = router.query;
  
    // Now, you can use the hotelId in your component logic
  
    return <TourDetails tourId={tourId as string} />;
  };
  
  export default HotelDetailsPage;