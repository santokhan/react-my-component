import { twMerge } from "tailwind-merge";

function Input({ label, id, type, placeholder, className = "", ...props }) {
  return (
    <div className="w-full">
      <label className="text-sm text-gray-900">
        <span>{label}</span>
        <input
          type={type}
          name={id}
          className={twMerge(
            "rounded block border w-full border-gray-300 px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-black",
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
