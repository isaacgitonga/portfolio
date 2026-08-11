import {useEffect, useRef, useState} from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  placeholder: string;
  options: SelectOption[];
  value: string;
  onChange: (val: string) => void;
  error?: string;
}

export default function CustomSelect({ placeholder, options, value, onChange, error }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full bg-surface border rounded-lg p-4 text-left text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all font-nunito flex items-center justify-between cursor-pointer ${
          error ? "focus:ring-red-500/20 focus:border-red-500" : "border-surface-border"
        }`}
      >
        <span className={`truncate ${selectedOption ? "text-foreground font-medium" : "text-muted-dark"}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`size-4 text-muted transition-transform duration-250 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <ul
        role="listbox"
        aria-hidden={!isOpen}
        className={`
        absolute z-50 w-full h-75 mt-2 bg-surface/95 border border-surface-border rounded-lg shadow-2xl backdrop-blur-md overflow-hidden overflow-y-auto font-nunito transition-all duration-200 ease-out origin-top 
        ${ isOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
        }`}
      >
        {options.map((opt) => {
          const isSelected = opt.value === value;

          return (
            <li
              key={opt.value}
              role="option"
              aria-selected={isSelected}
              onClick={() => handleSelect(opt.value)}
              className={`px-4 py-3 cursor-pointer text-sm transition-colors flex items-center justify-between ${
                isSelected
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted hover:bg-surface-hover hover:text-foreground"
              }`}
            >
              <span>{opt.label}</span>
              {isSelected && (
                <svg className="size-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
