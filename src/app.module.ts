import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './routes/user/user.module';
import { TrackModule } from './routes/track/track.module';

@Module({
  imports: [DatabaseModule, UserModule, TrackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
