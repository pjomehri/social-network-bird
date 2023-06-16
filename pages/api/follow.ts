import { NextApiRequest, NextApiResponse } from 'next';
import serverAuth from '@/lib/serverAuth';

import prisma from '@/lib/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).end();
  }

  try {
    const userId = req.method === 'POST' ? req.body.userId : req.query.userId;

    const { currentUser } = await serverAuth(req, res);

    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid ID');
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error('Invalid ID');
    }

    if (req.method === 'POST') {
      const updatedUser = await prisma.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          followingIds: {
            push: userId,
          },
        },
      });

      try {
        if (userId) {
          await prisma.notification.create({
            data: {
              body: 'Someone started following you!',
              userId,
            },
          });

          await prisma.user.update({
            where: {
              id: userId,
            },
            data: {
              hadNotification: true,
            },
          });
        }
      } catch (error) {
        console.log(error);
      }

      return res.status(200).json(updatedUser);
    }

    if (req.method === 'DELETE') {
      const deletedUser = await prisma.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          followingIds: {
            set: user.followingIds.filter((id) => id !== userId),
          },
        },
      });

      return res.status(200).json(deletedUser);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
