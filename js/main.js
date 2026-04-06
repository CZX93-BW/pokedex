/**
 * Starts the application.
 */
async function initializeApp() {
  await loadAndRenderPokemonList();
}

/**
 * Loads the pokemon list and renders it.
 */
async function loadAndRenderPokemonList() {
  renderLoadingState();

  const pokemonList = await loadPokemonList();
  const detailedPokemonList = await loadDetailedPokemonList(pokemonList);

  renderPokemonList(detailedPokemonList);
}

/**
 * Opens the pokemon details view.
 *
 * @param {string} pokemonUrl 
 */
async function openPokemonDetails(pokemonUrl) {
  const pokemonDetails = await loadPokemonDetails(pokemonUrl);
  renderPokemonDetails(pokemonDetails);
}

/**
 * Handles the pokemon search.
 *
 * @param {string} searchValue 
 */
function handlePokemonSearch(searchValue) {
  console.log('Search not implemented yet:', searchValue);
}

/**
 * Initializes all event listeners.
 */
function initializeEventListeners() {
  console.log('Event listeners not implemented yet');
}

initializeApp();