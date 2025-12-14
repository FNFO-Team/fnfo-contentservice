import { Request, Response } from "express";
import { SongService } from "./song.service";
import { SongResponseDTO } from "./song.types";

export class SongController {
  private songService: SongService;

  constructor() {
    this.songService = new SongService();
  }

  /**
   * POST /songs
   * Crea una canción subiendo audio + chart
   */
  createSong = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({
          message: "Song name is required",
        });
      }

      const files = req.files as {
        audio?: Express.Multer.File[];
        chart?: Express.Multer.File[];
      };

      if (!files?.audio?.[0] || !files?.chart?.[0]) {
        return res.status(400).json({
          message: "Audio and chart files are required",
        });
      }

      const song = await this.songService.createSong({
        name,
        audioFile: files.audio[0],
        chartFile: files.chart[0],
      });

      const response: SongResponseDTO = {
        id: song._id.toString(),
        name: song.name,
        audioUrl: song.audioUrl,
        chartUrl: song.chartUrl,
        createdAt: song.createdAt,
      };

      return res.status(201).json(response);
    } catch (error: any) {
      console.error("Error creating song:", error);
      return res.status(500).json({
        message: "Failed to create song",
        error: error.message,
      });
    }
  };

  /**
   * GET /songs
   * Lista todas las canciones
   */
  getAllSongs = async (_req: Request, res: Response) => {
    try {
      const songs = await this.songService.getAllSongs();

      const response: SongResponseDTO[] = songs.map((song) => ({
        id: song._id.toString(),
        name: song.name,
        audioUrl: song.audioUrl,
        chartUrl: song.chartUrl,
        createdAt: song.createdAt,
      }));

      return res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching songs:", error);
      return res.status(500).json({
        message: "Failed to fetch songs",
      });
    }
  };

  /**
   * GET /songs/:id
   * Obtiene una canción por ID
   */
  getSongById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const song = await this.songService.getSongById(id);

      if (!song) {
        return res.status(404).json({
          message: "Song not found",
        });
      }

      const response: SongResponseDTO = {
        id: song._id.toString(),
        name: song.name,
        audioUrl: song.audioUrl,
        chartUrl: song.chartUrl,
        createdAt: song.createdAt,
      };

      return res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching song:", error);
      return res.status(500).json({
        message: "Failed to fetch song",
      });
    }
  };
}
