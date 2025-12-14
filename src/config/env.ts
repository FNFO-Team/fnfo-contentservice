import dotenv from "dotenv";

dotenv.config();

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export const env = {
  port: Number(process.env.PORT || 8085),

  mongoUri: required("MONGO_URI"),

  azure: {
    connectionString: required("AZURE_STORAGE_CONNECTION_STRING"),
    containerName: required("AZURE_STORAGE_CONTAINER"),
  },
};
