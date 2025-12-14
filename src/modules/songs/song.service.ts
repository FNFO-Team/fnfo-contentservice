import { SongRepository } from "./song.repository";
import { BlobStorageService } from "../../storage/blobStorage.service";

interface CreateSongInput {
  name: string;
  audioFile: Express.Multer.File;
  chartFile: Express.Multer.File;
}

export class SongService {
  private songRepository: SongRepository;
  private blobStorageService: BlobStorageService;

  constructor() {
    this.songRepository = new SongRepository();
    this.blobStorageService = new BlobStorageService();
  }

  async createSong(input: CreateSongInput) {
    const { name, audioFile, chartFile } = input;

    if (!audioFile) {
      throw new Error("Audio file is required");
    }

    if (!chartFile) {
      throw new Error("Chart file is required");
    }

    // 1️⃣ Subir audio
    const audioUrl = await this.blobStorageService.uploadFile(
      audioFile.buffer,
      audioFile.originalname,
      "songs/audio",
      audioFile.mimetype
    );

    // 2️⃣ Subir chart
    const chartUrl = await this.blobStorageService.uploadFile(
      chartFile.buffer,
      chartFile.originalname,
      "songs/chart",
      chartFile.mimetype
    );

    // 3️⃣ Guardar metadata en Mongo
    const song = await this.songRepository.create({
      name,
      audioUrl,
      chartUrl,
    });

    return song;
  }

  async getAllSongs() {
    return await this.songRepository.findAll();
  }

  async getSongById(id: string) {
    return await this.songRepository.findById(id);
  }
}
