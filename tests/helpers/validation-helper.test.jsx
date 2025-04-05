import { describe, it, expect } from "vitest"
import { validateInput } from "@/helpers/validation-helper"

describe("Validation Helpers", () => {
  describe("validateInput", () => {
    it("should validate valid integer inputs", () => {
      const result = validateInput("123")
      expect(result.isValid).toBe(true)
      expect(result.error).toBeUndefined()
    })

    it("should validate valid decimal inputs", () => {
      const result = validateInput("123.45")
      expect(result.isValid).toBe(true)
      expect(result.error).toBeUndefined()
    })

    it("should validate valid negative inputs", () => {
      const result = validateInput("-123.45")
      expect(result.isValid).toBe(true)
      expect(result.error).toBeUndefined()
    })

    it("should validate valid scientific notation inputs", () => {
      const result = validateInput("1.23e-4")
      expect(result.isValid).toBe(true)
      expect(result.error).toBeUndefined()
    })

    it("should reject empty inputs", () => {
      const result = validateInput("")
      expect(result.isValid).toBe(false)
      expect(result.error).toBe("Please enter a value")
    })

    it("should reject whitespace-only inputs", () => {
      const result = validateInput("   ")
      expect(result.isValid).toBe(false)
      expect(result.error).toBe("Please enter a value")
    })

    it("should reject text inputs", () => {
      const result = validateInput("abc")
      expect(result.isValid).toBe(false)
      expect(result.error).toBe("Please enter a valid number")
    })

    it("should reject mixed text and number inputs", () => {
      const result = validateInput("123abc")
      expect(result.isValid).toBe(false)
      expect(result.error).toBe("Please enter a valid number")
    })
  })
})

