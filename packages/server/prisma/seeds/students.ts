import { PrismaTransactionClient } from './index';

export async function seedStudents(prisma: PrismaTransactionClient) {
  await prisma.student.createMany({
    data: [
      {
        firstName: 'Maitilde',
        lastName: 'Gerding',
        email: 'mgerding0@ft.com',
        password: '9UFEXY0D8jI',
        avatar: 'https://robohash.org/quiasedamet.png?size=50x50&set=set1',
      },
      {
        firstName: 'Broderick',
        lastName: 'Channon',
        email: 'bchannon1@latimes.com',
        password: 'r0bFsKz3a6s',
        avatar:
          'https://robohash.org/estsedrepudiandae.png?size=50x50&set=set1',
      },
      {
        firstName: 'Miguel',
        lastName: 'Conwell',
        email: 'mconwell2@arizona.edu',
        password: 'dDtOHX9K',
        avatar: 'https://robohash.org/rerumdoloremsint.png?size=50x50&set=set1',
      },
      {
        firstName: 'Neil',
        lastName: 'Clawsley',
        email: 'nclawsley3@netlog.com',
        password: 'MqKCOmIrzMu',
        avatar: 'https://robohash.org/quietconsectetur.png?size=50x50&set=set1',
      },
      {
        firstName: 'Jesse',
        lastName: 'Goane',
        email: 'jgoane4@bbc.co.uk',
        password: 'F9fT6rsA',
        avatar:
          'https://robohash.org/eligendivoluptatemet.png?size=50x50&set=set1',
      },
      {
        firstName: 'Kinny',
        lastName: 'Strick',
        email: 'kstrick5@devhub.com',
        password: '0yPsFoKvy',
        avatar:
          'https://robohash.org/fugiatmagnammolestiae.png?size=50x50&set=set1',
      },
      {
        firstName: 'Doralia',
        lastName: 'Stanyard',
        email: 'dstanyard6@purevolume.com',
        password: 'xcjGUdUu',
        avatar:
          'https://robohash.org/deseruntvoluptatemdicta.png?size=50x50&set=set1',
      },
      {
        firstName: 'Gwen',
        lastName: 'Netherwood',
        email: 'gnetherwood7@wisc.edu',
        password: 'yBEB9mAczf',
        avatar:
          'https://robohash.org/nihilsuscipitquaerat.png?size=50x50&set=set1',
      },
      {
        firstName: 'Phillip',
        lastName: 'Schruur',
        email: 'pschruur8@google.cn',
        password: 'zTRr4igPvr',
        avatar:
          'https://robohash.org/quimolestiaemolestias.png?size=50x50&set=set1',
      },
      {
        firstName: 'Kerry',
        lastName: 'Beatey',
        email: 'kbeatey9@nature.com',
        password: 'b1pndVbZnnF',
        avatar:
          'https://robohash.org/etdoloremmolestiae.png?size=50x50&set=set1',
      },
    ],
  });
}
