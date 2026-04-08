/**
 * Renders the pokemon list into the DOM.
 *
 * @param {Array} pokemonList 
 */
function renderPokemonList(pokemonList) {
  const pokemonListContainer = getElementById('pokemonList');

  if (!pokemonListContainer) {
    return;
  }

  clearPokemonStatus();
  clearPokemonList();
  renderPokemonListItems(pokemonList, pokemonListContainer);
}

/**
 * Appends pokemon to the existing list.
 *
 * @param {Array} pokemonList 
 */
function appendPokemonList(pokemonList) {
  const pokemonListContainer = getElementById('pokemonList');

  if (!pokemonListContainer) {
    return;
  }

  renderPokemonListItems(pokemonList, pokemonListContainer);
}

/**
 * Renders all pokemon list items.
 *
 * @param {Array} pokemonList 
 * @param {HTMLElement} pokemonListContainer 
 */
function renderPokemonListItems(pokemonList, pokemonListContainer) {
  pokemonList.forEach((pokemon) => {
    pokemonListContainer.innerHTML += getPokemonCardTemplate(pokemon);
  });
}

/**
 * Renders the details of one pokemon.
 *
 * @param {Object | null} pokemonDetails 
 */
function renderPokemonDetails(pokemonDetails) {
  const pokemonDialog = getElementById('pokemonDialog');
  const pokemonDialogOverlay = getElementById('pokemonDialogOverlay');

  if (!pokemonDialog || !pokemonDialogOverlay || !pokemonDetails) {
    return;
  }

  pokemonDialog.innerHTML = getPokemonDetailTemplate(pokemonDetails);
  pokemonDialogOverlay.classList.remove('hidden');
  setBodyScrollLock(true);
}

/**
 * Renders a loading state.
 */
function renderLoadingState() {
  const pokemonStatusContainer = getElementById('pokemonStatus');

  if (!pokemonStatusContainer) {
    return;
  }

  clearPokemonList();
  pokemonStatusContainer.innerHTML = getLoadingTemplate();
}

/**
 * Renders an error message.
 *
 * @param {string} message 
 */
function renderErrorMessage(message) {
  const pokemonStatusContainer = getElementById('pokemonStatus');

  if (!pokemonStatusContainer) {
    return;
  }

  clearPokemonList();
  pokemonStatusContainer.innerHTML = getErrorTemplate(message);
}

/**
 * Renders a message for empty search results.
 */
function renderNoSearchResults() {
  const pokemonStatusContainer = getElementById('pokemonStatus');

  if (!pokemonStatusContainer) {
    return;
  }

  clearPokemonList();
  pokemonStatusContainer.innerHTML = getNoSearchResultsTemplate();
}

/**
 * Renders the loading state inside the dialog.
 */
function renderDialogLoadingState() {
  const pokemonDialog = getElementById('pokemonDialog');
  const pokemonDialogOverlay = getElementById('pokemonDialogOverlay');

  if (!pokemonDialog || !pokemonDialogOverlay) {
    return;
  }

  pokemonDialog.innerHTML = getDialogLoadingTemplate();
  pokemonDialogOverlay.classList.remove('hidden');
  setBodyScrollLock(true);
}

/**
 * Renders an error message inside the dialog.
 *
 * @param {string} message 
 */
function renderDialogErrorState(message) {
  const pokemonDialog = getElementById('pokemonDialog');
  const pokemonDialogOverlay = getElementById('pokemonDialogOverlay');

  if (!pokemonDialog || !pokemonDialogOverlay) {
    return;
  }

  pokemonDialog.innerHTML = getDialogErrorTemplate(message);
  pokemonDialogOverlay.classList.remove('hidden');
  setBodyScrollLock(true);
}

/**
 * Sets the loading state for the load more button.
 */
function setLoadMoreButtonLoadingState() {
  const loadMoreButton = getElementById('loadMoreButton');

  if (!loadMoreButton) {
    return;
  }

  loadMoreButton.disabled = true;
  loadMoreButton.textContent = 'Lädt...';
}

/**
 * Resets the load more button state.
 */
function resetLoadMoreButtonState() {
  const loadMoreButton = getElementById('loadMoreButton');

  if (!loadMoreButton) {
    return;
  }

  loadMoreButton.disabled = false;
  loadMoreButton.textContent = 'Mehr laden';
}

/**
 * Updates the visibility of the load more button.
 */
function updateLoadMoreVisibility() {
  if (hasLoadedAllPokemon()) {
    hideLoadMoreButton();
    return;
  }

  showLoadMoreButton();
}

/**
 * Shows the load more button.
 */
function showLoadMoreButton() {
  const loadMoreWrapper = getElementById('loadMoreWrapper');

  if (!loadMoreWrapper) {
    return;
  }

  loadMoreWrapper.classList.remove('hidden');
}

/**
 * Hides the load more button.
 */
function hideLoadMoreButton() {
  const loadMoreWrapper = getElementById('loadMoreWrapper');

  if (!loadMoreWrapper) {
    return;
  }

  loadMoreWrapper.classList.add('hidden');
}

/**
 * Sets the body scroll lock state.
 *
 * @param {boolean} isLocked 
 */
function setBodyScrollLock(isLocked) {
  document.body.classList.toggle('dialogOpen', isLocked);
}

/**
 * Clears the pokemon list container.
 */
function clearPokemonList() {
  const pokemonListContainer = getElementById('pokemonList');

  if (!pokemonListContainer) {
    return;
  }

  pokemonListContainer.innerHTML = '';
}

/**
 * Clears the pokemon status container.
 */
function clearPokemonStatus() {
  const pokemonStatusContainer = getElementById('pokemonStatus');

  if (!pokemonStatusContainer) {
    return;
  }

  pokemonStatusContainer.innerHTML = '';
}

/**
 * Closes the pokemon detail dialog.
 */
function closePokemonDetails() {
  const pokemonDialog = getElementById('pokemonDialog');
  const pokemonDialogOverlay = getElementById('pokemonDialogOverlay');

  if (!pokemonDialog || !pokemonDialogOverlay) {
    return;
  }

  pokemonDialog.innerHTML = '';
  pokemonDialogOverlay.classList.add('hidden');
  setBodyScrollLock(false);
}

/**
 * Prevents closing the dialog when clicking inside the dialog card.
 *
 * @param {Event} event 
 */
function stopDialogClose(event) {
  event.stopPropagation();
}