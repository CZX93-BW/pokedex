const pokemonApiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20';

/**
 * Loads the pokemon list from the API.
 *
 * @returns {Promise<Array>} The loaded pokemon list.
 */
async function loadPokemonList() {
  try {
    const response = await fetch(pokemonApiUrl);
    const data = await response.json();

    return data.results;
  } catch (error) {
    console.error('Failed to load pokemon list:', error);
    return [];
  }
}