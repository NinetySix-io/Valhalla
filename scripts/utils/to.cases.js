const toCamelCase = require("lodash.camelcase");

/**
 * Capitalize first letter of string
 * @param {string} str
 * @returns {string}
 */
function capitalize(str) {
  return str[0].toUpperCase() + str.substring(1);
}

module.exports = {
  capitalize,
  toCamelCase,
};
