export interface CreateSongDTO {
  name: string;
}

export interface SongResponseDTO {
  id: string;
  name: string;
  audioUrl: string;
  chartUrl: string;
  createdAt: Date;
}
