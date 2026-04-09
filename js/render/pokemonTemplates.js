/**
 * Returns the HTML template for one pokemon card.
 *
 * @param {Object} pokemon - The prepared pokemon data.
 * @returns {string}
 */
function getPokemonCardTemplate(pokemon) {
  return `
    <article
      class="pokemonCard ${pokemon.typeClass}"
      tabindex="0"
      role="button"
      aria-label="${pokemon.name} öffnen"
      onclick="openPokemonDetails(${pokemon.id})"
      onkeydown="handlePokemonCardKeydown(event, ${pokemon.id})">

      <span class="pokemonCardId">#${pokemon.id}</span>

      <h2 class="pokemonCardTitle">${pokemon.name}</h2>

      <div class="pokemonCardImageWrapper">
        <img src="${pokemon.image}" alt="${pokemon.name}">
      </div>

      <div class="pokemonCardTypes">
        ${pokemon.typesHtml}
      </div>
    </article>
  `;
}

/**
 * Returns the HTML template for a loading state.
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

/**
 * Returns the HTML template for empty search results.
 *
 * @returns {string}
 */
function getNoSearchResultsTemplate() {
  return `
    <div class="statusCard">
      <p>Keine Pokémon gefunden.</p>
    </div>
  `;
}

/**
 * Returns the HTML template for load more loading.
 *
 * @returns {string}
 */
function getLoadMoreLoadingTemplate() {
  return `
    <div class="loadMoreLoading">
      <div class="pokeballLoader"></div>
      <p>Loading...</p>
    </div>
  `;
}