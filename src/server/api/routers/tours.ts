import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";


export const toursRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
      return ctx.db.tours.findMany();
    }),
    getFirst: publicProcedure.query(({ ctx }) => {
      return ctx.db.hotel.findFirst();
    }),
    getById: publicProcedure
    .input(z.object({text: z.string()}))
    .query(({ input, ctx}) => {
      return ctx.db.tours.findUnique({ where: { id: input.text } });
    }),
    getHotelLocalization: publicProcedure
    .input(z.object({locationId: z.number()}))
    .query(({ctx, input})=>{
      return ctx.db.locations.findUnique({where: {id: input.locationId}});
    }),
    toursBasedOnLocation: publicProcedure
    .input(z.object({locationId: z.number()}))
    .query(({ctx, input})=>{
      return ctx.db.tours.findMany({where: {locationId: input.locationId}});
    }),
    deleteById: publicProcedure
    .input(z.object({text: z.string()}))
    .mutation(({ input, ctx}) => {
      return ctx.db.tours.delete({ where: { id: input.text } });
    }),
  });
  