"use client";
import React from "react";
import { Input } from "./ui/input";

interface CurrencyInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
}

export function CurrencyInput({ label, value, onChange, placeholder }: CurrencyInputProps) {
  // format number for display
  const displayValue = value ? value.toLocaleString() : "";

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/,/g, "");
    const numeric = Number(raw);
    onChange(isNaN(numeric) ? 0 : numeric);
  }

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>
      <Input
        type="text"
        inputMode="numeric"
        className="w-full border rounded-md px-3 py-2 text-sm"
        placeholder={placeholder}
        value={displayValue}
        onChange={handleChange}
      />
    </div>
  );
}
