import express from "express";
import cors from "cors";

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Health check básico
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "content-service",
    timestamp: new Date().toISOString(),
  });
});

// Aquí luego montaremos las rutas
// app.use("/songs", songRoutes);

export default app;