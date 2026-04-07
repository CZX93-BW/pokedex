const firstPokemonId = 1;
const lastPokemonId = 1025;

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
 * @param {number} pokemonId - The id of the selected pokemon.
 */
async function openPokemonDetails(pokemonId) {
  if (!isValidPokemonId(pokemonId)) {
    return;
  }

  renderDialogLoadingState();

  const pokemonDetails = await loadPokemonDetailsById(pokemonId);

  if (!pokemonDetails) {
    renderDialogErrorState('Die Detaildaten konnten nicht geladen werden.');
    return;
  }

  renderPokemonDetails(pokemonDetails);
}

/**
 * Checks if the pokemon id is valid.
 *
 * @param {number} pokemonId - The pokemon id to check.
 * @returns {boolean} True if the id is valid.
 */
function isValidPokemonId(pokemonId) {
  return pokemonId >= firstPokemonId && pokemonId <= lastPokemonId;
}

/**
 * Handles the pokemon search.
 *
 * @param {string} searchValue - The search input value.
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
 * @param {KeyboardEvent} event - The keyboard event.
 */
function handleDialogEscapeKey(event) {
  if (event.key !== 'Escape') {
    return;
  }

  closePokemonDetails();
}

initializeApp();