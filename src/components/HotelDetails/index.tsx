import { api } from "~/utils/api";
import Hero from "../Hero";
import React, { useEffect, useState } from "react";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";
import { Prisma } from "@prisma/client";
import axios from "axios";

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
      router.push('/');
    } catch (error) {
      // Handle error or display an error message
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

  const [hotelRatings, setHotelRatings] = useState<hotelReview[]>([]);
  const [hasRated, setHasRated] = useState(false);
  const ratingsData = api.hotelRating.getHotelRatings.useQuery({ hotelId });

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
            if(rating.userId === userId) {
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
          <p className="text-gray-600">Province: {hotel?.location}</p>


          <h3 className="text-xl font-semibold mt-4">Rooms</h3>
          <ul className="list-disc pl-4">

            {roomsList.map((room: Prisma.JsonValue, index: number) => (
              <li key={index} className="mb-2">{(room as { type: string })['type']}</li>
            ))}
          </ul>

          <p className="text-gray-700 mt-4">{hotel?.description}</p>
          <ReservationButton id={hotelId} />
        </div>

        <div className="grid w-full">
          <h2 className="text-xl font-semibold p-4">Images</h2>
          <div className="lg:flex lg:w-1/2 h-auto m-auto gap-4 p-4 flex-center sm:w-full">
            <Carousel images={hotel?.images} />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h2 className="text-xl font-semibold py-2">Rate this hotel</h2>
        <div>
          <form onSubmit={handleRatingSubmit}>
            <div>
              {[...Array(5)].map((_, index) => (
                <label key={index} className="inline-flex items-center">
                  <input
                    key={index}
                    className="hidden"
                    name="rating"
                    value={index + 1}
                    type='radio'
                    onChange={(e) => handleRatingChange(e)}
                  />
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-8 w-8 fill-current ${index < rating.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l2.121 4.243 4.879.707-3.536 3.45.832 4.848-4.295-2.262-4.295 2.262.832-4.848-3.536-3.45 4.879-.707z" />
                  </svg>
                </label>
              ))}
              <div className="grid">
                <label className="text-lg font-semibold py-2 mb-2 ">Message: </label>
                <textarea
                  value={rating.message}
                  onChange={(e) => setRating(prevState => ({ ...prevState, message: e.target.value }))}
                  rows={6}
                  cols={60}
                  className="border border-gray-300 rounded-lg p-2"
                />
              </div>
            </div>
            <button type="submit" 
             className={`bg-${hasRated ? "blue" : "orange"}-500 hover:bg-${hasRated ? "gray" : "orange"}-700 text-white font-bold py-2 px-8 rounded mt-2`}
             disabled={hasRated}
            >
              {hasRated ? "Rating submitted" : "Submit Rating"}
            </button>
          </form>
        </div>
      </div>

      <div className="w-full space-y-2 mt-4 border">
        {hotelRatings && hotelRatings.length > 0 ? (
          <div className="w-full p-8 bg-gray-100">
            <h2>{hotel.name}'s Reviews:</h2>
            <ul className="flex py-5 flex-col space-x-2">
              {hotelRatings.map((review: any, index: number) => (
                <li key={review.id} className={index !== hotelRatings.length - 1 ? 'border-b-2 border-gray-200 pb-2' : 'pb-2'}>
                  <div className="flex items-center">
                    <img src={review.imageUrl} alt={review.firstName} className="h-8 w-8 rounded-full mr-2" />
                    <h3>{review.firstName}</h3>
                  </div>
                  <div className="flex inline-flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-8 w-8 fill-current ${review.rating >= 1 ? 'text-yellow-500' : 'text-gray-300'}`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l2.121 4.243 4.879.707-3.536 3.45.832 4.848-4.295-2.262-4.295 2.262.832-4.848-3.536-3.45 4.879-.707z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-8 w-8 fill-current ${review.rating >= 2 ? 'text-yellow-500' : 'text-gray-300'}`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l2.121 4.243 4.879.707-3.536 3.45.832 4.848-4.295-2.262-4.295 2.262.832-4.848-3.536-3.45 4.879-.707z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-8 w-8 fill-current ${review.rating >= 3 ? 'text-yellow-500' : 'text-gray-300'}`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l2.121 4.243 4.879.707-3.536 3.45.832 4.848-4.295-2.262-4.295 2.262.832-4.848-3.536-3.45 4.879-.707z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-8 w-8 fill-current ${review.rating >= 4 ? 'text-yellow-500' : 'text-gray-300'}`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l2.121 4.243 4.879.707-3.536 3.45.832 4.848-4.295-2.262-4.295 2.262.832-4.848-3.536-3.45 4.879-.707z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-8 w-8 fill-current ${review.rating >= 5 ? 'text-yellow-500' : 'text-gray-300'}`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l2.121 4.243 4.879.707-3.536 3.45.832 4.848-4.295-2.262-4.295 2.262.832-4.848-3.536-3.45 4.879-.707z" />
                    </svg>
                  </div>
                  <div className="flex items-center">
                    <p>{review.message}</p>
                  </div>

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


