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

    console.log('Logging user ID: ', user?.id.slice(-1));

    if (!user) {
      throw new Error('Invalid ID');
    }

    let updatedFollowingIds = [...(user.followingIds || [])];

    console.log(updatedFollowingIds);

    if (req.method === 'POST') {
      updatedFollowingIds.push(userId);
      console.log('POST / Follow');

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
    }

    if (req.method === 'DELETE') {
      console.log('DELETE / unFollow');
      updatedFollowingIds = updatedFollowingIds.filter(
        (followingId) => followingId !== userId
      );
      console.log('ID to filter out: ', userId);
      console.log('Following Id list after filter', updatedFollowingIds);
    }

    console.log('Following Id list after filter out', updatedFollowingIds);
    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
