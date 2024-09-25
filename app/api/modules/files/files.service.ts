import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
export class FilesService {
  logger = console;
  tempDir = process.env.TEMP_FILES_PATH;
  constructor() {}

  async create(fileName: string, data: Buffer) {
    const filePath = resolve(this.tempDir ?? "", fileName);
    this.logger.info(`Creating file ${filePath}`);
    writeFileSync(filePath, data);
    return filePath;
  }

  async remove(filePath: string) {
    // await fs.promises.writeFile(filePath);
  }

  async convertToBase64(filePath: string) {
    const fileBuffer = readFileSync(filePath);
    const base64String = fileBuffer.toString("base64");
    return base64String;
  }
}
