/**
 * Returns the HTML template for the pokemon detail dialog.
 *
 * @param {Object} pokemon - The prepared pokemon detail view model.
 * @returns {string}
 */
function getPokemonDetailTemplate(pokemon) {
  return `
    <article class="pokemonDialogCard" onclick="stopDialogClose(event)">
      ${pokemon.previousButton}
      ${pokemon.nextButton}

      <div class="pokemonDialogHeader">
        <div class="pokemonDialogHeaderSpacer"></div>

        <button
          class="pokemonDialogCloseButton"
          type="button"
          onclick="closePokemonDetails()">
          ✕
        </button>
      </div>

      <div class="pokemonDialogContent">
        <span class="pokemonDialogId">#${pokemon.id}</span>

        <h2 class="pokemonDialogTitle">${pokemon.name}</h2>

        <div class="pokemonDialogImageWrapper">
          <img src="${pokemon.image}" alt="${pokemon.name}">
        </div>

        ${createDialogTabs()}

        <div id="pokemonTabContent">
          ${createInfoTabContent(pokemon)}
        </div>
      </div>
    </article>
  `;
}

/**
 * Returns the HTML template for dialog tabs.
 *
 * @returns {string} The prepared tabs html.
 */
function createDialogTabs() {
  return `
    <div class="pokemonTabs">
      <button
        id="tabInfo"
        class="pokemonTab active"
        type="button"
        onclick="switchPokemonTab('info')">
        Allgemein
      </button>

      <button
        id="tabStats"
        class="pokemonTab"
        type="button"
        onclick="switchPokemonTab('stats')">
        Status
      </button>
    </div>
  `;
}

/**
 * Switches the active pokemon dialog tab.
 *
 * @param {string} tab - The selected tab name.
 */
function switchPokemonTab(tab) {
  updateActiveTabButtons(tab);
  renderTabContent(tab);
}

/**
 * Updates the active tab button styles.
 *
 * @param {string} tab - The selected tab name.
 */
function updateActiveTabButtons(tab) {
  const infoTabButton = getElementById('tabInfo');
  const statsTabButton = getElementById('tabStats');

  if (!infoTabButton || !statsTabButton) {
    return;
  }

  infoTabButton.classList.toggle('active', tab === 'info');
  statsTabButton.classList.toggle('active', tab === 'stats');
}

/**
 * Renders the selected tab content.
 *
 * @param {string} tab - The selected tab name.
 */
function renderTabContent(tab) {
  const pokemonTabContent = getElementById('pokemonTabContent');

  if (!pokemonTabContent || !window.currentPokemonDetails) {
    return;
  }

  if (tab === 'stats') {
    pokemonTabContent.innerHTML = createStatsTabContent(window.currentPokemonDetails);
    return;
  }

  pokemonTabContent.innerHTML = createInfoTabContent(window.currentPokemonDetails);
}

/**
 * Returns the info tab content.
 *
 * @param {Object} pokemon - The prepared pokemon detail view model.
 * @returns {string} The prepared info tab html.
 */
function createInfoTabContent(pokemon) {
  return `
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
  `;
}

/**
 * Returns the stats tab content.
 *
 * @param {Object} pokemon - The prepared pokemon detail view model.
 * @returns {string} The prepared stats tab html.
 */
function createStatsTabContent(pokemon) {
  return `
    <section class="pokemonDialogSection">
      <h3 class="pokemonDialogSectionTitle">Werte</h3>
      <div class="pokemonStatsList">
        ${pokemon.statsHtml}
      </div>
    </section>
  `;
}

/**
 * Returns dialog loading template.
 *
 * @returns {string} The prepared loading template.
 */
function getDialogLoadingTemplate() {
  return `
    <article class="pokemonDialogCard" onclick="stopDialogClose(event)">
      <div class="pokemonDialogHeader">
        <div class="pokemonDialogHeaderSpacer"></div>

        <button
          class="pokemonDialogCloseButton"
          type="button"
          onclick="closePokemonDetails()">
          ✕
        </button>
      </div>

      <div class="pokemonDialogContent">
        <div class="statusCard dialogStatusCard">
          <div class="loadingSpinner"></div>
          <p>Lade Details...</p>
        </div>
      </div>
    </article>
  `;
}

/**
 * Returns dialog error template.
 *
 * @param {string} message - The error message.
 * @returns {string} The prepared error template.
 */
function getDialogErrorTemplate(message) {
  return `
    <article class="pokemonDialogCard" onclick="stopDialogClose(event)">
      <div class="pokemonDialogHeader">
        <div class="pokemonDialogHeaderSpacer"></div>

        <button
          class="pokemonDialogCloseButton"
          type="button"
          onclick="closePokemonDetails()">
          ✕
        </button>
      </div>

      <div class="pokemonDialogContent">
        <div class="statusCard dialogStatusCard">
          <p>${message}</p>
        </div>
      </div>
    </article>
  `;
}