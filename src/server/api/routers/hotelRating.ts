import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const HotelRatingSchema = z.object({
  hotelId: z.string(),
  rating: z.number(),
  message: z.string().max(200),
  userId: z.string(),
});

export const hotelRatingRouter = createTRPCRouter({
  createHotelRating: publicProcedure
    .input(HotelRatingSchema)
    .mutation(async ({ input, ctx }) => {
      const { hotelId, rating, message, userId } = input;
      try {
        const createdRating = await ctx.db.hotelRating.create({
          data: {
            hotelId,
            rating,
            message,
            userId,
          },
        });
        return createdRating;
      } catch (error) {
        throw new Error("Failed to create hotel rating");
      }
    }),
  getHotelRatings: publicProcedure
    .input(z.object({ hotelId: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        const ratings = await ctx.db.hotelRating.findMany({
          where: { hotelId: input.hotelId },
        });
        return ratings;
      } catch (error) {
        throw new Error("Failed to fetch hotel ratings");
      }
    }),
  updateHotelRating: publicProcedure
    .input(z.object({ id: z.string(), rating: z.number().int().min(1).max(5) }))
    .mutation(async ({ input, ctx }) => {
      const { id, rating } = input;

      try {
        const updatedRating = await ctx.db.hotelRating.update({
          where: { id },
          data: { rating },
        });
        return updatedRating;
      } catch (error) {
        throw new Error("Failed to update hotel rating");
      }
    }),
  deleteHotelRating: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const id = input.id;

      try {
        const deletedRating = await ctx.db.hotelRating.delete({
          where: { id },
        });
        return deletedRating;
      } catch (error) {
        throw new Error("Failed to delete hotel rating");
      }
    }),
  deleteAllHotelRatings: publicProcedure
    .mutation(async ({ ctx }) => {
      try {
        await ctx.db.hotelRating.deleteMany();
        return "All hotel ratings deleted successfully";
      } catch (error) {
        throw new Error("Failed to delete all hotel ratings");
      }
    }),
});
