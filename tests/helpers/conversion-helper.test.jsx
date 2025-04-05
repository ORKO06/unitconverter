import { describe, it, expect } from "vitest"
import { convertValue, convertWithFactor, convertTemperature } from "@/helpers/conversion-helper"

describe("Conversion Helpers", () => {
  describe("convertWithFactor", () => {
    it("should convert meters to centimeters correctly", () => {
      const units = {
        meter: { factor: 1 },
        centimeter: { factor: 0.01 },
      }

      const result = convertWithFactor(5, "meter", "centimeter", units)
      expect(result).toBe(500)
    })

    it("should convert centimeters to meters correctly", () => {
      const units = {
        meter: { factor: 1 },
        centimeter: { factor: 0.01 },
      }

      const result = convertWithFactor(250, "centimeter", "meter", units)
      expect(result).toBe(2.5)
    })
  })

  describe("convertTemperature", () => {
    it("should convert Celsius to Fahrenheit correctly", () => {
      const result = convertTemperature(100, "celsius", "fahrenheit")
      expect(result).toBe(212)
    })

    it("should convert Fahrenheit to Celsius correctly", () => {
      const result = convertTemperature(32, "fahrenheit", "celsius")
      expect(result).toBe(0)
    })

    it("should convert Celsius to Kelvin correctly", () => {
      const result = convertTemperature(0, "celsius", "kelvin")
      expect(result).toBe(273.15)
    })

    it("should convert Kelvin to Celsius correctly", () => {
      const result = convertTemperature(273.15, "kelvin", "celsius")
      expect(result).toBe(0)
    })

    it("should convert Fahrenheit to Kelvin correctly", () => {
      const result = convertTemperature(32, "fahrenheit", "kelvin")
      expect(result).toBe(273.15)
    })

    it("should convert Kelvin to Fahrenheit correctly", () => {
      const result = convertTemperature(273.15, "kelvin", "fahrenheit")
      expect(result).toBe(32)
    })
  })

  describe("convertValue", () => {
    it("should convert length units correctly", () => {
      const result = convertValue(1, "meter", "centimeter", "length")
      expect(result).toBe(100)
    })

    it("should convert weight units correctly", () => {
      const result = convertValue(1, "kilogram", "gram", "weight")
      expect(result).toBe(1000)
    })

    it("should convert temperature units correctly", () => {
      const result = convertValue(0, "celsius", "fahrenheit", "temperature")
      expect(result).toBe(32)
    })

    it("should convert volume units correctly", () => {
      const result = convertValue(1, "liter", "milliliter", "volume")
      expect(result).toBe(1000)
    })
  })
})

