/**
 * Get time string from given milliseconds
 * @param {number} value Value to convert into time string
 * @param {string} unit What unit to use for translation: milliseconds, seconds, minutes ("ms"|"s"|"m")
 * @returns {string | false} String of format "mm:ss"
 */
export function getTimeString(value, unit = "ms") {
  if (unit === "time") return value
  const ms = toMs(value, unit)

  let s = ms / 1000
  let m = Math.floor(s / 60)

  s -= m * 60

  if (m < 10) m = "0" + m
  if (s < 10) s = "0" + s

  return `${m}:${s}`
}

/**
 * Convert given unit to milliseconds
 * @param {number|string} value Value to be converted to ms
 * @param {string} unit What unit to use for translation: milliseconds, seconds, minutes or time string ("ms"|"s"|"m"|"time")
 * @returns {number|boolean} Milliseconds from given unit or false if translation unit is not supported
 */
export function toMs(value, unit) {
  if (unit === "m") return value * 60 * 1000
  if (unit === "s") return value * 1000
  if (unit === "ms") return value
  if (unit === "time") {
    let [m, s] = value.split(":", 2)
    m = m.startsWith("0") ? +m[1] : +m
    s = s.startsWith("0") ? +s[1] : +s
    return m * 60 * 1000 + s * 1000
  }
  return false
}
