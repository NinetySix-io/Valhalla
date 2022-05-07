/**
 * String to camel case
 * @param {string} str
 * @returns {string}
 */
function toCamelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/[^a-zA-Z ]/g, "")
    .replace(/\s+/g, "");
}

/**
 * Capitalize first letter of string
 * @param {string} str
 * @returns {string}
 */
function capitalize(str) {
  return str[0].toUpperCase() + str.substring(1);
}

module.exports = {
  toCamelCase,
  capitalize,
};
