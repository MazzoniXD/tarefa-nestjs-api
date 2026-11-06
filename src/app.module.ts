import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TasksModule } from './tasks/tasks.module.js';
import { CharactersModule } from './characters/characters.module.js';

@Module({
  imports: [TasksModule, CharactersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
