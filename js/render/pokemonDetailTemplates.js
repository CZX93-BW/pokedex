/**
 * Returns the HTML template for the pokemon detail dialog.
 *
 * @param {Object} pokemonDetails - The pokemon detail data.
 * @returns {string} The HTML template string.
 */
function getPokemonDetailTemplate(pokemonDetails) {
  const pokemonName = capitalizeFirstLetter(pokemonDetails.name);
  const pokemonImage = pokemonDetails.sprites.front_default;
  const pokemonTypes = getPokemonTypesTemplate(pokemonDetails.types);
  const pokemonStats = getPokemonStatsTemplate(pokemonDetails.stats);
  const pokemonAbilities = getPokemonAbilitiesTemplate(pokemonDetails.abilities);
  const previousButton = getPreviousButtonTemplate(pokemonDetails.id);
  const nextButton = getNextButtonTemplate(pokemonDetails.id);

  return `
    <article class="pokemonDialogCard" onclick="stopDialogClose(event)">
      <button
        class="pokemonDialogCloseButton"
        type="button"
        onclick="closePokemonDetails()"
        aria-label="Detailansicht schließen">
        ✕
      </button>

      <div class="pokemonDialogNavigation">
        ${previousButton}
        ${nextButton}
      </div>

      <span class="pokemonDialogId">#${pokemonDetails.id}</span>
      <h2 class="pokemonDialogTitle">${pokemonName}</h2>

      <div class="pokemonDialogImageWrapper">
        <img src="${pokemonImage}" alt="${pokemonName}">
      </div>

      <div class="pokemonCardTypes">
        ${pokemonTypes}
      </div>

      <div class="pokemonDialogInfo">
        <p><strong>Größe:</strong> ${formatPokemonHeight(pokemonDetails.height)} m</p>
        <p><strong>Gewicht:</strong> ${formatPokemonWeight(pokemonDetails.weight)} kg</p>
      </div>

      <section class="pokemonDialogSection">
        <h3 class="pokemonDialogSectionTitle">Fähigkeiten</h3>
        <div class="pokemonDialogTagList">
          ${pokemonAbilities}
        </div>
      </section>

      <section class="pokemonDialogSection">
        <h3 class="pokemonDialogSectionTitle">Werte</h3>
        <div class="pokemonStatsList">
          ${pokemonStats}
        </div>
      </section>
    </article>
  `;
}

/**
 * Returns the HTML template for the previous dialog button.
 *
 * @param {number} pokemonId - The current pokemon id.
 * @returns {string} The HTML template string.
 */
function getPreviousButtonTemplate(pokemonId) {
  if (pokemonId <= 1) {
    return getDisabledNavigationButtonTemplate('←');
  }

  return getNavigationButtonTemplate('←', pokemonId - 1);
}

/**
 * Returns the HTML template for the next dialog button.
 *
 * @param {number} pokemonId - The current pokemon id.
 * @returns {string} The HTML template string.
 */
function getNextButtonTemplate(pokemonId) {
  return getNavigationButtonTemplate('→', pokemonId + 1);
}

/**
 * Returns the HTML template for an active navigation button.
 *
 * @param {string} label - The button label.
 * @param {number} targetPokemonId - The target pokemon id.
 * @returns {string} The HTML template string.
 */
function getNavigationButtonTemplate(label, targetPokemonId) {
  return `
    <button
      class="pokemonDialogNavButton"
      type="button"
      onclick="openPokemonDetails(${targetPokemonId})">
      ${label}
    </button>
  `;
}

/**
 * Returns the HTML template for a disabled navigation button.
 *
 * @param {string} label - The button label.
 * @returns {string} The HTML template string.
 */
function getDisabledNavigationButtonTemplate(label) {
  return `
    <button
      class="pokemonDialogNavButton disabled"
      type="button"
      disabled>
      ${label}
    </button>
  `;
}

/**
 * Returns the HTML template for all pokemon abilities.
 *
 * @param {Array} pokemonAbilities - The pokemon abilities data.
 * @returns {string} The HTML template string.
 */
function getPokemonAbilitiesTemplate(pokemonAbilities) {
  return pokemonAbilities
    .map((abilityEntry) => getPokemonAbilityTagTemplate(abilityEntry.ability.name))
    .join('');
}

/**
 * Returns the HTML template for one pokemon ability tag.
 *
 * @param {string} abilityName - The pokemon ability name.
 * @returns {string} The HTML template string.
 */
function getPokemonAbilityTagTemplate(abilityName) {
  const formattedAbilityName = formatPokemonLabel(abilityName);

  return `<span class="pokemonDialogTag">${formattedAbilityName}</span>`;
}

/**
 * Returns the HTML template for all pokemon stats.
 *
 * @param {Array} pokemonStats - The pokemon stats data.
 * @returns {string} The HTML template string.
 */
function getPokemonStatsTemplate(pokemonStats) {
  return pokemonStats
    .map((statEntry) => getPokemonStatItemTemplate(statEntry))
    .join('');
}

/**
 * Returns the HTML template for one pokemon stat item.
 *
 * @param {Object} statEntry - One pokemon stat entry.
 * @returns {string} The HTML template string.
 */
function getPokemonStatItemTemplate(statEntry) {
  const statName = formatPokemonStatName(statEntry.stat.name);

  return `
    <div class="pokemonStatItem">
      <span class="pokemonStatName">${statName}</span>
      <span class="pokemonStatValue">${statEntry.base_stat}</span>
    </div>
  `;
}

/**
 * Returns the HTML template for the dialog loading state.
 *
 * @returns {string} The HTML template string.
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
 * Returns the HTML template for the dialog error state.
 *
 * @param {string} message - The error message text.
 * @returns {string} The HTML template string.
 */
function getDialogErrorTemplate(message) {
  return `
    <article class="pokemonDialogCard" onclick="stopDialogClose(event)">
      <button
        class="pokemonDialogCloseButton"
        type="button"
        onclick="closePokemonDetails()"
        aria-label="Detailansicht schließen">
        ✕
      </button>

      <div class="statusCard dialogStatusCard">
        <p>${message}</p>
      </div>
    </article>
  `;
}