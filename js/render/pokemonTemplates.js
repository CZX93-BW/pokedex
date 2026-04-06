/**
 * Returns the HTML template for one pokemon card.
 *
 * @param {Object} pokemon 
 * @returns {string} 
 */
function getPokemonCardTemplate(pokemon) {
  const pokemonId = pokemon.id;
  const pokemonName = capitalizeFirstLetter(pokemon.name);
  const pokemonImage = pokemon.sprites.front_default;

  return `
    <article class="pokemonCard">
      <span class="pokemonCardId">#${pokemonId}</span>
      <h2 class="pokemonCardTitle">${pokemonName}</h2>
      <div class="pokemonCardImageWrapper">
        <img src="${pokemonImage}" alt="${pokemonName}">
      </div>
    </article>
  `;
}

/**
 * Returns the HTML template for the loading state.
 *
 * @returns {string} 
 */
function getLoadingTemplate() {
  return `
    <div class="statusCard">
      <div class="loadingSpinner"></div>
      <p>Lade Pokémon...</p>
    </div>
  `;
}

/**
 * Returns the HTML template for an error message.
 *
 * @param {string} message 
 * @returns {string} 
 */
function getErrorTemplate(message) {
  return `
    <div class="statusCard">
      <p>${message}</p>
    </div>
  `;
}