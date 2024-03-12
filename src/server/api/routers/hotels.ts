import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const hotelRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.hotel.findMany({
      select: {
        id: true,
        name: true,
        rooms: true,
        description: true,
        locationsId: true,
        images: true,
        // Exclude the Reservation relation
      },
    });
  }),
  getFirst: publicProcedure.query(({ ctx }) => {
    return ctx.db.hotel.findFirst();
  }),
  getById: publicProcedure
  .input(z.object({text: z.string()}))
  .query(({ input, ctx}) => {
    return ctx.db.hotel.findUnique({ where: { id: input.text } });
  }),
  getHotelLocalization: publicProcedure
  .input(z.object({locationId: z.number()}))
  .query(({ctx, input})=>{
    return ctx.db.locations.findUnique({where: {id: input.locationId}});
  }),
  deleteById: publicProcedure
  .input(z.object({ text: z.string() }))
  .mutation(({ input, ctx }) => {
    return ctx.db.hotel.delete({ where: { id: input.text } });
  }),

});
