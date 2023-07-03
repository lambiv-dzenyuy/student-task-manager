import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';


import { PrismaTransactionClient } from './index';
import { studentFixture } from './studentFixture';

const logger = new Logger('UserSeed');
export async function seedStudents(prisma: PrismaTransactionClient) {
  for (const student of studentFixture) {
    const saltRounds = process.env.PASSWORD_SALT_ROUNDS;
    if (!saltRounds) {
      throw new Error("Env value 'PASSWORD_SALT_ROUNDS' has not been set");
    }
    const cryptedPassword = await bcrypt.hash(
      student.password,
      Number(saltRounds)
    );

    await prisma.student.create({
      
      data: {
        ...student,
        password: cryptedPassword,
      },
    });

   
    
  }
}
