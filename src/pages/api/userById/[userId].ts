

import { clerkClient } from "@clerk/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query;
  
  try {
    if (typeof userId === 'string') {
      const clerk = clerkClient;
      const user = await clerk.users.getUser(userId);

      return res.status(200).json({ user });
    } else {
      throw new Error('Invalid userId');
    }
  } catch (error) {
    console.error('Failed to fetch user details:', error);
    return res.status(500).json({ error: 'Failed to fetch user details' });
  }
}