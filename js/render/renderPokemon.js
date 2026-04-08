function renderPokemonList(pokemonList) {
  const container = getElementById('pokemonList');
  if (!container) return;

  clearPokemonStatus();
  clearPokemonList();

  renderPokemonListItems(pokemonList, container);
}

function appendPokemonList(pokemonList) {
  const container = getElementById('pokemonList');
  if (!container) return;

  renderPokemonListItems(pokemonList, container);
}

function renderPokemonListItems(pokemonList, container) {
  pokemonList.forEach((pokemon) => {
    container.innerHTML += getPokemonCardTemplate(pokemon);
  });
}

function renderPokemonDetails(pokemonDetails) {
  const dialog = getElementById('pokemonDialog');
  const overlay = getElementById('pokemonDialogOverlay');

  if (!dialog || !overlay || !pokemonDetails) return;

  dialog.innerHTML = getPokemonDetailTemplate(pokemonDetails);
  overlay.classList.remove('hidden');
  setBodyScrollLock(true);
}

function renderLoadingState() {
  const status = getElementById('pokemonStatus');
  if (!status) return;

  clearPokemonList();
  status.innerHTML = getLoadingTemplate();
}

function renderErrorMessage(message) {
  const status = getElementById('pokemonStatus');
  if (!status) return;

  clearPokemonList();
  status.innerHTML = getErrorTemplate(message);
}

function renderNoSearchResults() {
  const status = getElementById('pokemonStatus');
  if (!status) return;

  clearPokemonList();
  status.innerHTML = getNoSearchResultsTemplate();
}

function renderDialogLoadingState() {
  const dialog = getElementById('pokemonDialog');
  const overlay = getElementById('pokemonDialogOverlay');

  if (!dialog || !overlay) return;

  dialog.innerHTML = getDialogLoadingTemplate();
  overlay.classList.remove('hidden');
  setBodyScrollLock(true);
}

function renderDialogErrorState(message) {
  const dialog = getElementById('pokemonDialog');
  const overlay = getElementById('pokemonDialogOverlay');

  if (!dialog || !overlay) return;

  dialog.innerHTML = getDialogErrorTemplate(message);
  overlay.classList.remove('hidden');
}

function clearPokemonList() {
  const container = getElementById('pokemonList');
  if (container) container.innerHTML = '';
}

function clearPokemonStatus() {
  const status = getElementById('pokemonStatus');
  if (status) status.innerHTML = '';
}

function closePokemonDetails() {
  const dialog = getElementById('pokemonDialog');
  const overlay = getElementById('pokemonDialogOverlay');

  if (!dialog || !overlay) return;

  dialog.innerHTML = '';
  overlay.classList.add('hidden');
  setBodyScrollLock(false);
}

function setBodyScrollLock(isLocked) {
  document.body.classList.toggle('dialogOpen', isLocked);
}

/* =========================
   Load More Loading
   ========================= */

function showLoadMoreLoading() {
  const wrapper = getElementById('loadMoreWrapper');
  if (!wrapper) return;

  wrapper.innerHTML = getLoadMoreLoadingTemplate();
}

function hideLoadMoreLoading() {
  const wrapper = getElementById('loadMoreWrapper');
  if (!wrapper) return;

  wrapper.innerHTML = `
    <button class="loadMoreButton" onclick="loadMorePokemon()">
      Mehr laden
    </button>
  `;
}

function showLoadMoreButton() {
  const wrapper = getElementById('loadMoreWrapper');
  if (wrapper) wrapper.classList.remove('hidden');
}

function hideLoadMoreButton() {
  const wrapper = getElementById('loadMoreWrapper');
  if (wrapper) wrapper.classList.add('hidden');
}

function updateLoadMoreVisibility() {
  if (hasLoadedAllPokemon()) {
    hideLoadMoreButton();
  } else {
    showLoadMoreButton();
  }
}