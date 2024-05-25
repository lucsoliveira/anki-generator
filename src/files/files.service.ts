import { Injectable } from '@nestjs/common';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
@Injectable()
export class FilesService {
  constructor() {}

  async create(fileName: string, data: Buffer) {
    const filePath = resolve(__dirname, '..', 'public', 'audios', fileName);
    console.log({ filePath });
    writeFileSync(filePath, data);
    return filePath;
  }

  async remove(filePath: string) {
    // await fs.promises.writeFile(filePath);
  }
}
