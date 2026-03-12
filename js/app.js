import { fetchPokemon } from "./api.js";
import { showLoading, showError, renderPokemon } from "./dom.js";

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

async function searchPokemon() {
  const name = searchInput.value.trim().toLowerCase();

  if (!name) {
    showError("Please enter a Pokémon name first!");
    return;
  }

  showLoading();

  try {
    const pokemon = await fetchPokemon(name);
    renderPokemon(pokemon);
  } catch (error) {
    if (error.message === "NOT_FOUND") {
      showError(
        `No Pokémon found named "<strong>${name}</strong>". Check the spelling and try again!`
      );
    } else if (error.message === "Failed to fetch") {
      showError(
        "Could not connect to the server. Please check your internet connection."
      );
    } else {
      showError(`Something went wrong: ${error.message}`);
    }
  }
}

searchBtn.addEventListener("click", searchPokemon);

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchPokemon();
});
