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
  const pokemonTypes = getPokemonTypesTemplate(pokemon.types);

  return `
    <article class="pokemonCard">
      <span class="pokemonCardId">#${pokemonId}</span>
      <h2 class="pokemonCardTitle">${pokemonName}</h2>
      <div class="pokemonCardImageWrapper">
        <img src="${pokemonImage}" alt="${pokemonName}">
      </div>
      <div class="pokemonCardTypes">
        ${pokemonTypes}
      </div>
    </article>
  `;
}

/**
 * Returns the HTML template for all pokemon types.
 *
 * @param {Array} pokemonTypes 
 * @returns {string} 
 */
function getPokemonTypesTemplate(pokemonTypes) {
  return pokemonTypes
    .map((typeEntry) => getPokemonTypeBadgeTemplate(typeEntry.type.name))
    .join('');
}

/**
 * Returns the HTML template for one pokemon type badge.
 *
 * @param {string} typeName 
 * @returns {string} 
 */
function getPokemonTypeBadgeTemplate(typeName) {
  const formattedTypeName = capitalizeFirstLetter(typeName);

  return `
    <span class="pokemonTypeBadge type-${typeName}">
      ${formattedTypeName}
    </span>
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