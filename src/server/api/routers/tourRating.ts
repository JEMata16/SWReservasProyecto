import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const TourRatingSchema = z.object({
  tourId: z.string(),
  rating: z.number(),
  message: z.string().max(200),
  userId: z.string(),
});

export const tourRatingRouter = createTRPCRouter({
  createtourRating: publicProcedure
    .input(TourRatingSchema)
    .mutation(async ({ input, ctx }) => {
      const { tourId, rating, message, userId } = input;
      try {
        const createdRating = await ctx.db.tourRating.create({
          data: {
            tourId,
            rating,
            message,
            userId,
          },
        });
        return createdRating;
      } catch (error) {
        throw new Error("Failed to create tour rating");
      }
    }),
  gettourRatings: publicProcedure
    .input(z.object({ tourId: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        const ratings = await ctx.db.tourRating.findMany({
          where: { tourId: input.tourId },
        });
        return ratings;
      } catch (error) {
        throw new Error("Failed to fetch tour ratings");
      }
    }),
  updatetourRating: publicProcedure
    .input(z.object({ id: z.string(), rating: z.number().int().min(1).max(5) }))
    .mutation(async ({ input, ctx }) => {
      const { id, rating } = input;

      try {
        const updatedRating = await ctx.db.tourRating.update({
          where: { id },
          data: { rating },
        });
        return updatedRating;
      } catch (error) {
        throw new Error("Failed to update tour rating");
      }
    }),
  deletetourRating: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const id = input.id;

      try {
        const deletedRating = await ctx.db.tourRating.delete({
          where: { id },
        });
        return deletedRating;
      } catch (error) {
        throw new Error("Failed to delete tour rating");
      }
    }),
  deleteAlltourRatings: publicProcedure
    .mutation(async ({ ctx }) => {
      try {
        await ctx.db.tourRating.deleteMany();
        return "All tour ratings deleted successfully";
      } catch (error) {
        throw new Error("Failed to delete all tour ratings");
      }
    }),
});
