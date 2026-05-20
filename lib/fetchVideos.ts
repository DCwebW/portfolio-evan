import { ListBlobResultBlob } from '@vercel/blob';

export async function fetchVideos(): Promise<ListBlobResultBlob[]> {
  const response = await fetch('/api/get-videos');

  if (!response.ok) {
    throw new Error(`Erreur lors de la récupération des images : ${response.status}`);
  }

  const data: { blobs: ListBlobResultBlob[] } = await response.json();
  
  console.log('Nombre d\'images récupérées :', data.blobs.length);
  console.log('Détail des images :');
  data.blobs.forEach((blob: ListBlobResultBlob, index: number) => {
    console.log(`Image ${index + 1} :`, {
      url: blob.url,
      pathname: blob.pathname,
      size: blob.size,
      uploadedAt: blob.uploadedAt,
      contentType: blob.etag,
    });
  });

  return data.blobs;
}