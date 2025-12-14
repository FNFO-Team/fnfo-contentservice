import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { env } from "./env";

let containerClient: ContainerClient;

export function getBlobContainer(): ContainerClient {
  if (!containerClient) {
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      env.azure.connectionString
    );

    containerClient = blobServiceClient.getContainerClient(
      env.azure.containerName
    );
  }

  return containerClient;
}
