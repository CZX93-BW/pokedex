const pokemonApiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20';

/**
 * Loads the pokemon list from the API.
 */
async function loadPokemonList() {
  try {
    const response = await fetch(pokemonApiUrl);
    const data = await response.json();

    console.log('Loaded pokemon list:', data);
  } catch (error) {
    console.error('Failed to load pokemon list:', error);
  }
}