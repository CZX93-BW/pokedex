/**
 * Starts the application.
 */
async function initializeApp() {
  initializeEventListeners();
  await loadAndRenderPokemonList();
}

/**
 * Loads the pokemon list and renders it.
 */
async function loadAndRenderPokemonList() {
  renderLoadingState();

  const pokemonList = await loadPokemonList();
  const detailedPokemonList = await loadDetailedPokemonList(pokemonList);

  if (detailedPokemonList.length === 0) {
    renderErrorMessage('Die Pokémon konnten nicht geladen werden.');
    return;
  }

  renderPokemonList(detailedPokemonList);
}

/**
 * Opens the pokemon details view.
 *
 * @param {string} pokemonUrl 
 */
async function openPokemonDetails(pokemonId) {
  const pokemonDetails = await loadPokemonDetailsById(pokemonId);
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
  initializeDialogOverlayClick();
  initializeEscapeKeyClose();
}

/**
 * Initializes the overlay click event.
 */
function initializeDialogOverlayClick() {
  const pokemonDialogOverlay = getElementById('pokemonDialogOverlay');

  if (!pokemonDialogOverlay) {
    return;
  }

  pokemonDialogOverlay.addEventListener('click', closePokemonDetails);
}

/**
 * Initializes the escape key event for dialog closing.
 */
function initializeEscapeKeyClose() {
  document.addEventListener('keydown', handleDialogEscapeKey);
}

/**
 * Handles the escape key for dialog closing.
 *
 * @param {KeyboardEvent} event 
 */
function handleDialogEscapeKey(event) {
  if (event.key !== 'Escape') {
    return;
  }

  closePokemonDetails();
}

initializeApp();