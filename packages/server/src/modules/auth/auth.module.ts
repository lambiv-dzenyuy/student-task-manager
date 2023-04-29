import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { StudentModule } from '../users/student.module';
import { StudentService } from '../users/student.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';

@Module({
    imports: [
        StudentModule,
        JwtModule.register({
          global: true,
          secret: jwtConstants.secret,
         
        }),
      ],
    providers: [AuthService,  {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },],
    controllers: [AuthController],
})
export class AuthModule {}
