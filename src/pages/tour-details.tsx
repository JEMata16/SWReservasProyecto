import { useRouter } from "next/router";
import TourDetails from "~/components/TourDetails";

interface HotelDetailsPageProps {
    tourId: string | undefined;
  }
  
  const HotelDetailsPage: React.FC<HotelDetailsPageProps> = () => {
    const router = useRouter();
    const { tourId } = router.query;
  
  
    return <TourDetails tourId={tourId as string} />;
  };
  
  export default HotelDetailsPage;