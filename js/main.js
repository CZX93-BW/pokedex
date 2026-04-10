const firstPokemonId = 1;
const lastPokemonId = 1025;
const pokemonBatchSize = 20;

let allPokemon = [];
let allPokemonNames = [];

let currentOffset = 0;
let isLoadingMore = false;
let isSearchActive = false;

/* =========================
   App Initialization
   ========================= */

/**
 * Starts the application.
 *
 * @returns {Promise<void>}
 */
async function initializeApp() {
  initializeEventListeners();
  loadFromLocalStorage();

  if (allPokemon.length > 0) {
    renderPokemonList(allPokemon);
    updateLoadMoreVisibility();
  } else {
    await loadAndRenderPokemonList();
  }

  allPokemonNames = await loadAllPokemonNames();
}

/* =========================
   Pokemon Loading
   ========================= */

/**
 * Loads the initial pokemon list and renders it.
 *
 * @returns {Promise<void>}
 */
async function loadAndRenderPokemonList() {
  renderLoadingState();
  hideLoadMoreButton();

  const pokemonList = await loadPokemonList(pokemonBatchSize, currentOffset);
  const detailedPokemonList = await loadDetailedPokemonList(pokemonList);
  const pokemonCardDataList = createPokemonCardDataList(detailedPokemonList);

  if (pokemonCardDataList.length === 0) {
    renderErrorMessage('Die Pokémon konnten nicht geladen werden.');
    return;
  }

  allPokemon = pokemonCardDataList;
  currentOffset += pokemonBatchSize;

  saveToLocalStorage();
  renderPokemonList(allPokemon);
  updateLoadMoreVisibility();
}

/**
 * Loads more pokemon and appends them to the list.
 *
 * @returns {Promise<void>}
 */
async function loadMorePokemon() {
  if (isLoadingMore || hasLoadedAllPokemon() || isSearchActive) {
    return;
  }

  isLoadingMore = true;
  showLoadMoreLoading();

  await delay(600);

  const pokemonList = await loadPokemonList(pokemonBatchSize, currentOffset);
  const detailedPokemonList = await loadDetailedPokemonList(pokemonList);
  const pokemonCardDataList = createPokemonCardDataList(detailedPokemonList);

  if (pokemonCardDataList.length === 0) {
    hideLoadMoreLoading();
    updateLoadMoreVisibility();
    isLoadingMore = false;
    return;
  }

  allPokemon = [...allPokemon, ...pokemonCardDataList];
  currentOffset += pokemonBatchSize;

  saveToLocalStorage();
  appendPokemonList(pokemonCardDataList);

  hideLoadMoreLoading();
  updateLoadMoreVisibility();

  isLoadingMore = false;
}

/**
 * Opens the pokemon details view.
 *
 * @param {number} pokemonId - The selected pokemon id.
 * @returns {Promise<void>}
 */
async function openPokemonDetails(pokemonId) {
  renderDialogLoadingState();

  const pokemonDetails = await loadPokemonDetailsById(pokemonId);

  if (!pokemonDetails) {
    renderDialogErrorState('Die Detaildaten konnten nicht geladen werden.');
    return;
  }

  renderPokemonDetails(pokemonDetails);
}

/* =========================
   Search
   ========================= */

/**
 * Handles the search button click.
 */
function handlePokemonSearchButtonClick() {
  const pokemonSearchInput = getElementById('pokemonSearchInput');

  if (!pokemonSearchInput) {
    return;
  }

  handlePokemonSearch(pokemonSearchInput.value);
}

/**
 * Handles the pokemon search.
 *
 * @param {string} searchValue - The entered search value.
 * @returns {Promise<void>}
 */
async function handlePokemonSearch(searchValue) {
  const normalizedSearchValue = searchValue.trim().toLowerCase();

  // 👉 WICHTIG: Immer zuerst Suchmodus aktivieren + Button verstecken
  isSearchActive = true;
  hideLoadMoreButton();

  if (normalizedSearchValue === '') {
    resetSearchState();
    return;
  }

  if (normalizedSearchValue.length < 3) {
    renderErrorMessage('Bitte mindestens 3 Zeichen eingeben.');
    return;
  }

  renderLoadingState();

  const matchingPokemon = getMatchingPokemonNames(normalizedSearchValue);
  const limitedMatches = matchingPokemon.slice(0, 20);

  if (limitedMatches.length === 0) {
    renderNoSearchResults();
    return;
  }

  const detailedPokemonList = await loadDetailedPokemonList(limitedMatches);
  const pokemonCardDataList = createPokemonCardDataList(detailedPokemonList);

  renderPokemonList(pokemonCardDataList);
}

/**
 * Resets the search state and returns to the loaded default view.
 */
