import { LENGTH_UNITS, WEIGHT_UNITS, VOLUME_UNITS } from "../constants/unit-constants"

/**
 * Convert a value from one unit to another
 * @param {number} value - The value to convert
 * @param {string} fromUnit - The source unit
 * @param {string} toUnit - The target unit
 * @param {string} category - The category of units
 * @returns {number} The converted value
 */
export function convertValue(value: number, fromUnit: string, toUnit: string, category: string): number {
  switch (category) {
    case "length":
      return convertWithFactor(value, fromUnit, toUnit, LENGTH_UNITS)
    case "weight":
      return convertWithFactor(value, fromUnit, toUnit, WEIGHT_UNITS)
    case "temperature":
      return convertTemperature(value, fromUnit, toUnit)
    case "volume":
      return convertWithFactor(value, fromUnit, toUnit, VOLUME_UNITS)
    default:
      return value
  }
}

/**
 * Convert a value using conversion factors
 * @param {number} value - The value to convert
 * @param {string} fromUnit - The source unit
 * @param {string} toUnit - The target unit
 * @param {object} units - The units object with conversion factors
 * @returns {number} The converted value
 */
export function convertWithFactor(
  value: number,
  fromUnit: string,
  toUnit: string,
  units: Record<string, { factor: number }>,
): number {
  const fromFactor = units[fromUnit as keyof typeof units].factor
  const toFactor = units[toUnit as keyof typeof units].factor
  return (value * fromFactor) / toFactor
}

/**
 * Convert a temperature value from one unit to another
 * @param {number} value - The temperature value to convert
 * @param {string} fromUnit - The source temperature unit
 * @param {string} toUnit - The target temperature unit
 * @returns {number} The converted temperature value
 */
export function convertTemperature(value: number, fromUnit: string, toUnit: string): number {
  // First convert to Celsius as the intermediate unit
  let celsius: number

  switch (fromUnit) {
    case "celsius":
      celsius = value
      break
    case "fahrenheit":
      celsius = (value - 32) * (5 / 9)
      break
    case "kelvin":
      celsius = value - 273.15
      break
    default:
      celsius = value
  }

  // Then convert from Celsius to the target unit
  switch (toUnit) {
    case "celsius":
      return celsius
    case "fahrenheit":
      return celsius * (9 / 5) + 32
    case "kelvin":
      return celsius + 273.15
    default:
      return celsius
  }
}

