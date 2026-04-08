const pokemonApiBaseUrl = 'https://pokeapi.co/api/v2/pokemon';

/**
 * Loads the pokemon list with pagination.
 *
 * @param {number} limit - The number of pokemon to load.
 * @param {number} offset - The offset for pagination.
 * @returns {Promise<Array>} The loaded pokemon list.
 */
async function loadPokemonList(limit, offset) {
  try {
    const pokemonListUrl = `${pokemonApiBaseUrl}?limit=${limit}&offset=${offset}`;
    const response = await fetch(pokemonListUrl);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    handleFetchError(error);
    return [];
  }
}

/**
 * Loads all pokemon names for the global search.
 *
 * @returns {Promise<Array>} The loaded pokemon name list.
 */
async function loadAllPokemonNames() {
  try {
    const response = await fetch(`${pokemonApiBaseUrl}?limit=1025`);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    handleFetchError(error);
    return [];
  }
}

/**
 * Loads detailed data for multiple pokemon.
 *
 * @param {Array} pokemonList - The base pokemon list.
 * @returns {Promise<Array>} The detailed pokemon data list.
 */
async function loadDetailedPokemonList(pokemonList) {
  try {
    const detailPromises = pokemonList.map((pokemon) =>
      loadPokemonDetails(pokemon.url)
    );

    const detailedPokemonList = await Promise.all(detailPromises);

    return detailedPokemonList.filter((pokemon) => pokemon !== null);
  } catch (error) {
    handleFetchError(error);
    return [];
  }
}

/**
 * Loads the details of one pokemon.
 *
 * @param {string} pokemonUrl - The API url of the selected pokemon.
 * @returns {Promise<Object | null>} The pokemon details.
 */
async function loadPokemonDetails(pokemonUrl) {
  try {
    const response = await fetch(pokemonUrl);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    handleFetchError(error);
    return null;
  }
}

/**
 * Loads the details of one pokemon by id.
 *
 * @param {number} pokemonId - The id of the selected pokemon.
 * @returns {Promise<Object | null>} The pokemon details.
 */
async function loadPokemonDetailsById(pokemonId) {
  const pokemonDetailUrl = `${pokemonApiBaseUrl}/${pokemonId}`;

  return loadPokemonDetails(pokemonDetailUrl);
}

/**
 * Handles API fetch errors.
 *
 * @param {Error} error - The thrown fetch error.
 */
function handleFetchError(error) {
  console.error('Failed to load pokemon data:', error);
}