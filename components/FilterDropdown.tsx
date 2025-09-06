
import React from 'react';

interface FilterOption<T extends string> {
    value: T;
    label: string;
}

interface FilterDropdownProps<T extends string> {
    label: string;
    value: T;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    options: FilterOption<T>[];
}

const FilterDropdown = <T extends string,>({
    label,
    value,
    onChange,
    options,
}: FilterDropdownProps<T>) => {
    return (
        <div>
            <label htmlFor={label} className="sr-only">{label}</label>
            <select
                id={label}
                name={label}
                value={value}
                onChange={onChange}
                className="block w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FilterDropdown;
