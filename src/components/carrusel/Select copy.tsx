import React from 'react';

interface SelectProps {
  options: string[];
  onChange: (value: string) => void;
  placeholder: string;
}

export const Select: React.FC<SelectProps> = ({ options, onChange, placeholder }) => {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      className="font-josefin text-base md:text-[1rem] bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#004141]"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};