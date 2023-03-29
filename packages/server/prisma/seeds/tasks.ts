import { PrismaTransactionClient } from './index';

export async function seedTasks(prisma: PrismaTransactionClient) {
  await prisma.task.createMany({
    data: [
      {
        title: 'Good Morning, Miss Dove',
        description: 'Drain Post Neck Subcu/Fascia w Drain Dev, Open',
        status: 'In Progress',
        studentId: 1,
        categoryId: 1,
      },
      {
        title: 'Shrine, The',
        description: 'Repair Left Tympanic Membrane, Percutaneous Approach',
        status: 'In Progress',
        studentId: 1,
        categoryId: 2,
      },
      {
        title: 'Tale of Ham and Passion, A (Jamón, Jamón)',
        description: 'Drainage of Left Hip Tendon, Perc Endo Approach, Diagn',
        status: 'Done',
        studentId: 1,
        categoryId: 2,
      },
      {
        title: 'Big Squeeze, The',
        description:
          'Revision of Stimulator Lead in Lower Muscle, Open Approach',
        status: 'In Progress',
        studentId: 1,
        categoryId: 1,
      },
      {
        title: 'Star Is Born, A',
        description:
          'Replace of L Occipital Bone with Nonaut Sub, Open Approach',
        status: 'In Progress',
        studentId: 1,
        categoryId: 2,
      },
      {
        title: 'Almost 18',
        description: 'Bypass L Atrium to R Pulm Vn w Autol Vn, Perc Endo',
        status: 'In Progress',
        studentId: 6,
        categoryId: 1,
      },
      {
        title: 'Yes Or No',
        description:
          'Replacement of Peritoneum with Synth Sub, Perc Endo Approach',
        status: 'In Progress',
        studentId: 7,
        categoryId: 1,
      },
      {
        title: 'Ultramarines: A Warhammer 40,000 Movie',
        description:
          'Extirpation of Matter from L Wrist Jt, Perc Endo Approach',
        status: 'In Progress',
        studentId: 8,
        categoryId: 3,
      },
      {
        title: 'Always',
        description: 'Tomo Nucl Med Imag of Abd using Thallium 201',
        status: 'In Progress',
        studentId: 9,
        categoryId: 2,
      },
      {
        title: 'Doctor at Large',
        description: 'Revision of Nonaut Sub in R Eye, Perc Approach',
        status: 'In Progress',
        studentId: 1,
        categoryId: 1,
      },
      {
        title: 'Saturday the 14th',
        description: 'Fragmentation in Subarachnoid Space, Open Approach',
        status: 'In Progress',
        studentId: 1,
        categoryId: 1,
      },
      {
        title: 'Cloudy with a Chance of Meatballs 2',
        description: 'Bypass R Lacrml Duct to Nasal Cav w Nonaut Sub, Open',
        status: 'In Progress',
        studentId: 1,
        categoryId: 1,
      },
    ],
  });
}
