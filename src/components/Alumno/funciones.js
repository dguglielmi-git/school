export function notNulls(value) {
  return value === null || value === undefined ? "" : value;
}
