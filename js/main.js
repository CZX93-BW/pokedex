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

  showLoadMoreLoading();

  await delay(600);

  const newPokemonList = await loadPokemonList(pokemonBatchSize, currentOffset);
  const detailedPokemonList = await loadDetailedPokemonList(newPokemonList);

  if (detailedPokemonList.length === 0) {
    hideLoadMoreLoading();
    isLoadingMore = false;
    return;
  }

  allPokemon = [...allPokemon, ...detailedPokemonList];
  currentOffset += pokemonBatchSize;

  appendPokemonList(detailedPokemonList);

  hideLoadMoreLoading();
  updateLoadMoreVisibility();

  isLoadingMore = false;
}

/**
 * Creates a delay.
 *
 * @param {number} time - Delay in ms
 * @returns {Promise}
 */
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
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
 * Checks if id is valid.
 */
function isValidPokemonId(pokemonId) {
  return pokemonId >= firstPokemonId && pokemonId <= lastPokemonId;
}

/**
 * Checks if all pokemon loaded.
 */
function hasLoadedAllPokemon() {
  return currentOffset >= lastPokemonId;
}

/**
 * Handles pokemon card keyboard interaction.
 */
function handlePokemonCardKeydown(event, pokemonId) {
  const triggerKeys = ['Enter', ' '];

  if (!triggerKeys.includes(event.key)) {
    return;
  }

  event.preventDefault();
  openPokemonDetails(pokemonId);
}

/**
 * Handles search button click.
 */
function handlePokemonSearchButtonClick() {
  const input = getElementById('pokemonSearchInput');
  if (!input) return;

  handlePokemonSearch(input.value);
}

/**
 * Handles search logic.
 */
function handlePokemonSearch(searchValue) {
  const normalized = searchValue.trim().toLowerCase();

  if (normalized.length < 3) {
    renderPokemonList(allPokemon);
    updateLoadMoreVisibility();
    return;
  }

  const filtered = allPokemon.filter((pokemon) =>
    pokemon.name.includes(normalized)
  );

  hideLoadMoreButton();

  if (filtered.length === 0) {
    renderNoSearchResults();
    return;
  }

  renderPokemonList(filtered);
}

/**
 * Initializes all events.
 */
function initializeEventListeners() {
  initializeDialogOverlayClick();
  initializeEscapeKeyClose();
  initializeSearchEnter();
}

/**
 * Overlay click
 */
function initializeDialogOverlayClick() {
  const overlay = getElementById('pokemonDialogOverlay');
  if (!overlay) return;

  overlay.addEventListener('click', closePokemonDetails);
}

/**
 * ESC close
 */
function initializeEscapeKeyClose() {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closePokemonDetails();
    }
  });
}

/**
 * Search Enter
 */
function initializeSearchEnter() {
  const input = getElementById('pokemonSearchInput');
  if (!input) return;

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handlePokemonSearchButtonClick();
    }
  });
}

initializeApp();