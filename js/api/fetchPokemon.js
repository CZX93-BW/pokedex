const pokemonApiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20';

/**
 * Loads the pokemon list from the API.
 *
 * @returns {Promise<Array>} 
 */
async function loadPokemonList() {
  try {
    const response = await fetch(pokemonApiUrl);
    const data = await response.json();

    return data.results;
  } catch (error) {
    handleFetchError(error);
    return [];
  }
}

/**
 * Loads the details of one pokemon.
 *
 * @param {string} pokemonUrl 
 * @returns {Promise<Object | null>} 
 */
async function loadPokemonDetails(pokemonUrl) {
  try {
    const response = await fetch(pokemonUrl);
    const data = await response.json();

    return data;
  } catch (error) {
    handleFetchError(error);
    return null;
  }
}

/**
 * Handles API fetch errors.
 *
 * @param {Error} error 
 */
function handleFetchError(error) {
  console.error('Failed to load pokemon data:', error);
}

/**
 * Loads detailed data for multiple pokemon.
 *
 * @param {Array} pokemonList 
 * @returns {Promise<Array>} 
 */
async function loadDetailedPokemonList(pokemonList) {
  try {
    const detailPromises = pokemonList.map((pokemon) =>
      loadPokemonDetails(pokemon.url)
    );

    return await Promise.all(detailPromises);
  } catch (error) {
    handleFetchError(error);
    return [];
  }
}