import { Global, Module } from '@nestjs/common';
import { ChatgptController } from './chatgpt.controller';
import { ChatgptService } from './chatgpt.service';

@Global()
@Module({
  controllers: [ChatgptController],
  providers: [ChatgptService],
})
export class ChatgptModule {}
