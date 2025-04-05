/**
 * Storage key for user preferences in localStorage
 */
const STORAGE_KEY = "unit-converter-preferences";

/**
 * Load user preferences from localStorage
 * @returns {UserPreferences|null} The saved preferences or null if none exist
 */
export function loadUserPreferences() {
  if (typeof window === "undefined") {
    return null
  }

  try {
    const savedPreferences = localStorage.getItem(STORAGE_KEY)
    return savedPreferences ? JSON.parse(savedPreferences) : null;
  } catch (error) {
    console.error("Error loading preferences from localStorage:", error)
    return null
  }
}

/**
 * Save user preferences to localStorage
 * @param {UserPreferences} preferences - The preferences to save
 */
export function saveUserPreferences(preferences) {
  if (typeof window === "undefined") {
    return
  }

  try {
    // Get existing preferences
    const existingPreferences = loadUserPreferences() || {}

    // Merge with new preferences
    const updatedPreferences = { ...existingPreferences, ...preferences }

    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPreferences))
  } catch (error) {
    console.error("Error saving preferences to localStorage:", error)
  }
}

/**
 * Clear all user preferences from localStorage
 */
export function clearUserPreferences() {
  if (typeof window === "undefined") {
    return
  }

  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error("Error clearing preferences from localStorage:", error)
  }
}

