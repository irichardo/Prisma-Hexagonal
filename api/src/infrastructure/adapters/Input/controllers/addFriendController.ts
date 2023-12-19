import { type Request, type Response } from 'express'
import { prisma } from '../prisma/adapter.prisma'

export const addFriendController = async (req: Request, res: Response): Promise<void> => {
  const { userId, friendId }: { userId: number, friendId: number } = req.body
  try {
    // const user = await prisma.user.findUnique({ where: { id: userId }, include: { friends: true, friendsOf: true } })
    // const user = await prisma.user.update({
    //   where: { id: Number(userId) },
    //   data: {
    //     friends: {
    //       delete: {
    //         id: friendId
    //       }
    //     }
    //   }
    // })
    // const friend = await prisma.user.update({ where: { id: Number(friendId) }, data: { friends: { delete: { id: friendId } } } })
    // console.log(user)
    // const user = await prisma.user.findMany({
    // //   where: { id: 2 },
    //   select: {
    //     name: true,
    //     email: true,
    //     role: true,
    //     friendsOf: { select: { id: true, name: true, email: true, role: true } },
    //     friends: { select: { id: true, name: true, email: true, role: true } }
    //   }
    // })
    // console.log(user)
    const user = await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        friends: {
          connect: [{ id: friendId }]
        }
      }
    })
    const friendUser = await prisma.user.update({
      where: { id: Number(friendId) },
      data: {
        friends: {
          connect: [{ id: userId }]

        }
      }
    })
    console.log(user, friendUser)
    res.status(200).send('Ok')
  } catch (err: any) {
    console.error(err.message)
    res.status(500).send({ message: err.message })
  }
}
