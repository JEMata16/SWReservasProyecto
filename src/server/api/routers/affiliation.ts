import { User } from "@clerk/nextjs/server";
import { AffiliationTypes } from "@prisma/client";
import axios from "axios";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const affiliationRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.userAffiliation.findMany();
  }),
  createUserAffiliation: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        affiliated: z.boolean(),
        affiliation: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, affiliated, affiliation } = input as {
        userId: string;
        affiliated: boolean;
        affiliation: AffiliationTypes | undefined;
      };
      try {
        const createdAffiliation = await ctx.db.userAffiliation.create({
          data: {
            userId,
            affiliated,
            affiliation,
          },
        });
        return createdAffiliation;
      } catch (error) {
        throw new Error("Failed to create affiliation");
      }
    }),
  deleteUserAffiliation: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const id = input.id;
      try {
        const deletedAffiliation = await ctx.db.userAffiliation.delete({
          where: { userId: id },
        });
        return deletedAffiliation;
      } catch (error) {
        throw new Error("Failed to delete affiliation");
      }
    }),
  getByUserId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      const userId = input.id;
      try {
        return ctx.db.userAffiliation.findFirst({
          where: { userId },
        });
      } catch (error) {
        throw new Error("Failed to fetch affiliation");
      }
    }),
  getHotelsByAffiliation: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.affiliateHotels.findMany({
        where: { userId: input.userId },
      });
    }),
  addHotel: publicProcedure
    .input(
      z.object({
        name: z.string(),
        rooms: z.array(
          z.object({
            type: z.string(),
            capacity: z.string(),
          }),
        ),
        description: z.string(),
        locationsId: z.number(),
        images: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { name, rooms, description, locationsId, images, userId } = input;

      const newHotel = await ctx.db.affiliateHotels.create({
        data: {
          name,
          description,
          locationsId,
          rooms: JSON.stringify({ rooms: rooms }),
          images,
          userId,
        },
      });

      return newHotel;
    }),
  deleteHotelById: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.affiliateHotels.delete({ where: { id: input.text } });
    }),
    getHotels: publicProcedure
    .query(({ ctx }) => {
        return ctx.db.affiliateHotels.findMany();
    }),
    getHotelById: publicProcedure
    .input(z.object({text: z.string()}))
    .query(({ input, ctx}) => {
        return ctx.db.affiliateHotels.findUnique({ where: { id: input.text } });
    }),
    createReservation: publicProcedure
    .input(z.object({
      idHotel: z.string(),
      userid: z.string(),
      phoneNumber: z.string(),
      email: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      return ctx.db.affiliateReservation.create({
        data: {
          AffiliateHotels: { connect: { id: input.idHotel,  } },
          userId: input.userid,
          phone: input.phoneNumber,
          email: input.email,
        },
      });
    }),
});
