import mongoose from "mongoose";
import app from "./app";
import { env } from "./config/env";

async function bootstrap() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(env.mongoUri);
    console.log("MongoDB connected");

    app.listen(env.port, () => {
      console.log(`Content Service running on port ${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
}

bootstrap();
