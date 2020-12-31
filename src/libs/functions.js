/**
 * @param {number} ms Milliseconds to convert into time string
 * @returns {string} String of format [mm:ss]
 */
export const getTimeFromMs = ms => {
  let s = ms / 1000;
  let m = Math.floor(s / 60);

  s -= m * 60;

  if (m < 10) m = "0" + m;
  if (s < 10) s = "0" + s;

  return `${m}:${s}`;
};
