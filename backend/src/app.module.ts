import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UsersModule, TypeOrmModule.forRoot(), TodosModule],
})
export class AppModule {}
