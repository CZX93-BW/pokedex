/**
 * Returns the HTML template for the pokemon detail dialog.
 *
 * @param {Object} pokemonDetails 
 * @returns {string} 
 */
function getPokemonDetailTemplate(pokemonDetails) {
  const pokemonName = capitalizeFirstLetter(pokemonDetails.name);
  const pokemonImage = pokemonDetails.sprites.front_default;
  const pokemonTypes = getPokemonTypesTemplate(pokemonDetails.types);

  return `
    <article class="pokemonDialogCard">
      <button
        class="pokemonDialogCloseButton"
        type="button"
        onclick="closePokemonDetails()"
        aria-label="Detailansicht schließen">
        ✕
      </button>

      <span class="pokemonDialogId">#${pokemonDetails.id}</span>
      <h2 class="pokemonDialogTitle">${pokemonName}</h2>

      <div class="pokemonDialogImageWrapper">
        <img src="${pokemonImage}" alt="${pokemonName}">
      </div>

      <div class="pokemonCardTypes">
        ${pokemonTypes}
      </div>

      <div class="pokemonDialogInfo">
        <p><strong>Größe:</strong> ${pokemonDetails.height}</p>
        <p><strong>Gewicht:</strong> ${pokemonDetails.weight}</p>
      </div>
    </article>
  `;
}