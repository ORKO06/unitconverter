"use client";
import { useState, useEffect, useMemo, useCallback, memo } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import { RotateCcw, ArrowRightLeft } from "lucide-react";
import { getCategoryUnits } from "../constants/unit-constants";
import { convertValue } from "../helpers/conversion-helper";
import { validateInput } from "../helpers/validation-helper";
import {
  loadUserPreferences,
  saveUserPreferences,
} from "../helpers/storage-helper";

/**
 * Reusable converter form component that handles unit conversion for any category
 * @param {string} category - The category ID (length, weight, temperature, etc.)
 */
const ConverterForm = ({ category }) => {
  // Get the units for this category
  const units = useMemo(() => getCategoryUnits(category), [category]);

  // Initialize state from localStorage or defaults
  const [fromUnit, setFromUnit] = useState(() => {
    const savedPreferences = loadUserPreferences();
    return savedPreferences?.[category]?.fromUnit || Object.keys(units)[0];
  });

  const [toUnit, setToUnit] = useState(() => {
    const savedPreferences = loadUserPreferences();
    return savedPreferences?.[category]?.toUnit || Object.keys(units)[1];
  });

  const [fromValue, setFromValue] = useState(() => {
    const savedPreferences = loadUserPreferences();
    return savedPreferences?.[category]?.fromValue || "";
  });

  const [toValue, setToValue] = useState("");
  const [error, setError] = useState("");

  // Perform conversion when inputs change
  useEffect(() => {
    // Skip conversion if input is empty
    if (fromValue === "") {
      setToValue("");
      setError("");
      return;
    }

    // Validate the input
    const validationResult = validateInput(fromValue);
    if (!validationResult.isValid) {
      setError(validationResult.error || "Invalid input");
      setToValue("");
      return;
    }

    // Clear any previous errors
    setError("");

    // Convert the value
    const numValue = Number.parseFloat(fromValue);
    const result = convertValue(numValue, fromUnit, toUnit, category);

    // Format the result to remove unnecessary trailing zeros
    setToValue(result.toFixed(6).replace(/\.?0+$/, ""));

    // Save preferences to localStorage
    saveUserPreferences({
      category,
      [category]: {
        fromUnit,
        toUnit,
        fromValue,
      },
    });
  }, [fromValue, fromUnit, toUnit, category]);

  // Handle input change
  const handleFromValueChange = useCallback((e) => {
    setFromValue(e.target.value);
  }, []);

  // Handle unit changes
  const handleFromUnitChange = useCallback((value) => {
    setFromUnit(value);
  }, []);

  const handleToUnitChange = useCallback((value) => {
    setToUnit(value);
  }, []);

  // Reset the form
  const handleReset = useCallback(() => {
    setFromValue("");
    setToValue("");
    setError("");
  }, []);

  // Swap the units and values
  const handleSwap = useCallback(() => {
    // Only swap if we have a valid conversion
    if (toValue && !error) {
      setFromUnit(toUnit);
      setToUnit(fromUnit);
      setFromValue(toValue);
    } else {
      // Just swap the units
      setFromUnit(toUnit);
      setToUnit(fromUnit);
    }
  }, [fromUnit, toUnit, fromValue, toValue, error]);

  // Memoize the unit options to prevent unnecessary re-renders
  const unitOptions = useMemo(() => {
    return Object.entries(units).map(([key, { name }]) => (
      <SelectItem key={key} value={key}>
        {name}
      </SelectItem>
    ));
  }, [units]);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label htmlFor="fromValue" className="text-sm font-medium">
            From
          </Label>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSwap}
              title="Swap units"
              className="h-8 px-2"
            >
              <ArrowRightLeft className="h-4 w-4" />
              <span className="sr-only">Swap</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              title="Reset values"
              className="h-8 px-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="sr-only">Reset</span>
            </Button>
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="flex-1">
            <Input
              id="fromValue"
              type="text"
              inputMode="decimal"
              value={fromValue}
              onChange={handleFromValueChange}
              placeholder="Enter value"
              className={`${
                error ? "border-red-500 focus-visible:ring-red-500" : ""
              } transition-all`}
              aria-invalid={error ? "true" : "false"}
              aria-describedby={error ? "input-error" : undefined}
            />
            {error && (
              <p
                id="input-error"
                className="text-red-500 text-xs mt-1 animate-fadeIn"
              >
                {error}
              </p>
            )}
          </div>
          <Select value={fromUnit} onValueChange={handleFromUnitChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>{unitOptions}</SelectContent>
          </Select>
        </div>
      </div>
      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white dark:bg-slate-800 px-2 text-xs text-slate-500">
            RESULT
          </span>
        </div>
      </div>
      <div className="space-y-3">
        <Label htmlFor="toValue" className="text-sm font-medium">
          To
        </Label>
        <div className="flex space-x-2">
          <div className="flex-1">
            <Input
              id="toValue"
              type="text"
              value={toValue}
              readOnly
              className="bg-slate-50 dark:bg-slate-800 font-medium"
            />
          </div>
          <Select value={toUnit} onValueChange={handleToUnitChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>{unitOptions}</SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(ConverterForm);
