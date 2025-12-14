import { SongModel, ISong } from "./song.model";

export class SongRepository {
  async create(data: {
    name: string;
    audioUrl: string;
    chartUrl: string;
  }): Promise<ISong> {
    const song = new SongModel(data);
    return await song.save();
  }

  async findAll(): Promise<ISong[]> {
    return await SongModel.find().sort({ createdAt: -1 });
  }

  async findById(id: string): Promise<ISong | null> {
    return await SongModel.findById(id);
  }
}
