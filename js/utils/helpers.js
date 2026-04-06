/**
 * Returns an element by id.
 *
 * @param {string} elementId 
 * @returns {HTMLElement | null} 
 */
function getElementById(elementId) {
  return document.getElementById(elementId);
}

/**
 * Capitalizes the first letter of a text.
 *
 * @param {string} text 
 * @returns {string} 
 */
function capitalizeFirstLetter(text) {
  if (!text) {
    return '';
  }

  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Extracts the pokemon id from an API url.
 *
 * @param {string} pokemonUrl 
 * @returns {string} 
 */
function extractPokemonIdFromUrl(pokemonUrl) {
  const urlParts = pokemonUrl.split('/');

  return urlParts[urlParts.length - 2];
}

/**
 * Checks if a value is an empty string.
 *
 * @param {string} value 
 * @returns {boolean} 
 */
function isEmptyString(value) {
  return value.trim() === '';
}