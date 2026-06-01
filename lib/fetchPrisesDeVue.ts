export type R2Video = { url: string; key: string };

export async function fetchPrisesDeVue(): Promise<R2Video[]> {
  const response = await fetch('/api/get-prises-de-vue');

  if (!response.ok) {
    throw new Error(`Erreur lors de la récupération des prises de vue : ${response.status}`);
  }

  const data: { videos: R2Video[] } = await response.json();
  return data.videos;
}
