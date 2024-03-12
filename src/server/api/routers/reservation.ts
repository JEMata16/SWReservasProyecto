import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const reservationRouter = createTRPCRouter({
  createReservation: publicProcedure
  .input(z.object({
    idHotel: z.string(),
    userid: z.string(),
    phoneNumber: z.string(),
  }))
  .mutation(async ({ ctx, input }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return ctx.db.reservation.create({
      data: {
        hotel: { connect: { id: input.idHotel } },
        userId: input.userid,
        phone: input.phoneNumber,
      },
    });
  }),
  createTourReservation: publicProcedure
  .input(z.object({
    tourId: z.string(),
    userid: z.string(),
    phoneNumber: z.string(),
  }))
  .mutation(async ({ ctx, input }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return ctx.db.reservation.create({
      data: {
        tour: { connect: { id: input.tourId } },
        userId: input.userid,
        phone: input.phoneNumber,
      },
    });
  }),
  getAllReservations: publicProcedure
    .query(async ({ ctx }) => {
      // Retrieve all reservations with hotel names
      const reservations = await ctx.db.reservation.findMany({
        include: {
          hotel: true, // Include the related hotel
          tour: false,
        },
      });

      // Map the data to the desired format
      const formattedReservations = reservations.map((reservation) => {
        // Check if the reservation has a hotel id before including it
        if (reservation.hotel && reservation.hotel.id) {
          return {
            id: reservation.id,
            userId: reservation.userId,
            phone: reservation.phone,
            dateFrom: reservation.dateFrom,
            hotel: {
              id: reservation.hotel.id,
              name: reservation.hotel.name,
              // Include other hotel fields as needed
            },
          };
        }
        return null; // Skip reservations without a hotel id
      }).filter(Boolean); // Remove any null entries

      return formattedReservations;
    }),
    getAllToursReservations: publicProcedure
    .query(async ({ ctx }) => {
      // Retrieve all reservations with hotel names
      const reservations = await ctx.db.reservation.findMany({
        include: {
          tour: true, // Include the related hotel
        },
      });

      // Map the data to the desired format
      const formattedReservations = reservations.map((reservation) => {
        // Check if the reservation has a tour id before including it
        if (reservation.tour && reservation.tour.id) {
          return {
            id: reservation.id,
            userId: reservation.userId,
            phone: reservation.phone,
            dateFrom: reservation.dateFrom,
            tour: {
              id: reservation.tour.id,
              name: reservation.tour.name || "Not assigned",
              // Include other tour fields as needed
            },
          };
        }
        return null; // Skip reservations without a tour id
      }).filter(Boolean); // Remove any null entries

      return formattedReservations;
    }),
    deleteReservation: publicProcedure
    .input(z.object({reservationId:z.string()}))
    .mutation(async ({ctx,input}) => {
      await ctx.db.reservation.delete({
        where: { id: input.reservationId}
      });
    }),
});