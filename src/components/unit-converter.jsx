"use client";

import { useState, useEffect, memo } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Card, CardContent } from "../components/ui/card";
import ConverterForm from "../components/converter-form";
import { CATEGORIES } from "../constants/unit-constants";
import {
  loadUserPreferences,
  saveUserPreferences,
} from "../helpers/storage-helper";

/**
 * Main Unit Converter component that manages tabs and user preferences
 * Handles loading and saving user preferences to localStorage
 */
const UnitConverter = () => {
  // State for the active tab/category
  const [activeTab, setActiveTab] = useState(() => {
    // Try to load the last active tab from localStorage, default to first category
    const savedPreferences = loadUserPreferences();
    return savedPreferences?.category || CATEGORIES[0].id;
  });

  // When the active tab changes, save it to localStorage
  useEffect(() => {
    saveUserPreferences({ category: activeTab });
  }, [activeTab]);

  return (
    <Tabs
      defaultValue={activeTab}
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList
        className="grid w-full"
        style={{ gridTemplateColumns: `repeat(${CATEGORIES.length}, 1fr)` }}
      >
        {CATEGORIES.map((category) => (
          <TabsTrigger key={category.id} value={category.id}>
            {category.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <Card className="mt-4 border-slate-200 dark:border-slate-700 shadow-md">
        <CardContent className="pt-6">
          {CATEGORIES.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <ConverterForm category={category.id} />
            </TabsContent>
          ))}
        </CardContent>
      </Card>
    </Tabs>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(UnitConverter);
