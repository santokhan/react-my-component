// Input.jsx

import { twMerge } from "tailwind-merge";

// eslint-disable-next-line react/prop-types
function Input({ label, id, type, placeholder, className = "", ...props }) {
  return (
    <div className="w-full">
      <label className="text-sm text-gray-900">
        <span>{label}</span>
        <input
          type={type}
          name={id}
          className={twMerge(
            "rounded block w-full px-3 py-2.5 text-sm text-gray-900 focus:outline-non bg-gray-50 shadow-inner focus:outline-none",
            className
          )}
          placeholder={placeholder}
          {...props}
        />
      </label>
    </div>
  );
}

export default Input;
