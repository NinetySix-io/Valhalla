const toCamelCase = require("lodash.camelcase");

/**
 * Capitalize first letter of string
 */
function capitalize(str) {
  return str[0].toUpperCase() + str.substring(1);
}

module.exports = {
  capitalize,
  toCamelCase,
};
