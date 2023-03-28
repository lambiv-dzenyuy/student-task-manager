import { PrismaTransactionClient } from './index';

export async function seedStudents(prisma: PrismaTransactionClient) {
  await prisma.student.createMany({
    data: [
      {
        firstName: 'Wan',
        lastName: 'Shey',
        email: 'shey@ubuea.cm',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      {
        email: 'munchep.es@ubuea.cm',
        firstName: 'Muchap',
        lastName: 'Estepi',
        avatar: 'https://i.pravatar.cc/300',
      },
      {
        email: 'm.kiryuy@ubuea.cm',
        firstName: 'Kiryuy',
        lastName: 'Ambam',
        avatar: 'https://i.pravatar.cc/301',
      },
      {
        email: 'suh.a@ubuea.cm',
        firstName: 'Suh',
        lastName: 'Apayup',
        avatar: 'https://i.pravatar.cc/302',
      },
    ],
  });
}
