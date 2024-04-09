import React from 'react';
import Hero from '~/components/Hero';

const Affiliation = () => {
  return (
    <><Hero />
    <div className='flex min-h-screen pt-[30px] px-[40px]'>
   <div className="min-w-full">
       <p className="text-[#00153B] text-[20px] leading-[40px] font-semibold">
           Affiliation
       </p>

       <div>
           <p className="text-[#717F87] text-[15px] leading-[27px] font-medium">
           Do you want to be part of the family and earn income?
           </p>
       </div>

       <div className="mt-[30px] inline-flex border border-[#E1E3E5] shadow-[0px 1px 2px #E1E3E5] divide-[#E1E3E5] divide-x rounded-[5px]">
            <button className="bg-white hover:bg-[#F6F6F7] hover:text-[#717F87] text-[#0E1823] leading-[16px] text-[13px] font-semibold font-bold py-[15px] px-[25px] rounded-l">
                Monthly
            </button>
			<button className="bg-white hover:bg-[#F6F6F7] hover:text-[#717F87] text-[#0E1823] text-[13px] leading-[16px] font-semibold font-bold py-[15px] px-[25px] rounded-r">
                Annual
            </button>
		</div>

        <div className="mt-[20px] grid grid-cols-3 gap-[20px]">
            <div key="1" className="w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y">
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

                    <div className="mt-[25px]">
                        <button className="bg-[#006EF5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold">Downgrade +</button>
                    </div>
                </div>
            </div>

            <div key="2" className="w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y">
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

                    <div className="mt-[25px]">
                        <button className="bg-[#E1E3E5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold">Current Plan</button>
                    </div>
                </div>
            </div>

            <div key="3" className="w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y">
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

                <div className="pt-[25px] px-[25px] pb-[35px]">
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

                    <div className="mt-[25px]">
                        <button className="bg-[#006EF5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold">Upgrade +</button>
                    </div>
                </div>
            </div>
            <div key="4" className="w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y">
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

                <div className="pt-[25px] px-[25px] pb-[35px]">
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

                    <div className="mt-[25px]">
                        <button className="bg-[#E1E3E5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold">Current Plan</button>
                    </div>
                </div>
            </div>
        </div>
   </div>
</div></> )}

export default Affiliation;
