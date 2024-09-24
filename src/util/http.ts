export async function get(url: string) {
  const response = await fetch(url);

  if (!response) {
    throw new Error('Faled to fetch data');
  }

  const data = (await response.json()) as unknown;
  return data;
}
