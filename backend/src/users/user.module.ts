import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [SequelizeModule.forFeature([User])], // Importa el Modelo
  controllers: [UserController], // Registra el Controlador
  providers: [UserService], // Registra el Servicio
  exports: [UserService], // (Opcional) Permite que otros módulos lo usen
})
export class UserModule {}
