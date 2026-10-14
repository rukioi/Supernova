"use client";

import { Children, isValidElement, useId, type ReactNode } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = {
  value: string;
  onChange: (event: { target: { value: string } }) => void;
  children: ReactNode;
  "aria-label"?: string;
};

export function AppSelect({ value, onChange, children, "aria-label": label }: Props) {
  const id = useId();
  const options = Children.toArray(children).flatMap((child) => {
    if (!isValidElement<{ value?: string; children: ReactNode }>(child)) return [];
    const text = Children.toArray(child.props.children).join("");
    return [{ value: child.props.value ?? text, text }];
  });
  const uniqueOptions = options.filter((option, index) => options.findIndex(item => item.value === option.value) === index);
  return <Select value={value} onValueChange={(next) => onChange({ target: { value: next } })}>
    <SelectTrigger id={id} className="app-select" aria-label={label}><SelectValue /></SelectTrigger>
    <SelectContent position="popper" align="start" sideOffset={6}>
      {uniqueOptions.map(option => <SelectItem key={option.value} value={option.value}>{option.text}</SelectItem>)}
    </SelectContent>
  </Select>;
}
