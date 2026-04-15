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

function renderPokemonDetails(pokemonDetails) {
  const pokemonDialog = getElementById('pokemonDialog');
  const pokemonDialogOverlay = getElementById('pokemonDialogOverlay');

  if (!pokemonDialog || !pokemonDialogOverlay || !pokemonDetails) {
    return;
  }

  window.currentPokemonDetails = createPokemonDetailViewModel(pokemonDetails);

  pokemonDialog.innerHTML = getPokemonDetailTemplate(window.currentPokemonDetails);
  pokemonDialogOverlay.classList.remove('hidden');
  setBodyScrollLock(true);
}

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

function stopDialogClose(event) {
  event.stopPropagation();
}

function setBodyScrollLock(isLocked) {
  document.body.classList.toggle('dialogOpen', isLocked);
}

/* =========================
   Helpers
   ========================= */

function clearPokemonList() {
  const container = getElementById('pokemonList');
  if (container) container.innerHTML = '';
}

function clearPokemonStatus() {
  const status = getElementById('pokemonStatus');
  if (status) status.innerHTML = '';
}

/* =========================
   View Models
   ========================= */

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
   Navigation Buttons FIXED
   ========================= */

function createPreviousButton() {
  if (isFirstPokemonInCurrentList()) {
    return `
      <button class="pokemonDialogNavButton navLeft disabled" disabled>
        ←
      </button>
    `;
  }

  return `
    <button class="pokemonDialogNavButton navLeft" onclick="showPreviousPokemon()">
      ←
    </button>
  `;
}

function createNextButton() {
  if (isLastPokemonInCurrentList()) {
    return `
      <button class="pokemonDialogNavButton navRight disabled" disabled>
        →
      </button>
    `;
  }

  return `
    <button class="pokemonDialogNavButton navRight" onclick="showNextPokemon()">
      →
    </button>
  `;
}

function isFirstPokemonInCurrentList() {
  return currentPokemonIndex <= 0;
}

function isLastPokemonInCurrentList() {
  return currentPokemonIndex >= currentPokemonList.length - 1;
}

/* =========================
   HTML Generators
   ========================= */

function createTypesHtml(types) {
  return types.map((type) => {
    return `
      <span class="pokemonTypeBadge type-${type.type.name}">
        ${capitalizeFirstLetter(type.type.name)}
      </span>
    `;
  }).join('');
}

function createAbilitiesHtml(abilities) {
  return abilities.map((entry) => {
    return `
      <span class="pokemonDialogTag">
        ${formatPokemonLabel(entry.ability.name)}
      </span>
    `;
  }).join('');
}

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