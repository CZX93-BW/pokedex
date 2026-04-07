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

/**
 * Formats a pokemon label.
 *
 * @param {string} value 
 * @returns {string} 
 */
function formatPokemonLabel(value) {
  const labelWithSpaces = value.replaceAll('-', ' ');

  return capitalizeFirstLetter(labelWithSpaces);
}

/**
 * Formats a pokemon stat name.
 *
 * @param {string} statName 
 * @returns {string} 
 */
function formatPokemonStatName(statName) {
  const statNameMap = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'Special Attack',
    'special-defense': 'Special Defense',
    speed: 'Speed',
  };

  return statNameMap[statName] || formatPokemonLabel(statName);
}

/**
 * Formats the pokemon height from decimeters to meters.
 *
 * @param {number} height 
 * @returns {number} 
 */
function formatPokemonHeight(height) {
  return height / 10;
}

/**
 * Formats the pokemon weight from hectograms to kilograms.
 *
 * @param {number} weight 
 * @returns {number}
 */
function formatPokemonWeight(weight) {
  return weight / 10;
}