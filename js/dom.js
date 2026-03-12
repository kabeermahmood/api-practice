const TYPE_COLORS = {
  normal: "#a8a878",
  fire: "#f08030",
  water: "#6890f0",
  electric: "#f8d030",
  grass: "#78c850",
  ice: "#98d8d8",
  fighting: "#c03028",
  poison: "#a040a0",
  ground: "#e0c068",
  flying: "#a890f0",
  psychic: "#f85888",
  bug: "#a8b820",
  rock: "#b8a038",
  ghost: "#705898",
  dragon: "#7038f8",
  dark: "#705848",
  steel: "#b8b8d0",
  fairy: "#ee99ac",
};

function getResultDiv() {
  return document.getElementById("result");
}

export function showLoading() {
  getResultDiv().innerHTML = '<div class="loading">Loading...</div>';
}

export function showError(message) {
  getResultDiv().innerHTML = `<div class="error"><p>${message}</p></div>`;
}

export function renderPokemon(pokemon) {
  const sprite =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default;

  const typeBadges = pokemon.types
    .map((t) => {
      const color = TYPE_COLORS[t.type.name] || "#888";
      return `<span class="type-badge" style="background:${color}; color:#fff">${t.type.name}</span>`;
    })
    .join("");

  const statBars = pokemon.stats
    .map((s) => {
      const percent = Math.min((s.base_stat / 255) * 100, 100);
      const color =
        s.base_stat >= 100 ? "#16a34a" : s.base_stat >= 50 ? "#ea580c" : "#dc2626";
      const label = s.stat.name
        .replace("special-attack", "SP.ATK")
        .replace("special-defense", "SP.DEF")
        .replace("attack", "ATK")
        .replace("defense", "DEF")
        .replace("speed", "SPD")
        .replace("hp", "HP");

      return `
        <div class="stat-row">
          <span class="stat-name">${label}</span>
          <div class="stat-bar-bg">
            <div class="stat-bar" style="width:${percent}%; background:${color}"></div>
          </div>
          <span class="stat-value">${s.base_stat}</span>
        </div>`;
    })
    .join("");

  getResultDiv().innerHTML = `
    <div class="poke-card">
      <img src="${sprite}" alt="${pokemon.name}" />
      <div class="poke-name">${pokemon.name}</div>
      <div class="poke-id">#${String(pokemon.id).padStart(3, "0")}</div>
      <div class="types">${typeBadges}</div>
      <div class="stats">${statBars}</div>
    </div>`;
}
