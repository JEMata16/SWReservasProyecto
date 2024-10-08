import { api } from "~/utils/api";
import Hero from "../Hero";
import React, { useEffect, useState } from "react";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useAuth, useSession, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { IconButton, Typography } from "@mui/material";
import { Prisma } from "@prisma/client";
import axios from "axios";
import emailjs from 'emailjs-com';
import { checkUserRole } from "~/utils/checkUserRole";
import DeleteIcon from "@mui/icons-material/Delete";

interface HotelDetailsProps {
  hotelId: string;
  userId: string | null | undefined;
  onRatingUpdate: (newRating: number) => Promise<void>;
}
interface CarouselProps {
  images: Prisma.JsonObject | undefined;
}
interface ReservationProps {
  id: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const modalClasses = isOpen ? 'fixed inset-0 flex items-center justify-center' : 'hidden';

  return (
    <div className={`${modalClasses} bg-black bg-opacity-50`}>
      <div className="bg-white p-8 max-w-md rounded-lg shadow-md">
        <button className="absolute top-28 right-4 text-gray-400" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

const ReservationButton: React.FC<ReservationProps> = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const user = useAuth();
  const mutation = api.reservation.createReservation.useMutation();
  const router = useRouter();
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const makeReservation = async () => {
    try {
      await mutation.mutateAsync({
        idHotel: id,
        userid: user.userId as string,
        phoneNumber: phone,
      });
      emailjs.init('5QduFYRblZ--cqdSv');

      const formData = {
        to_name: useUser().user?.firstName,
        to_email: useUser().user?.emailAddresses[0],
        interest: api.hotels.getById.useQuery({text:id}).data?.name,
      }
      emailjs.send(
        'service_fykg52o', // service ID
        'template_yvu7dbz', // template ID
        formData,           // template params
        '5QduFYRblZ--cqdSv' // public key
      )
      .then(
        () => {
          alert("Send");
          window.location.reload();
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );
      window.location.reload();
      router.push('/');
    } catch (error) {
      // Handle error or display an error message
      window.location.reload();
    }
  };

  return (
    <>
      <div>
        <button onClick={openModal} className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded">
          Know more
        </button>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div>
            <Typography variant="h5" id="modal-title" mb={2}>
              We will contact you with more info!!
            </Typography>
            <Typography variant="h3">We will also contact you via Email</Typography>
            <PhoneInput
              defaultCountry="US"
              value={phone}
              className="py-2 px-4 font-serif"
              onChange={(phone) => setPhone(phone)}
              name="phone"
              required
            />

            <button
              type="button"
              onClick={makeReservation}
              className="mt-4 bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded"
            >
              Make Reservation
            </button>
          </div>
        </Modal>
      </div>

    </>
  );
};

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const imagesItems = images && images['img'] ? images['img'] as Prisma.JsonArray : [];
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? imagesItems.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === imagesItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="carousel content-center w-full">
      {imagesItems.map((imageUrl: Prisma.JsonValue, index: number) => (
        <div key={index} className={`carousel-item w-full ${index === currentSlide ? 'block' : 'hidden'}`}>
          <img src={imageUrl as string} className="w-full top-0 left-0" alt={`Slide ${index + 1}`} />
          <div className="flex bottom-0 left-0 right-0 justify-between transform -translate-y-1/2 left-5 right-5 top-2">
            <a href={`#slide${index === 0 ? imagesItems.length : index}`} className="btn btn-circle mt-[-250px] text-white" onClick={prevSlide}>
              ❮
            </a>
            <a href={`#slide${index === imagesItems.length - 1 ? 1 : index + 2}`} className="btn btn-circle mt-[-250px] text-white" onClick={nextSlide}>
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};


const HotelDetails: React.FC<HotelDetailsProps> = ({ hotelId, userId, onRatingUpdate }) => {
  const [hotelRatings, setHotelRatings] = useState<hotelReview[]>([]);
  const [hasRated, setHasRated] = useState(false);
  const ratingsData = api.hotelRating.getHotelRatings.useQuery({ hotelId });
  const {session} = useSession();
  const userRole = session ? checkUserRole(session) : null;
  const { data } = api.hotels.getById.useQuery({ text: hotelId })

  const hotel = {
    id: data?.id,
    name: data?.name,
    description: data?.description,
    rooms: data?.rooms as Prisma.JsonObject,
    images: data?.images as Prisma.JsonObject,
    location: api.hotels.getHotelLocalization.useQuery({ locationId: (data?.locationsId as number) }).data?.name,
  };

  const mutation = api.hotelRating.createHotelRating.useMutation();
  const roomsList = hotel.rooms && hotel.rooms['rooms'] ? hotel.rooms['rooms'] as Prisma.JsonArray : [];
  const deleteMutation = api.hotelRating.deleteHotelRating.useMutation();
  const deleteRating = async (ratingId: string) => {
    try{
      await deleteMutation.mutateAsync({id: ratingId});
      window.location.reload();
    }catch{
      window.location.reload();
    }
  }

  const initialRatingState = {
    hotelId: hotelId,
    rating: 0,
    message: "",
    userId: userId || "",
  }
  const [rating, setRating] = useState(initialRatingState);
  const handleRatingSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      await mutation.mutateAsync({
        ...rating,
      });
      onRatingUpdate(rating.rating);
      setHasRated(true);
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const ratingValue = Number(value);
    setRating(prevState => ({
      ...prevState,
      rating: ratingValue,
    }));
  };

  type hotelReview = {
    id: string;
    message: string;
    rating: number;
    userId: string;
    hotelId: string;
    createdAt: Date;
    imageUrl: string;
    firstName: string;
  };

  type UserDetailsType = {
    imageUrl: string;
    firstName: string;
  };



  useEffect(() => {
    if (!ratingsData || ratingsData.isLoading || !ratingsData.data || ratingsData.data.length === 0) {

      return;
    }
    const fetchHotelRatings = async () => {
      try {
        const data = ratingsData.data || [];
        const filledRatings = await Promise.all(
          data.map(async (rating) => {
            const userResponse = await axios.get<{ user: UserDetailsType }>(`/api/userById/${rating.userId}`);
            if (rating.userId === userId) {
              setHasRated(true);
            }
            return {
              ...rating,
              imageUrl: userResponse.data.user.imageUrl,
              firstName: userResponse.data.user.firstName,
            };
          })
        );

        setHotelRatings(filledRatings);
      } catch (error) {
        console.error("Error fetching hotel ratings:", error);
      }
    };
    fetchHotelRatings();
  }, [ratingsData, hotelId]);
  return (
    <>
      <Hero />
      <div className="w-full space-y-2 border">
        <div className="w-full p-8 bg-gray-100">
          <h2 className="text-3xl font-bold mb-4">{hotel?.name}</h2>
          <p className="text-xl text-gray-700 ">Located in the province: {hotel?.location}</p>
          <p className="text-xl text-gray-700 mt-4">{hotel?.description}</p>


          <h3 className="text-2xl font-semibold mt-4">Rooms</h3>
          <ul className="list-disc pl-4">

            {roomsList.map((room: Prisma.JsonValue, index: number) => (
              <li key={index} className="text-xl mb-2">{(room as { type: string })['type']}</li>
            ))}
          </ul>


          <ReservationButton id={hotelId} />
        </div>

        <div className="grid w-full">
          <h2 className="text-xl font-semibold p-4">Images</h2>
          <div className="lg:flex lg:w-1/2 h-auto m-auto gap-4 p-4 flex-center sm:w-full">
            <Carousel images={hotel?.images} />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Rate this hotel</h2>
        <form onSubmit={handleRatingSubmit} className="w-full max-w-lg">
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, index) => (
              <label key={index} className="inline-flex items-center cursor-pointer">
                <input
                  className="hidden"
                  name="rating"
                  value={index + 1}
                  type="radio"
                  onChange={handleRatingChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-10 w-10 fill-current ${index < rating.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l2.121 4.243 4.879.707-3.536 3.45.832 4.848-4.295-2.262-4.295 2.262.832-4.848-3.536-3.45 4.879-.707z" />
                </svg>
              </label>
            ))}
          </div>
          <div className="mb-4">
            <label className="text-lg font-semibold mb-2 block">Message:</label>
            <textarea
              value={rating.message}
              onChange={(e) => setRating(prevState => ({ ...prevState, message: e.target.value }))}
              rows={6}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-${hasRated ? 'blue' : 'orange'}-500 hover:bg-${hasRated ? 'blue' : 'orange'}-700 text-white font-bold py-2 px-4 rounded transition duration-200`}
            disabled={hasRated}
          >
            {hasRated ? 'Rating submitted' : 'Submit Rating'}
          </button>
        </form>
      </div>


      <div className="w-full space-y-2 mt-4 border">
        {hotelRatings && hotelRatings.length > 0 ? (
          <div className="w-full p-10 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">{hotel.name}'s Reviews:</h2>
            <ul className="space-y-6">
              {hotelRatings.map((review: any, index: number) => (
                <li key={review.id} className={index !== hotelRatings.length - 1 ? 'border-b border-gray-300 pb-6' : 'pb-6'}>
                  <div className="flex items-center mb-4">
                  
                    <img src={review.imageUrl} alt={review.firstName} className="h-10 w-10 rounded-full mr-4" />
                    <h3 className="text-lg font-medium mr-4">{review.firstName}</h3>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-6 w-6 fill-current ${review.rating > i ? 'text-yellow-500' : 'text-gray-300'}`}
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l2.121 4.243 4.879.707-3.536 3.45.832 4.848-4.295-2.262-4.295 2.262.832-4.848-3.536-3.45 4.879-.707z" />
                        </svg>
                      ))}
                      {userRole === "org:admin" && (
                        <IconButton onClick={() => deleteRating(review.id)}>
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </div>

                  </div>
                  <p className="text-base">{review.message}</p>
                </li>
              ))}
            </ul>
          </div>

        ) : (
          <div className="w-full p-8 bg-gray-100">
            <h2>No reviews yet</h2>
          </div>
        )}
      </div>


    </>
  );
};

export default HotelDetails;


