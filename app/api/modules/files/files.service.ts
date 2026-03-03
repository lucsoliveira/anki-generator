import { readFileSync, writeFileSync, readdirSync, unlinkSync } from "node:fs";
import { resolve } from "node:path";

export class FilesService {
  logger = console;
  tempDir = process.env.TEMP_FILES_PATH;
  uploadsDir = resolve(process.cwd(), "public", "uploads");

  constructor() {}

  async create(fileName: string, data: Buffer) {
    const filePath = resolve(this.tempDir ?? "", fileName);
    this.logger.info(`Creating file ${filePath}`);
    writeFileSync(filePath, data);
    return filePath;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async remove(_filePath: string) {
    // await fs.promises.writeFile(_filePath);
  }

  async convertToBase64(filePath: string) {
    const fileBuffer = readFileSync(filePath);
    const base64String = fileBuffer.toString("base64");
    return base64String;
  }

  async listUploadedFiles() {
    try {
      const files = readdirSync(this.uploadsDir);
      return files.filter((f) => f !== ".gitkeep" && f !== "robots.txt");
    } catch (error) {
      this.logger.error("Error listing uploaded files:", error);
      return [];
    }
  }

  async removeAllMp3Files() {
    try {
      const files = readdirSync(this.uploadsDir);
      const mp3Files = files.filter((f) => f.endsWith(".mp3"));

      mp3Files.forEach((file) => {
        const filePath = resolve(this.uploadsDir, file);
        unlinkSync(filePath);
        this.logger.info(`Removed file: ${filePath}`);
      });

      return {
        success: true,
        removedCount: mp3Files.length,
        removedFiles: mp3Files,
      };
    } catch (error) {
      this.logger.error("Error removing mp3 files:", error);
      throw error;
    }
  }
}
