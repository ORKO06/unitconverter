import { describe, it, expect, beforeEach, vi } from "vitest"
import { loadUserPreferences, saveUserPreferences, clearUserPreferences } from "@/helpers/storage-helper"

describe("Storage Helpers", () => {
  // Mock localStorage
  const localStorageMock = (() => {
    let store = {}

    return {
      getItem: vi.fn((key) => store[key] || null),
      setItem: vi.fn((key, value) => {
        store[key] = value.toString()
      }),
      removeItem: vi.fn((key) => {
        delete store[key]
      }),
      clear: vi.fn(() => {
        store = {}
      }),
    };
  })()

  // Replace global localStorage with mock
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
      writable: true,
    })

    // Clear mock calls between tests
    vi.clearAllMocks()
  })

  describe("saveUserPreferences", () => {
    it("should save preferences to localStorage", () => {
      const preferences = { category: "length", length: { fromUnit: "meter", toUnit: "centimeter" } }
      saveUserPreferences(preferences)

      expect(localStorageMock.setItem).toHaveBeenCalledTimes(1)
      expect(localStorageMock.setItem).toHaveBeenCalledWith("unit-converter-preferences", JSON.stringify(preferences))
    })

    it("should merge with existing preferences", () => {
      // Set initial preferences
      localStorageMock.setItem(
        "unit-converter-preferences",
        JSON.stringify({ category: "length", length: { fromUnit: "meter" } })
      )

      // Save new preferences
      saveUserPreferences({ length: { toUnit: "centimeter" } })

      // Check that preferences were merged
      expect(JSON.parse(localStorageMock.getItem("unit-converter-preferences"))).toEqual({
        category: "length",
        length: { fromUnit: "meter", toUnit: "centimeter" },
      })
    })
  })

  describe("loadUserPreferences", () => {
    it("should load preferences from localStorage", () => {
      const preferences = { category: "length", length: { fromUnit: "meter", toUnit: "centimeter" } }
      localStorageMock.setItem("unit-converter-preferences", JSON.stringify(preferences))

      const result = loadUserPreferences()

      expect(localStorageMock.getItem).toHaveBeenCalledTimes(1)
      expect(localStorageMock.getItem).toHaveBeenCalledWith("unit-converter-preferences")
      expect(result).toEqual(preferences)
    })

    it("should return null if no preferences exist", () => {
      const result = loadUserPreferences()

      expect(localStorageMock.getItem).toHaveBeenCalledTimes(1)
      expect(result).toBeNull()
    })
  })

  describe("clearUserPreferences", () => {
    it("should remove preferences from localStorage", () => {
      // Set initial preferences
      localStorageMock.setItem("unit-converter-preferences", JSON.stringify({ category: "length" }))

      clearUserPreferences()

      expect(localStorageMock.removeItem).toHaveBeenCalledTimes(1)
      expect(localStorageMock.removeItem).toHaveBeenCalledWith("unit-converter-preferences")
    })
  })
})