function resetSearchState() {
  isSearchActive = false;
  clearPokemonStatus();
  renderPokemonList(allPokemon);
  updateLoadMoreVisibility();
}

/**
 * Returns all matching pokemon names for the search.
 *
 * @param {string} searchValue - The normalized search value.
 * @returns {Array} The matching pokemon list.
 */
function getMatchingPokemonNames(searchValue) {
  return allPokemonNames.filter((pokemon) => {
    return pokemon.name.includes(searchValue);
  });
}

/* =========================
   Pokemon Data Mapping
   ========================= */

/**
 * Creates lightweight card data for multiple pokemon.
 *
 * @param {Array} pokemonList - The detailed pokemon list.
 * @returns {Array} The mapped pokemon card data list.
 */
function createPokemonCardDataList(pokemonList) {
  return pokemonList.map((pokemon) => {
    return createPokemonCardData(pokemon);
  });
}

/**
 * Creates lightweight card data for one pokemon.
 *
 * @param {Object} pokemon - The detailed pokemon object.
 * @returns {Object} The mapped pokemon card data.
 */
function createPokemonCardData(pokemon) {
  return {
    id: pokemon.id,
    name: pokemon.name,
    sprites: {
      front_default: pokemon.sprites.front_default,
    },
    types: pokemon.types,
  };
}

/* =========================
   Local Storage
   ========================= */

/**
 * Saves the current pokemon state to local storage.
 */
function saveToLocalStorage() {
  try {
    localStorage.setItem('pokemonList', JSON.stringify(allPokemon));
    localStorage.setItem('pokemonOffset', String(currentOffset));
  } catch (error) {
    localStorage.removeItem('pokemonList');
    localStorage.setItem('pokemonOffset', String(currentOffset));
    console.error('Failed to save pokemon list to local storage:', error);
  }
}

/**
 * Loads the current pokemon state from local storage.
 */
function loadFromLocalStorage() {
  const savedPokemonList = localStorage.getItem('pokemonList');
  const savedPokemonOffset = localStorage.getItem('pokemonOffset');

  if (savedPokemonList) {
    allPokemon = JSON.parse(savedPokemonList);
  }

  if (savedPokemonOffset) {
    currentOffset = Number(savedPokemonOffset);
  }
}

/* =========================
   State Helpers
   ========================= */

/**
 * Creates a delay.
 *
 * @param {number} time - The delay in milliseconds.
 * @returns {Promise<void>} The delay promise.
 */
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

/**
 * Checks whether all pokemon have already been loaded.
 *
 * @returns {boolean} True if all pokemon are loaded.
 */
function hasLoadedAllPokemon() {
  return currentOffset >= lastPokemonId;
}

/* =========================
   Keyboard and Events
   ========================= */

/**
 * Initializes all event listeners.
 */
function initializeEventListeners() {
  initializeSearchInputEvents();
  initializeEscapeKeyClose();
}

/**
 * Initializes search input events.
 */
function initializeSearchInputEvents() {
  const pokemonSearchInput = getElementById('pokemonSearchInput');

  if (!pokemonSearchInput) {
    return;
  }

  pokemonSearchInput.addEventListener('keydown', handleSearchInputKeydown);
  pokemonSearchInput.addEventListener('input', handleSearchInputReset);
}

/**
 * Initializes the escape key close event.
 */
function initializeEscapeKeyClose() {
  document.addEventListener('keydown', handleEscapeKeyClose);
}

/**
 * Handles search input keydown events.
 *
 * @param {KeyboardEvent} event - The keyboard event.
 */
function handleSearchInputKeydown(event) {
  if (event.key !== 'Enter') {
    return;
  }

  handlePokemonSearchButtonClick();
}

/**
 * Handles resetting the search when the input becomes empty.
 *
 * @param {Event} event - The input event.
 */
function handleSearchInputReset(event) {
  const inputValue = event.target.value.trim();

  if (inputValue !== '') {
    return;
  }

  resetSearchState();
}

/**
 * Handles card keyboard interaction.
 *
 * @param {KeyboardEvent} event - The keyboard event.
 * @param {number} pokemonId - The selected pokemon id.
 */
function handlePokemonCardKeydown(event, pokemonId) {
  if (event.key !== 'Enter' && event.key !== ' ') {
    return;
  }

  event.preventDefault();
  openPokemonDetails(pokemonId);
}

/**
 * Handles closing the dialog with the escape key.
 *
 * @param {KeyboardEvent} event - The keyboard event.
 */
function handleEscapeKeyClose(event) {
  if (event.key !== 'Escape') {
    return;
  }

  closePokemonDetails();
}

/**
 * Registers all application startup logic.
 */

/**
 * Starts the application after the DOM is fully loaded.
 *
 * @returns {void}
 */
function startApplication() {
  initializeApp();
}

document.addEventListener('DOMContentLoaded', startApplication);