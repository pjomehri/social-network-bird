import serverAuth from '@/lib/serverAuth';
import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).end();
  }

  try {
    const postId = req.method === 'POST' ? req.body.postId : req.query.postId;

    const { currentUser } = await serverAuth(req, res);

    if (!postId || typeof postId !== 'string') {
      throw new Error('Invalid ID');
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error('Invalid ID');
    }

    let updateLikeIds = [...(post.likeIds || [])];

    console.log('updatedLikeIDS: ', updateLikeIds);

    if (req.method === 'POST') {
      updateLikeIds.push(currentUser.id);

      try {
        if (post?.userId) {
          await prisma.notification.create({
            data: {
              body: 'Someone liked your tweet',
              userId: post.userId,
            },
          });

          await prisma.user.update({
            where: {
              id: post.userId,
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

    console.log(currentUser.id);
    if (req.method === 'DELETE') {
      updateLikeIds = updateLikeIds.filter((id) => id !== currentUser.id);
      console.log('after delete', updateLikeIds);
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likeIds: updateLikeIds,
      },
    });

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
