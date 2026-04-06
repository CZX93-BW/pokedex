/**
 * Starts the application.
 */
async function initializeApp() {
  const pokemonList = await loadPokemonList();
  renderPokemonList(pokemonList);
}

initializeApp();