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
 * Renders one pokemon card.
 *
 * @param {Object} pokemon 
 */
function renderPokemonCard(pokemon) {
  console.log('Card rendering not implemented yet:', pokemon);
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
  const pokemonDialogOverlay = getElementById('pokemonDialogOverlay');

  if (!pokemonDialogOverlay) {
    return;
  }

  pokemonDialogOverlay.classList.add('hidden');
}