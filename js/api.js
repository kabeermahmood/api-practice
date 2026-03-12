const API_BASE = "https://pokeapi.co/api/v2/pokemon";

export async function fetchPokemon(name) {
  const response = await fetch(
    `${API_BASE}/${encodeURIComponent(name)}`
  );

  if (response.status === 404) {
    throw new Error("NOT_FOUND");
  }

  if (!response.ok) {
    throw new Error(`Server responded with status ${response.status}`);
  }

  return await response.json();
}
