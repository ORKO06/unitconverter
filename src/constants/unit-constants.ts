/**
 * Categories of units available for conversion
 */
export const CATEGORIES = [
  { id: "length", label: "Length" },
  { id: "weight", label: "Weight" },
  { id: "temperature", label: "Temperature" },
  { id: "volume", label: "Volume" },
]

/**
 * Length units with their conversion factors relative to meters
 */
export const LENGTH_UNITS = {
  meter: { name: "Meter (m)", factor: 1 },
  kilometer: { name: "Kilometer (km)", factor: 1000 },
  centimeter: { name: "Centimeter (cm)", factor: 0.01 },
  millimeter: { name: "Millimeter (mm)", factor: 0.001 },
  inch: { name: "Inch (in)", factor: 0.0254 },
  foot: { name: "Foot (ft)", factor: 0.3048 },
  yard: { name: "Yard (yd)", factor: 0.9144 },
  mile: { name: "Mile (mi)", factor: 1609.34 },
}

/**
 * Weight units with their conversion factors relative to kilograms
 */
export const WEIGHT_UNITS = {
  kilogram: { name: "Kilogram (kg)", factor: 1 },
  gram: { name: "Gram (g)", factor: 0.001 },
  milligram: { name: "Milligram (mg)", factor: 0.000001 },
  pound: { name: "Pound (lb)", factor: 0.453592 },
  ounce: { name: "Ounce (oz)", factor: 0.0283495 },
  ton: { name: "Metric Ton (t)", factor: 1000 },
  stone: { name: "Stone (st)", factor: 6.35029 },
}

/**
 * Temperature units (no factors as conversion is non-linear)
 */
export const TEMPERATURE_UNITS = {
  celsius: { name: "Celsius (°C)" },
  fahrenheit: { name: "Fahrenheit (°F)" },
  kelvin: { name: "Kelvin (K)" },
}

/**
 * Volume units with their conversion factors relative to liters
 */
export const VOLUME_UNITS = {
  liter: { name: "Liter (L)", factor: 1 },
  milliliter: { name: "Milliliter (mL)", factor: 0.001 },
  cubicMeter: { name: "Cubic Meter (m³)", factor: 1000 },
  gallon: { name: "Gallon (gal)", factor: 3.78541 },
  quart: { name: "Quart (qt)", factor: 0.946353 },
  pint: { name: "Pint (pt)", factor: 0.473176 },
  cup: { name: "Cup (c)", factor: 0.24 },
  fluidOunce: { name: "Fluid Ounce (fl oz)", factor: 0.0295735 },
}

/**
 * Get the units for a specific category
 * @param {string} category - The category ID
 * @returns The units for the specified category
 */
export function getCategoryUnits(category: string) {
  switch (category) {
    case "length":
      return LENGTH_UNITS
    case "weight":
      return WEIGHT_UNITS
    case "temperature":
      return TEMPERATURE_UNITS
    case "volume":
      return VOLUME_UNITS
    default:
      return LENGTH_UNITS
  }
}

