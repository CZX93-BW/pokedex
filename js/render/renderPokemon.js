/* =========================
   Pokemon List Rendering
   ========================= */

/**
 * Renders the pokemon list into the DOM.
 *
 * @param {Array} pokemonList - The pokemon list to render.
 */
function renderPokemonList(pokemonList) {
  const pokemonListContainer = getElementById('pokemonList');

  if (!pokemonListContainer) {
    return;
  }

  clearPokemonStatus();
  clearPokemonList();

  const viewModels = pokemonList.map(createPokemonCardViewModel);
  renderPokemonListItems(viewModels, pokemonListContainer);
}

/**
 * Appends pokemon to the existing list.
 *
 * @param {Array} pokemonList - The pokemon list to append.
 */
function appendPokemonList(pokemonList) {
  const pokemonListContainer = getElementById('pokemonList');

  if (!pokemonListContainer) {
    return;
  }

  const viewModels = pokemonList.map(createPokemonCardViewModel);
  renderPokemonListItems(viewModels, pokemonListContainer);
}

/**
 * Renders all pokemon list items.
 *
 * @param {Array} viewModels - The prepared pokemon view models.
 * @param {HTMLElement} container - The target container.
 */
function renderPokemonListItems(viewModels, container) {
  viewModels.forEach((pokemon) => {
    container.innerHTML += getPokemonCardTemplate(pokemon);
  });
}

/* =========================
   Dialog Rendering
   ========================= */

/**
 * Renders the pokemon detail dialog.
 *
 * @param {Object} pokemonDetails - The pokemon detail data.
 */
function renderPokemonDetails(pokemonDetails) {
  const pokemonDialog = getElementById('pokemonDialog');
  const pokemonDialogOverlay = getElementById('pokemonDialogOverlay');

  if (!pokemonDialog || !pokemonDialogOverlay || !pokemonDetails) {
    return;
  }

  const viewModel = createPokemonDetailViewModel(pokemonDetails);

  pokemonDialog.innerHTML = getPokemonDetailTemplate(viewModel);
  pokemonDialogOverlay.classList.remove('hidden');
  setBodyScrollLock(true);
}

/**
 * Renders dialog loading state.
 */
function renderDialogLoadingState() {
  const pokemonDialog = getElementById('pokemonDialog');
  const pokemonDialogOverlay = getElementById('pokemonDialogOverlay');

  if (!pokemonDialog || !pokemonDialogOverlay) {
    return;
  }

  pokemonDialog.innerHTML = getDialogLoadingTemplate();
  pokemonDialogOverlay.classList.remove('hidden');
  setBodyScrollLock(true);
}

/**
 * Renders dialog error state.
 *
 * @param {string} message - The error message.
 */
function renderDialogErrorState(message) {
  const pokemonDialog = getElementById('pokemonDialog');
  const pokemonDialogOverlay = getElementById('pokemonDialogOverlay');

  if (!pokemonDialog || !pokemonDialogOverlay) {
    return;
  }

  pokemonDialog.innerHTML = getDialogErrorTemplate(message);
  pokemonDialogOverlay.classList.remove('hidden');
  setBodyScrollLock(true);
}

/**
 * Closes the pokemon dialog.
 */
function closePokemonDetails() {
  const pokemonDialog = getElementById('pokemonDialog');
  const pokemonDialogOverlay = getElementById('pokemonDialogOverlay');

  if (!pokemonDialog || !pokemonDialogOverlay) {
    return;
  }

  pokemonDialog.innerHTML = '';
  pokemonDialogOverlay.classList.add('hidden');
  setBodyScrollLock(false);
}

/**
 * Prevents dialog close when clicking inside.
 *
 * @param {Event} event - The click event.
 */
function stopDialogClose(event) {
  event.stopPropagation();
}

/**
 * Toggles body scroll lock.
 *
 * @param {boolean} isLocked - The lock state.
 */
function setBodyScrollLock(isLocked) {
  document.body.classList.toggle('dialogOpen', isLocked);
}

/* =========================
   Status Rendering
   ========================= */

/**
 * Renders loading state.
 */
function renderLoadingState() {
  const status = getElementById('pokemonStatus');

  if (!status) {
    return;
  }

  clearPokemonList();
  status.innerHTML = getLoadingTemplate();
}

/**
 * Renders error message.
 *
 * @param {string} message - The error message.
 */
function renderErrorMessage(message) {
  const status = getElementById('pokemonStatus');

  if (!status) {
    return;
  }

  clearPokemonList();
  status.innerHTML = getErrorTemplate(message);
}

/**
 * Renders no search results state.
 */
function renderNoSearchResults() {
  const status = getElementById('pokemonStatus');

  if (!status) {
    return;
  }

  clearPokemonList();
  status.innerHTML = getNoSearchResultsTemplate();
}

/* =========================
   Load More Rendering
   ========================= */

/**
 * Shows loading spinner for load more.
 */
function showLoadMoreLoading() {
  const wrapper = getElementById('loadMoreWrapper');

  if (!wrapper) {
    return;
  }

  wrapper.innerHTML = getLoadMoreLoadingTemplate();
  wrapper.classList.remove('hidden');
}

/**
 * Restores load more button.
 */
