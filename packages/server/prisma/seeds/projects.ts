import { id } from './fixture';
import { PrismaTransactionClient } from './index';

export async function seedProjects(prisma: PrismaTransactionClient) {
  await prisma.project.createMany({
    data: [
      {
        id: id,
        title: "CSC498",
        description:
          'Revision of Synthetic Substitute in Low Back, Open Approach',
        studentId: 1,
      },
      {
        title: 'UML project',
        description:
          'Replacement of R Post Tib Art with Nonaut Sub, Open Approach',
        studentId: 1,
      },
      {
        title: 'Stand by for Action',
        description:
          'Removal of Radioact Elem from Pericard Cav, Perc Approach',
        studentId: 3,
      },
      {
        title: 'Defendor',
        description: 'Extirpate matter from R Ankle Bursa/Lig, Perc Endo',
        studentId: 1,
      },
      {
        title: 'Cowboy Bebop: The Movie (Cowboy Bebop: Tengoku no Tobira)',
        description: 'Insertion of Ext Fix into L Maxilla, Open Approach',
        studentId: 1,
      },
      {
        title: 'Into the Woods',
        description: 'Drainage of Right Kidney, Open Approach',
        studentId: 1,
      },
      {
        title: 'Female Vampire (Les avaleuses) (Erotic Kill)',
        description:
          'Extirpate of Matter from L Abd Bursa/Lig, Perc Endo Approach',
        studentId: 1,
      },
      {
        title: 'Nasty Girl, The (schreckliche Mädchen, Das)',
        description: 'Drainage of R Abd Bursa/Lig, Perc Approach, Diagn',
        studentId: 1,
      },
      {
        title: 'No Time for Love',
        description:
          'Extraction of Nasal Septum, Percutaneous Endoscopic Approach',
        studentId: 2,
      },
      {
        title: 'Paradise',
        description: 'Removal of Neuro Lead from Azygos Vein, Perc Approach',
        studentId: 1,
      },
    ],
  });
}
