/**
 * Renders the pokemon list into the DOM.
 *
 * @param {Array} pokemonList - The pokemon list from the API.
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
 * Renders all pokemon list items.
 *
 * @param {Array} pokemonList - The pokemon list from the API.
 * @param {HTMLElement} pokemonListContainer - The list container element.
 */
function renderPokemonListItems(pokemonList, pokemonListContainer) {
  pokemonList.forEach((pokemon) => {
    pokemonListContainer.innerHTML += getPokemonCardTemplate(pokemon);
  });
}

/**
 * Renders the details of one pokemon.
 *
 * @param {Object | null} pokemonDetails - The loaded pokemon details.
 */
function renderPokemonDetails(pokemonDetails) {
  const pokemonDialog = getElementById('pokemonDialog');
  const pokemonDialogOverlay = getElementById('pokemonDialogOverlay');

  if (!pokemonDialog || !pokemonDialogOverlay || !pokemonDetails) {
    return;
  }

  pokemonDialog.innerHTML = getPokemonDetailTemplate(pokemonDetails);
  pokemonDialogOverlay.classList.remove('hidden');
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
 * @param {string} message - The error message text.
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
}

/**
 * Renders an error message inside the dialog.
 *
 * @param {string} message - The error message text.
 */
function renderDialogErrorState(message) {
  const pokemonDialog = getElementById('pokemonDialog');
  const pokemonDialogOverlay = getElementById('pokemonDialogOverlay');

  if (!pokemonDialog || !pokemonDialogOverlay) {
    return;
  }

  pokemonDialog.innerHTML = getDialogErrorTemplate(message);
  pokemonDialogOverlay.classList.remove('hidden');
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
}

/**
 * Prevents closing the dialog when clicking inside the dialog card.
 *
 * @param {Event} event - The click event.
 */
function stopDialogClose(event) {
  event.stopPropagation();
}