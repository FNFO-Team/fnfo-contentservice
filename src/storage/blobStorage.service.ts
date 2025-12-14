import { BlockBlobClient } from "@azure/storage-blob";
import { getBlobContainer } from "../config/azureBlob.config";

export class BlobStorageService {
  async uploadFile(
    buffer: Buffer,
    filename: string,
    folder: string,
    mimeType: string
  ): Promise<string> {
    const containerClient = getBlobContainer();

    const blobPath = `${folder}/${Date.now()}-${filename}`;
    const blockBlobClient: BlockBlobClient =
      containerClient.getBlockBlobClient(blobPath);

    await blockBlobClient.uploadData(buffer, {
      blobHTTPHeaders: {
        blobContentType: mimeType,
      },
    });

    return blockBlobClient.url;
  }
}
