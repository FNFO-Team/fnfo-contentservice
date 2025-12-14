import { Router } from "express";
import { SongController } from "./song.controller";
import { uploadSongFiles } from "../../middlewares/upload.middleware";

const router = Router();
const controller = new SongController();

// Crear canción (audio + chart)
router.post("/", uploadSongFiles, controller.createSong);

// Listar canciones
router.get("/", controller.getAllSongs);

// Obtener canción por ID
router.get("/:id", controller.getSongById);

export default router;