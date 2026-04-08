const firstPokemonId = 1;
const lastPokemonId = 1025;
const pokemonBatchSize = 20;

let allPokemon = [];
let allPokemonNames = [];

let currentOffset = 0;
let isLoadingMore = false;

/**
 * Starts the application.
 */
async function initializeApp() {
  initializeEventListeners();

  allPokemonNames = await loadAllPokemonNames();

  await loadAndRenderPokemonList();
}

/**
 * Loads pokemon list.
 */
async function loadAndRenderPokemonList() {
  renderLoadingState();
  hideLoadMoreButton();

  const pokemonList = await loadPokemonList(pokemonBatchSize, currentOffset);
  const detailed = await loadDetailedPokemonList(pokemonList);

  if (detailed.length === 0) {
    renderErrorMessage('Die Pokémon konnten nicht geladen werden.');
    return;
  }

  allPokemon = detailed;
  currentOffset += pokemonBatchSize;

  renderPokemonList(allPokemon);
  updateLoadMoreVisibility();
}

/**
 * Load more
 */
async function loadMorePokemon() {
  if (isLoadingMore || hasLoadedAllPokemon()) return;

  isLoadingMore = true;
  showLoadMoreLoading();

  await delay(600);

  const list = await loadPokemonList(pokemonBatchSize, currentOffset);
  const detailed = await loadDetailedPokemonList(list);

  allPokemon = [...allPokemon, ...detailed];
  currentOffset += pokemonBatchSize;

  appendPokemonList(detailed);

  hideLoadMoreLoading();
  updateLoadMoreVisibility();

  isLoadingMore = false;
}

/**
 * SEARCH CORE FIX
 */
async function handlePokemonSearch(searchValue) {
  const value = searchValue.trim().toLowerCase();

  // weniger als 3 Zeichen → reset
  if (value.length < 3) {
    renderPokemonList(allPokemon);
    updateLoadMoreVisibility();
    return;
  }

  renderLoadingState();
  hideLoadMoreButton();

  // alle Namen filtern
  const matches = allPokemonNames.filter((pokemon) =>
    pokemon.name.includes(value)
  );

  // max 20 Ergebnisse laden
  const limitedMatches = matches.slice(0, 20);

  if (limitedMatches.length === 0) {
    renderNoSearchResults();
    return;
  }

  const detailed = await loadDetailedPokemonList(limitedMatches);

  renderPokemonList(detailed);
}

/**
 * Delay helper
 */
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

/**
 * Utils
 */
function hasLoadedAllPokemon() {
  return currentOffset >= lastPokemonId;
}

/**
 * UI Events
 */
function initializeEventListeners() {
  initializeSearch();
  initializeDialogOverlayClick();
  initializeEscapeKeyClose();
}

/**
 * Search Events
 */
function initializeSearch() {
  const input = getElementById('pokemonSearchInput');

  if (!input) return;

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handlePokemonSearch(input.value);
    }
  });
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

initializeApp();