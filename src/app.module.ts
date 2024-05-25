import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnkiModule } from './anki/anki.module';
import { ChatgptModule } from './chatgpt/chatgpt.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    AnkiModule,
    ChatgptModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
