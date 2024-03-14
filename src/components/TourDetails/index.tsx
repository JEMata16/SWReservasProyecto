import { api } from "~/utils/api";
import Hero from "../Hero";
import React, { useState } from "react";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";
import { Prisma } from "@prisma/client";

interface TourDetailsProps {
  tourId: string;
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
  const mutation = api.reservation.createTourReservation.useMutation();
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
        tourId: id,
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
        <div key={index} className={`carousel-item relative w-full ${index === currentSlide ? 'block' : 'hidden'}`}>
          <img src={imageUrl as string} className="w-full" alt={`Slide ${index + 1}`} />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href={`#slide${index === 0 ? imagesItems.length : index}`} className="btn btn-circle" onClick={prevSlide}>
              ❮
            </a>
            <a href={`#slide${index === imagesItems.length - 1 ? 1 : index + 2}`} className="btn btn-circle" onClick={nextSlide}>
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

const TourDetails: React.FC<TourDetailsProps> = ({ tourId }) => {
  const { data } = api.tours.getById.useQuery({ text: tourId })
  const tour = {
    id: data?.id,
    name: data?.name,
    description: data?.description,
    startsAt: data?.startsAt,
    endsAt: data?.endsAt,
    images: data?.images as Prisma.JsonObject,
    location: api.hotels.getHotelLocalization.useQuery({ locationId: (data?.locationId as number) }).data?.name,
  };
  return (
    <>
      <Hero />
      <div className="w-full space-y-2 border">
        <div className="w-full p-8 bg-gray-100">
          <h2 className="text-3xl font-bold mb-4">{tour?.name}</h2>
          <p className="text-gray-600">Province: {tour?.location}</p>

          <h3 className="text-xl font-semibold mt-4">Rooms</h3>
          <ul className="list-disc pl-4">
              <li  className="mb-2">Starts at:  {tour?.startsAt}</li>
              <li  className="mb-2">Ends at: {tour?.endsAt}</li>
          </ul>

          <p className="text-gray-700 mt-4">{tour?.description}</p>
          <ReservationButton id={tourId} />
        </div>

        <div className="grid w-full">
          <h2 className="text-xl font-semibold p-4">Images</h2>
          <div className="lg:flex lg:w-1/2 h-auto m-auto gap-4 p-4 flex-center sm:w-full">
            <Carousel images={tour?.images} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TourDetails;


