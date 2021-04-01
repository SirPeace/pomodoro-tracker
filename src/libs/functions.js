const getDaysDiff = require("date-fns/differenceInCalendarDays")

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

/**
 * Throw native notification, using Web Notification API
 * @param {string} title Notification title
 * @param {string} body Notification body
 */
export function throwNotification(title, body) {
  if (window.Notification.permission === "granted") {
    navigator.serviceWorker.ready.then(function (registration) {
      registration.showNotification(title, {
        icon: "/icons/favicon-120.png",
        body: body,
      })

      new Audio("/notification.mp3").play()
    })
  }
}

/**
 * Check if today is a new day compared to the timestamp
 * @param {number} timestamp Timestamp of the day to compare with
 * @return {boolean}
 */
export function isNewDay(timestamp) {
  return getDaysDiff(new Date(), new Date(timestamp)) >= 1
}

/**
 * Check if today is a new day compared to the timestamp
 * @param {number} timestamp Timestamp of the day to compare with
 * @return {boolean}
 */
export function twoDaysPassed(timestamp) {
  return getDaysDiff(new Date(), new Date(timestamp)) >= 2
}
