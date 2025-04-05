/**
 * Validate user input for conversion
 * @param {string} input - The user input to validate
 * @returns {object} Validation result with isValid flag and error message
 */
export function validateInput(input) {
  // Check if input is empty
  if (!input.trim()) {
    return { isValid: false, error: "Please enter a value" }
  }

  // Check if input is a valid number
  // Allow decimal points, negative signs, and scientific notation
  const numericRegex = /^-?\d*\.?\d+(?:[eE][-+]?\d+)?$/
  if (!numericRegex.test(input)) {
    return { isValid: false, error: "Please enter a valid number" }
  }

  // Check for reasonable limits (prevent overflow)
  const numValue = Number.parseFloat(input)
  if (numValue > Number.MAX_SAFE_INTEGER || numValue < Number.MIN_SAFE_INTEGER) {
    return { isValid: false, error: "Value is out of range" }
  }

  // Input is valid
  return { isValid: true }
}

