import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";


export const toursRouter = createTRPCRouter({
    getAll: publicProcedure
    .input(z.object({ take: z.optional(z.number()) }))
    .query(({ ctx, input }) => {
      return ctx.db.tours.findMany({
        take: input?.take ?? undefined,
        select: {
          id: true,
          name: true,
          description: true,
          locationId: true,
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
      const filter = input.locationId === 0 ? {} : { locationId: input.locationId };
      return ctx.db.tours.findMany({ where: filter });
    }),
    deleteById: publicProcedure
    .input(z.object({text: z.string()}))
    .mutation(({ input, ctx}) => {
      return ctx.db.tours.delete({ where: { id: input.text } });
    }),
    addTour: publicProcedure
    .input(z.object({
      name: z.string(),
      description: z.string(),
      startsAt: z.string(),
      endsAt: z.string(),
      locationId: z.number(),
      images: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const { name, description, startsAt, endsAt, locationId, images } = input;
     
      const newTour = await ctx.db.tours.create({
        data: {
          name,
          description,
          startsAt,
          endsAt,
          locationId,
          images,
        },
      });

      return newTour;
    }),
  });
  