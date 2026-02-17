"use client";

import { useState, useRef, useEffect } from "react";

type Option = {
  value: string;
  label: string;
};

type Props = {
  placeholder: string;
  options: Option[];
  onChange: (value: string) => void;
};

export default function CustomSelect({
  placeholder,
  options,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(option: Option) {
    setSelected(option);
    onChange(option.value);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative w-full">
      {/* BUTTON */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          w-full
          text-left
          px-4
          py-3
          rounded-xl
          bg-white/10
          backdrop-blur-lg
          border border-white/15
          hover:bg-white/20
          transition
        "
      >
        {selected ? selected.label : placeholder}
      </button>

      {/* DROPDOWN */}
		{open && (
		<div
			className="
			absolute
			left-0
			top-full
			mt-2
			w-full
			rounded-xl
			bg-white/10
			backdrop-blur-xl
			border border-white/15
			shadow-2xl
			overflow-hidden
			animate-fade-in
			z-50
			"
		>
			{options.map((option) => (
			<div
				key={option.value}
				onClick={() => handleSelect(option)}
				className="
				px-4
				py-3
				cursor-pointer
				hover:bg-rose-500/20
				transition
				"
			>
				{option.label}
			</div>
			))}
		</div>
		)}
    </div>
  );
}
