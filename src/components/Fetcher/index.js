export async function FetcherSearch(url) {
  if (url === null || url === "") return { Search: "" };

  const res = await fetch(url);
  const json = await res.json();

  return json;
}

export async function Fetcher(url) {
  const res = await fetch(url);
  const json = await res.json();
  return json;
}
