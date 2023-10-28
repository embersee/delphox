"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "../utils/classnames";
import { useSortStore } from "@/store/sort";

const frameworks = [
  {
    value: "ascending-name",
    label: "A-Z",
  },
  {
    value: "descending-name",
    label: "Z-A",
  },
  {
    value: "ascending-price",
    label: "$ ^",
  },
  {
    value: "descending-price",
    label: "$ V",
  },
];

export default function Sort() {
  const [open, setOpen] = React.useState(false);

  const { selectedSort, setSort } = useSortStore();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[100px] justify-between"
        >
          {selectedSort.value
            ? frameworks.find(
                (framework) => framework.value === selectedSort.value,
              )?.label
            : "Sort"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[100px] p-0">
        <Command>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setSort({
                    label:
                      currentValue === selectedSort.value ? "" : currentValue,
                    value:
                      currentValue === selectedSort.value ? "" : currentValue,
                  });
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedSort.value === framework.value
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
