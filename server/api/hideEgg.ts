import { PrismaClient } from '@prisma/client';
import requireAuth from './requireAuth';
const prisma = new PrismaClient();

export default defineEventHandler(
  requireAuth(async (event) => {
    const { coords, id, username } = await readBody(event);

    await prisma.location.upsert({
      where: {
        eggId: id,
      },
      create: {
        eggId: id,
        ...coords,
      },
      update: {
        eggId: id,
        ...coords,
      },
    });

    await prisma.egg.update({
      where: {
        id: id,
      },
      data: {
        username: username,
      },
    });

    return true;
  }),
);
