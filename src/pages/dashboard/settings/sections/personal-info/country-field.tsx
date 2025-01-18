import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import countries from "~/data/countries.json";
import { cn } from "~/lib/utils";

const CountryField = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const selectedCountry =
    countries.find((item) => item.currency + item.name === value) || undefined;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex-1 justify-between"
        >
          {selectedCountry ? (
            <>
              <img src={selectedCountry.flag} className="max-w-5 w-full" />
              {selectedCountry.name}
            </>
          ) : (
            "Select Country..."
          )}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[400px] w-full p-0">
        <Command>
          <CommandInput placeholder="Search Country..." />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countries.map((item, index) => {
                if (!item.currency) return null;
                return (
                  <CommandItem
                    key={item.name}
                    value={item.currency + item.name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <img src={item.flag} className="max-w-5 w-full" />
                    {item.name}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === item.currency ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CountryField;
