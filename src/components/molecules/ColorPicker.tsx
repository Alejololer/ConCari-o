"use client";
import { useState } from "react";
import { FieldLabel, Input } from "@/components/atoms/Field";

export function ColorPicker({
  label,
  name,
  defaultValue = "#FBEAE6",
}: {
  label: string;
  name: string;
  defaultValue?: string;
}) {
  const [color, setColor] = useState(defaultValue);

  return (
    <div className="flex flex-col gap-1">
      <FieldLabel>{label}</FieldLabel>
      <div className="flex items-center gap-2.5">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="h-[42px] w-[46px] cursor-pointer rounded-[11px] border border-line-strong bg-cream p-1 shadow-sm transition-transform hover:scale-105 active:scale-95"
        />
        <Input
          name={name}
          value={color}
          onChange={(e) => setColor(e.target.value)}
          required
          placeholder="#HEX"
          className="flex-1 font-mono text-[13.5px]"
        />
      </div>
    </div>
  );
}
