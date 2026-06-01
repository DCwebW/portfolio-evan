export type R2Video = { url: string; key: string };

export async function fetchVideos(): Promise<R2Video[]> {
  const response = await fetch('/api/get-videos');

  if (!response.ok) {
    throw new Error(`Erreur lors de la récupération des vidéos : ${response.status}`);
  }

  const data: { videos: R2Video[] } = await response.json();
  return data.videos;
}
