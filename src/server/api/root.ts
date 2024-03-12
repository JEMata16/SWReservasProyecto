import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { hotelRouter } from "~/server/api/routers/hotels";
import { reservationRouter } from "./routers/reservation";
import { toursRouter } from "./routers/tours";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  hotels: hotelRouter,
  reservation: reservationRouter,
  tours: toursRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
