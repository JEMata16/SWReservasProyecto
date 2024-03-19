import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const hotelRouter = createTRPCRouter({
  getAll: publicProcedure
  .input(z.object({ take: z.optional(z.number()) }))
  .query(({ ctx, input }) => {
    return ctx.db.hotel.findMany({
      take: input?.take ?? undefined,
      select: {
        id: true,
        name: true,
        rooms: true,
        description: true,
        locationsId: true,
        images: true,
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
  getAllLocations: publicProcedure
  .query(({ ctx }) => {
    return ctx.db.locations.findMany();
  }),
  hotelBasedOnLocations: publicProcedure
  .input(z.object({locationId: z.number()}))
  .query(({ctx, input})=>{
    return ctx.db.hotel.findMany({where: {locationsId: input.locationId}});
  }),

});
