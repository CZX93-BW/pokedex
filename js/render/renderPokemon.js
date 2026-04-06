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

  pokemonListContainer.innerHTML = '';
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
    pokemonListContainer.innerHTML += getPokemonListItemTemplate(pokemon);
  });
}

/**
 * Creates the HTML template for one pokemon list item.
 *
 * @param {Object} pokemon 
 * @returns {string} 
 */
function getPokemonListItemTemplate(pokemon) {
  return `<div class="pokemonListItem">${pokemon.name}</div>`;
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
  console.log('Details rendering not implemented yet:', pokemonDetails);
}

/**
 * Renders a loading state.
 */
function renderLoadingState() {
  console.log('Loading state not implemented yet');
}

/**
 * Renders an error message.
 *
 * @param {string} message 
 */
function renderErrorMessage(message) {
  console.log('Error state not implemented yet:', message);
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