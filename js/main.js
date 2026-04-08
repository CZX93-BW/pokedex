const firstPokemonId = 1;
const lastPokemonId = 1025;
const pokemonBatchSize = 20;

let allPokemon = [];
let currentOffset = 0;
let isLoadingMore = false;

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
  hideLoadMoreButton();

  const pokemonList = await loadPokemonList(pokemonBatchSize, currentOffset);
  const detailedPokemonList = await loadDetailedPokemonList(pokemonList);

  if (detailedPokemonList.length === 0) {
    renderErrorMessage('Die Pokémon konnten nicht geladen werden.');
    return;
  }

  allPokemon = detailedPokemonList;
  currentOffset += pokemonBatchSize;

  renderPokemonList(allPokemon);
  updateLoadMoreVisibility();
}

/**
 * Loads more pokemon and appends them to the list.
 */
async function loadMorePokemon() {
  if (isLoadingMore || hasLoadedAllPokemon()) {
    return;
  }

  isLoadingMore = true;
  setLoadMoreButtonLoadingState();

  const newPokemonList = await loadPokemonList(pokemonBatchSize, currentOffset);
  const detailedPokemonList = await loadDetailedPokemonList(newPokemonList);

  if (detailedPokemonList.length === 0) {
    resetLoadMoreButtonState();
    isLoadingMore = false;
    return;
  }

  allPokemon = [...allPokemon, ...detailedPokemonList];
  currentOffset += pokemonBatchSize;

  appendPokemonList(detailedPokemonList);
  resetLoadMoreButtonState();
  updateLoadMoreVisibility();

  isLoadingMore = false;
}

/**
 * Opens the pokemon details view.
 *
 * @param {number} pokemonId 
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
 * @param {number} pokemonId 
 * @returns {boolean}
 */
function isValidPokemonId(pokemonId) {
  return pokemonId >= firstPokemonId && pokemonId <= lastPokemonId;
}

/**
 * Checks if all pokemon have already been loaded.
 *
 * @returns {boolean} 
 */
function hasLoadedAllPokemon() {
  return currentOffset >= lastPokemonId;
}

/**
 * Handles the pokemon search button click.
 */
function handlePokemonSearchButtonClick() {
  const searchInput = getElementById('pokemonSearchInput');

  if (!searchInput) {
    return;
  }

  handlePokemonSearch(searchInput.value);
}

/**
 * Handles the pokemon search.
 *
 * @param {string} searchValue 
 */
function handlePokemonSearch(searchValue) {
  const normalizedSearchValue = searchValue.trim().toLowerCase();

  if (isEmptyString(normalizedSearchValue)) {
    renderPokemonList(allPokemon);
    updateLoadMoreVisibility();
    return;
  }

  const filteredPokemon = filterPokemonByName(normalizedSearchValue);

  hideLoadMoreButton();

  if (filteredPokemon.length === 0) {
    renderNoSearchResults();
    return;
  }

  renderPokemonList(filteredPokemon);
}

/**
 * Filters pokemon by name.
 *
 * @param {string} searchValue 
 * @returns {Array} 
 */
function filterPokemonByName(searchValue) {
  return allPokemon.filter((pokemon) => {
    return pokemon.name.includes(searchValue);
  });
}

/**
 * Initializes all event listeners.
 */
function initializeEventListeners() {
  initializeDialogOverlayClick();
  initializeEscapeKeyClose();
  initializeSearchInputKeydown();
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
 * Initializes the enter key event for the search input.
 */
function initializeSearchInputKeydown() {
  const searchInput = getElementById('pokemonSearchInput');

  if (!searchInput) {
    return;
  }

  searchInput.addEventListener('keydown', handleSearchInputKeydown);
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

/**
 * Handles the search input keydown event.
 *
 * @param {KeyboardEvent} event
 */
function handleSearchInputKeydown(event) {
  if (event.key !== 'Enter') {
    return;
  }

  handlePokemonSearchButtonClick();
}

initializeApp();