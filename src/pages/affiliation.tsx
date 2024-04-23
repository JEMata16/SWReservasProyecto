
import { useAuth } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/server';
import { Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import Link from "next/link";
import Hero from '~/components/Hero';
import { api } from '~/utils/api';
import emailjs from 'emailjs-com';
import Footer from '~/components/Footer';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const DowngradeButton = () => {
    return (
        <div className="mt-[25px]">
            <button className="bg-[#006EF5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold">Downgrade -</button>
        </div>
    )
}

const UpgradeButton = () => {
    return (
        <div className="mt-[25px]">
            <button className="bg-[#006EF5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold">Upgrade +</button>
        </div>
    )
}

const CurrentPlanButton = () => {
    return (
        <div className="mt-[25px]">
            <button className="bg-[#fb5607] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold">Current Plan</button>
        </div>
    )
}

const AskForPlan = ({ userEmail }: { userEmail: string | null }) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const sendEmail = () => {
        const formData: {
            from_name: string,
            to_name: string,
            message: string,
            reply_to: string
          } = {
            from_name: "MkConnection",
            to_name: "Usuario x",
            message: "Afiliacion prueba",
            reply_to: "josellique@gmail.com",
          }; 

        const MkToUserForm: {
            from_name: string,
            to_name: string,
            message: string,
            to_email: string
          } = {
            from_name: "MkConnection",
            to_name: userEmail || "Usuario",
            message: "We have received your email interested in our affiliation program. Thank you! We will reach you soon.",
            to_email: userEmail || "",
          }; 
        // emailjs
        //   .send(
        //     'service_r40kq5j', // service ID
        //     'template_cxs8boo', // template ID
        //      formData || '', // form ID
        //     'HfoHqgMxcMwAV16iJ' // public key
        //   )
        //   .then(
        //     () => {
        //       console.log('SUCCESS!');
        //     },
        //     (error) => {
        //       console.log('FAILED...', error.text);
        //     }
        //   );

          emailjs
          .send(
            'service_r40kq5j', // service ID
            'template_02vffy5', // template ID
            MkToUserForm || '', // form ID
            'HfoHqgMxcMwAV16iJ' // public key
          )
          .then(
            () => {
              console.log('SUCCESS!');
              window.location.reload();
            },
            (error) => {
              console.log('FAILED...', error.text);
              window.location.reload();
            }
          );
      };
    return (
        <>
            <div className="mt-[25px]">
                <button onClick={openModal} className="bg-[#fb5607] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold">Ask for plan</button>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div>
                    <Typography sx={{ fontWeight: "bold", textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)" }} variant="h4" id="modal-title" mb={2}>
                        We will be sending an email to the following email address:
                    </Typography>
                    <Typography variant="h5">{userEmail}</Typography>
                    <div className="mt-[25px]">
                        <button onClick={sendEmail} className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded">
                            Know more
                        </button>
                    </div>
                </div>
            </Modal >
        </>
    )
}



const renderButtonBasedOnPlan = (planAffiliation: number | null, cardAffiliation: number, userEmail: string | null) => {
    if (!planAffiliation) {
        return <AskForPlan userEmail={userEmail} />;
    } else if (cardAffiliation > planAffiliation) {
        return <UpgradeButton />;
    } else if (cardAffiliation < planAffiliation) {
        return <DowngradeButton />;
    } else {
        return <CurrentPlanButton />;
    }
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    const modalClasses = isOpen ? 'fixed inset-0 flex items-center justify-center' : 'hidden';

    return (
        <div className={`${modalClasses} bg-black bg-opacity-50`}>
            <div className="bg-white p-8 max-w-md rounded-lg shadow-md">
                <button className="absolute top-28 right-4 text-gray-200" onClick={onClose}>
                    X
                </button>
                {children}
            </div>
        </div>
    );
};

const Affiliation = () => {
    const [userEmail, setUserEmail] = React.useState<string | null>(null);
    const { userId } = useAuth();
    const { data: userAffiliation } = api.affiliation.getByUserId.useQuery({ id: userId ?? '' });
    const affiliationMapping: { [key: string]: number } = {
        FREE: 0,
        FAST: 1,
        ACCELERATE: 2,
        PREMIUM: 3,
    };
    const { data: hotels } = api.affiliation.getHotels.useQuery();

    let affiliation: number | null = null;

    React.useEffect(() => {

        const fetchUser = async () => {
            try {
                const userResponse = await axios.get<{ user: User }>(`/api/userById/${userId}`);
                setUserEmail(userResponse.data.user.emailAddresses?.[0]?.emailAddress ?? null);
            } catch {
                return null;
            }

        };
        fetchUser()
    }, [userId]);

    if (userAffiliation) {
        const affiliationString = userAffiliation?.affiliation;
        affiliation = affiliationMapping[affiliationString] || null;
    }

    return (
        <>
            <Hero />
            {hotels && hotels.length > 0 && (
                <div className="w-4/5 m-auto cursor-default">
                    <div className="my-10 text-center">
                        <h1 className="text-4xl font-bold">Check out our affiliate users hotels</h1>
                        <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-10 my-10 justify-items-center items-center pb-10 border-b">
                            {hotels?.map((hotel) => (
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
                                                <Link href={{ pathname: "/affiliate-hotel-details", query: { hotelId: hotel.id } }}>
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
            )}
            <div className="my-10 text-center">
                <h1 className="text-4xl font-bold">Want to join the team?</h1>
            </div>

            <div className='flex min-h-screen pt-[30px] px-[40px]'>
                <div className="min-w-full">
                    <p className="text-[#00153B] text-[20px] leading-[40px] font-semibold">
                        Affiliation
                    </p >
                    <div>
                        <p className="text-[#717F87] text-[15px] leading-[27px] font-medium">
                            Do you want to be part of the family and earn income?
                        </p>
                    </div>

                    <div className="mt-[30px] inline-flex border border-[#E1E3E5] shadow-[0px 1px 2px #E1E3E5] divide-[#E1E3E5] divide-x rounded-[5px]">
                        <button className="bg-white hover:bg-[#F6F6F7] hover:text-[#717F87] text-[#0E1823] leading-[16px] text-[13px] font-semibold font-bold py-[15px] px-[25px] rounded-l">
                            Monthly
                        </button>
                    </div>
                    {/* FIRST CARD */}
                    <div className="mt-[20px] grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 grid-cols-1 gap-[20px]">
                        <div className='relative'>
                            <div key="1" className="w-full h-full bg-[#fff] rounded-[10px] shadow-lg border border-[#E1E3E5] divide-y transform hover:scale-105 transition-transform">
                                <div className="pt-[15px] px-[25px] pb-[25px]">
                                    <div className="flex justify-end">
                                        <div className="bg-[#F6F6F7] rounded-[20px] flex justify-center align-center px-[12px]">
                                            <p className="text-[#00153B] text-[12px] leading-[28px] font-bold">
                                                Starter
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-[#00153B] text-[19px] leading-[24px] font-bold">
                                            Trial
                                        </p>
                                        <p className="text-[#00153B] text-[50px] leading-[63px] font-bold">
                                            Free
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                                            30 days
                                        </p>

                                    </div>
                                </div>

                                <div className="pt-[25px] px-[25px] pb-[35px]">
                                    <div>
                                        <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                            1 active listing
                                        </p>
                                        <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                            Contact information
                                        </p>
                                        <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                            Availability calendar
                                        </p>
                                        <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                            Booking management
                                        </p>
                                        <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                            Basic support
                                        </p>
                                    </div>
                                    <div className="absolute bottom-0 w-full pb-4">
                                        {renderButtonBasedOnPlan(affiliation, 0, userEmail)}
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* SECOND CARD */}
                        <div className='relative'>
                            <div key="2" className="w-full h-full bg-[#fff] rounded-[10px] shadow-lg border border-[#E1E3E5] divide-y transform hover:scale-105 transition-transform">
                                <div className="pt-[15px] px-[25px] pb-[25px]">
                                    <div className="flex justify-end">
                                        <div className="bg-[#F6F6F7] rounded-[20px] flex justify-center align-center px-[12px]">
                                            <p className="text-[#00153B] text-[12px] leading-[28px] font-bold">
                                                Basic
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-[#00153B] text-[19px] leading-[24px] font-bold">
                                            Fast Start
                                        </p>
                                        <p className="text-[#00153B] text-[50px] leading-[63px] font-bold">
                                            $10
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                                            30 days
                                        </p>

                                    </div>
                                </div>

                                <div className="pt-[25px] px-[25px] pb-[35px]">
                                    <div>
                                        <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                            3 active listings
                                        </p>
                                        <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                            Contact information
                                        </p>
                                        <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                            Availability calendar
                                        </p>
                                        <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                            Booking management
                                        </p>
                                        <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                            Basic support
                                        </p>
                                        <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                            Basic performance statistics
                                        </p>
                                        <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                            Option to add additional photos
                                        </p>
                                    </div>
                                    <div className="absolute bottom-0 w-full pb-4">
                                        {renderButtonBasedOnPlan(affiliation, 1, userEmail)}
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* THIRD CARD */}
                        <div className="relative">
                            <div key="3" className="w-full bg-[#fff] rounded-[10px] shadow-lg border border-[#E1E3E5] divide-y transform hover:scale-105 transition-transform">
                                <div className="pt-[15px] px-[25px] pb-[25px]">
                                    <div className="flex justify-end">
                                        <div className="bg-[#F6F6F7] rounded-[20px] flex justify-center align-center px-[12px]">
                                            <p className="text-[#00153B] text-[12px] leading-[28px] font-bold">
                                                Mid
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-[#00153B] text-[19px] leading-[24px] font-bold">
                                            Accelerate
                                        </p>
                                        <p className="text-[#00153B] text-[50px] leading-[63px] font-bold">
                                            $30
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                                            30 days
                                        </p>

                                    </div>
                                </div>

                                <div className="pt-[25px] px-[25px] pb-[100px]">
                                    <div>
                                        <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                            10 active listings
                                        </p>
                                        <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                            Contact information
                                        </p>
                                        <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                            Availability calendar
                                        </p>
                                        <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                            Booking management
                                        </p>
                                        <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                            Priority support
                                        </p>
                                        <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                            Detailed performance statistics
                                        </p>
                                        <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                            Option to add photos and videos
                                        </p>
                                        <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                            Boost your listing in search
                                        </p>
                                    </div>
                                    <div className='absolute bottom-0 pb-4'>
                                        {renderButtonBasedOnPlan(affiliation, 2, userEmail)}
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* FOURTH CARD */}
                        <div className="relative">
                            <div key="4" className="w-full h-full bg-[#fff] rounded-[10px] shadow-lg border border-[#E1E3E5] divide-y transform hover:scale-105 transition-transform">
                                <div className="pt-[15px] px-[25px] pb-[25px]">
                                    <div className="flex justify-end">
                                        <div className="bg-[#F6F6F7] rounded-[20px] flex justify-center align-center px-[12px]">
                                            <p className="text-[#00153B] text-[12px] leading-[28px] font-bold">
                                                Pro
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-[#00153B] text-[19px] leading-[24px] font-bold">
                                            Premium
                                        </p>
                                        <p className="text-[#00153B] text-[50px] leading-[63px] font-bold">
                                            $50
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                                            30 days
                                        </p>


                                    </div>
                                </div>

                                <div className="pt-[25px] px-[25px] pb-[100px]">
                                    <div>
                                        <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                            Unlimited listings
                                        </p>
                                        <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                            Contact information
                                        </p>
                                        <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                            Availability calendar
                                        </p>
                                        <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                            Booking management
                                        </p>
                                        <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                            Premium support
                                        </p>
                                        <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                            Full performance statistics
                                        </p>
                                        <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                            Option to add photos, videos, and virtual tours
                                        </p>
                                        <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                            Featured listing in search
                                        </p>
                                        <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                                            Personalized advice
                                        </p>

                                    </div>
                                    <div className='absolute bottom-0 pb-4'>
                                        {renderButtonBasedOnPlan(affiliation, 3, userEmail)}
                                    </div>


                                </div>
                            </div>
                        </div>

                    </div>
                </div >
            </div >
            <Footer/>
        </>
    )
}




export default Affiliation;