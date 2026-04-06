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

  pokemonListContainer.innerHTML = '';

  pokemonList.forEach((pokemon) => {
    pokemonListContainer.innerHTML += getPokemonListItemTemplate(pokemon);
  });
}

/**
 * Creates the HTML template for one pokemon list item.
 *
 * @param {Object} pokemon - The pokemon data object.
 * @returns {string} The HTML template string.
 */
function getPokemonListItemTemplate(pokemon) {
  return `<div class="pokemonListItem">${pokemon.name}</div>`;
}