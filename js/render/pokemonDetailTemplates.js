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
  const pokemonStats = getPokemonStatsTemplate(pokemonDetails.stats);
  const pokemonAbilities = getPokemonAbilitiesTemplate(pokemonDetails.abilities);

  return `
    <article class="pokemonDialogCard" onclick="stopDialogClose(event)">
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
 * Returns the HTML template for all pokemon abilities.
 *
 * @param {Array} pokemonAbilities 
 * @returns {string} 
 */
function getPokemonAbilitiesTemplate(pokemonAbilities) {
  return pokemonAbilities
    .map((abilityEntry) => getPokemonAbilityTagTemplate(abilityEntry.ability.name))
    .join('');
}

/**
 * Returns the HTML template for one pokemon ability tag.
 *
 * @param {string} abilityName 
 * @returns {string} 
 */
function getPokemonAbilityTagTemplate(abilityName) {
  const formattedAbilityName = formatPokemonLabel(abilityName);

  return `<span class="pokemonDialogTag">${formattedAbilityName}</span>`;
}

/**
 * Returns the HTML template for all pokemon stats.
 *
 * @param {Array} pokemonStats 
 * @returns {string} 
 */
function getPokemonStatsTemplate(pokemonStats) {
  return pokemonStats
    .map((statEntry) => getPokemonStatItemTemplate(statEntry))
    .join('');
}

/**
 * Returns the HTML template for one pokemon stat item.
 *
 * @param {Object} statEntry 
 * @returns {string} 
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