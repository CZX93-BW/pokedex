/**
 * Returns the HTML template for the pokemon detail dialog.
 *
 * @param {Object} pokemon
 * @returns {string}
 */
function getPokemonDetailTemplate(pokemon) {
  return `
    <article class="pokemonDialogCard" onclick="stopDialogClose(event)">
      <button
        class="pokemonDialogCloseButton"
        type="button"
        onclick="closePokemonDetails()">
        ✕
      </button>

      <div class="pokemonDialogNavigation">
        ${pokemon.previousButton}
        ${pokemon.nextButton}
      </div>

      <span class="pokemonDialogId">#${pokemon.id}</span>

      <h2 class="pokemonDialogTitle">${pokemon.name}</h2>

      <div class="pokemonDialogImageWrapper">
        <img src="${pokemon.image}" alt="${pokemon.name}">
      </div>

      <div class="pokemonCardTypes">
        ${pokemon.typesHtml}
      </div>

      <div class="pokemonDialogInfo">
        <p><strong>Größe:</strong> ${pokemon.height} m</p>
        <p><strong>Gewicht:</strong> ${pokemon.weight} kg</p>
      </div>

      <section class="pokemonDialogSection">
        <h3 class="pokemonDialogSectionTitle">Fähigkeiten</h3>
        <div class="pokemonDialogTagList">
          ${pokemon.abilitiesHtml}
        </div>
      </section>

      <section class="pokemonDialogSection">
        <h3 class="pokemonDialogSectionTitle">Werte</h3>
        <div class="pokemonStatsList">
          ${pokemon.statsHtml}
        </div>
      </section>
    </article>
  `;
}

/**
 * Returns dialog loading template.
 */
function getDialogLoadingTemplate() {
  return `
    <article class="pokemonDialogCard" onclick="stopDialogClose(event)">
      <div class="statusCard dialogStatusCard">
        <div class="loadingSpinner"></div>
        <p>Lade Details...</p>
      </div>
    </article>
  `;
}

/**
 * Returns dialog error template.
 */
function getDialogErrorTemplate(message) {
  return `
    <article class="pokemonDialogCard" onclick="stopDialogClose(event)">
      <button onclick="closePokemonDetails()">✕</button>
      <div class="statusCard dialogStatusCard">
        <p>${message}</p>
      </div>
    </article>
  `;
}