function hideLoadMoreLoading() {
  const wrapper = getElementById('loadMoreWrapper');

  if (!wrapper) {
    return;
  }

  wrapper.innerHTML = `
    <button onclick="loadMorePokemon()" class="loadMoreButton">
      Mehr laden
    </button>
  `;
}

/**
 * Shows load more button.
 */
function showLoadMoreButton() {
  const wrapper = getElementById('loadMoreWrapper');

  if (!wrapper) {
    return;
  }

  wrapper.classList.remove('hidden');
}

/**
 * Hides load more button.
 */
function hideLoadMoreButton() {
  const wrapper = getElementById('loadMoreWrapper');

  if (!wrapper) {
    return;
  }

  wrapper.classList.add('hidden');
}

/**
 * Updates load more visibility.
 */
function updateLoadMoreVisibility() {
  if (isSearchActive) {
    hideLoadMoreButton();
    return;
  }

  if (hasLoadedAllPokemon()) {
    hideLoadMoreButton();
    return;
  }

  showLoadMoreButton();
}

/* =========================
   Clearing Helpers
   ========================= */

/**
 * Clears pokemon list.
 */
function clearPokemonList() {
  const container = getElementById('pokemonList');

  if (!container) {
    return;
  }

  container.innerHTML = '';
}

/**
 * Clears pokemon status.
 */
function clearPokemonStatus() {
  const status = getElementById('pokemonStatus');

  if (!status) {
    return;
  }

  status.innerHTML = '';
}

/* =========================
   View Models
   ========================= */

/**
 * Creates view model for pokemon card.
 *
 * @param {Object} pokemon - The pokemon data object.
 * @returns {Object} The prepared pokemon card view model.
 */
function createPokemonCardViewModel(pokemon) {
  const mainType = pokemon.types[0].type.name;

  return {
    id: pokemon.id,
    name: capitalizeFirstLetter(pokemon.name),
    image: pokemon.sprites.front_default,
    typesHtml: createTypesHtml(pokemon.types),
    typeClass: `type-${mainType}`
  };
}

/**
 * Creates view model for pokemon detail dialog.
 *
 * @param {Object} pokemon - The pokemon detail object.
 * @returns {Object} The prepared pokemon detail view model.
 */
function createPokemonDetailViewModel(pokemon) {
  return {
    id: pokemon.id,
    name: capitalizeFirstLetter(pokemon.name),
    image: pokemon.sprites.front_default,
    typesHtml: createTypesHtml(pokemon.types),
    height: formatPokemonHeight(pokemon.height),
    weight: formatPokemonWeight(pokemon.weight),
    abilitiesHtml: createAbilitiesHtml(pokemon.abilities),
    statsHtml: createStatsHtml(pokemon.stats),
    previousButton: createPreviousButton(),
    nextButton: createNextButton(),
  };
}

/* =========================
   HTML Generators
   ========================= */

/**
 * Creates the html string for pokemon type badges.
 *
 * @param {Array} types - The pokemon types.
 * @returns {string} The prepared html string.
 */
function createTypesHtml(types) {
  return types.map((type) => {
    return `
      <span class="pokemonTypeBadge type-${type.type.name}">
        ${capitalizeFirstLetter(type.type.name)}
      </span>
    `;
  }).join('');
}

/**
 * Creates the html string for pokemon abilities.
 *
 * @param {Array} abilities - The pokemon abilities.
 * @returns {string} The prepared html string.
 */
function createAbilitiesHtml(abilities) {
  return abilities.map((entry) => {
    return `
      <span class="pokemonDialogTag">
        ${formatPokemonLabel(entry.ability.name)}
      </span>
    `;
  }).join('');
}

/**
 * Creates the html string for pokemon stats.
 *
 * @param {Array} stats - The pokemon stats.
 * @returns {string} The prepared html string.
 */
function createStatsHtml(stats) {
  return stats.map((stat) => {
    return `
      <div class="pokemonStatItem">
        <span>${formatPokemonStatName(stat.stat.name)}</span>
        <span>${stat.base_stat}</span>
      </div>
    `;
  }).join('');
}

/**
 * Creates the previous navigation button html.
 *
 * @returns {string} The prepared html string.
 */
function createPreviousButton() {
  if (isFirstPokemonInCurrentList()) {
    return `
      <button class="pokemonDialogNavButton disabled" disabled>
        ←
      </button>
    `;
  }

  return `
    <button class="pokemonDialogNavButton" onclick="showPreviousPokemon()">
      ←
    </button>
  `;
}

/**
 * Creates the next navigation button html.
 *
 * @returns {string} The prepared html string.
 */
function createNextButton() {
  if (isLastPokemonInCurrentList()) {
    return `
      <button class="pokemonDialogNavButton disabled" disabled>
        →
      </button>
    `;
  }

  return `
    <button class="pokemonDialogNavButton" onclick="showNextPokemon()">
      →
    </button>
  `;
}

/**
 * Checks whether the current pokemon is the first one in the active list.
 *
 * @returns {boolean} True if the current pokemon is the first one.
 */
function isFirstPokemonInCurrentList() {
  return currentPokemonIndex <= 0;
}

/**
 * Checks whether the current pokemon is the last one in the active list.
 *
 * @returns {boolean} True if the current pokemon is the last one.
 */
function isLastPokemonInCurrentList() {
  return currentPokemonIndex >= currentPokemonList.length - 1;
}