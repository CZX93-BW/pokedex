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