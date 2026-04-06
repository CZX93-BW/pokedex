/**
 * Returns the HTML template for one pokemon card.
 *
 * @param {Object} pokemon 
 * @returns {string} 
 */
function getPokemonCardTemplate(pokemon) {
  const pokemonId = extractPokemonIdFromUrl(pokemon.url);
  const pokemonName = capitalizeFirstLetter(pokemon.name);

  return `
    <article class="pokemonCard">
      <span class="pokemonCardId">#${pokemonId}</span>
      <h2 class="pokemonCardTitle">${pokemonName}</h2>
      <div class="pokemonCardImagePlaceholder">Bild folgt</div>
    </article>
  `;
}