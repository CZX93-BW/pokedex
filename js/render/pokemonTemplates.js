/**
 * Returns the HTML template for one pokemon card.
 *
 * @param {Object} pokemon - The pokemon data object.
 * @returns {string} The HTML template string.
 */
function getPokemonCardTemplate(pokemon) {
  const pokemonId = pokemon.id;
  const pokemonName = capitalizeFirstLetter(pokemon.name);
  const pokemonImage = pokemon.sprites.front_default;
  const pokemonTypes = getPokemonTypesTemplate(pokemon.types);

  return `
    <article
      class="pokemonCard"
      tabindex="0"
      role="button"
      aria-label="${pokemonName} öffnen"
      onclick="openPokemonDetails(${pokemonId})"
      onkeydown="handlePokemonCardKeydown(event, ${pokemonId})">
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
 * @param {Array} pokemonTypes - The pokemon type data.
 * @returns {string} The HTML template string.
 */
function getPokemonTypesTemplate(pokemonTypes) {
  return pokemonTypes
    .map((typeEntry) => getPokemonTypeBadgeTemplate(typeEntry.type.name))
    .join('');
}

/**
 * Returns the HTML template for one pokemon type badge.
 *
 * @param {string} typeName - The pokemon type name.
 * @returns {string} The HTML template string.
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
 * @returns {string} The HTML template string.
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
 * @param {string} message - The error message text.
 * @returns {string} The HTML template string.
 */
function getErrorTemplate(message) {
  return `
    <div class="statusCard">
      <p>${message}</p>
    </div>
  `;
}

/**
 * Returns the HTML template for empty search results.
 *
 * @returns {string} The HTML template string.
 */
function getNoSearchResultsTemplate() {
  return `
    <div class="statusCard">
      <p>Keine Pokémon gefunden.</p>
    </div>
  `;
}

/**
 * Returns the HTML template for the load more loading state.
 *
 * @returns {string} The HTML template string.
 */
function getLoadMoreLoadingTemplate() {
  return `
    <div class="loadMoreLoading">
      <div class="pokeballLoader"></div>
      <p>Loading...</p>
    </div>
  `;
}