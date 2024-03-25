import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { RoutesModule } from './routes/routes.module';

@Module({
  imports: [DatabaseModule, RoutesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
