import React, { useId, forwardRef } from "react";

const Input = forwardRef(function Input(
  {
    type = "text",
    label,
    className = "",
    disabled = false,
    error = "",
    placeholder,
    ...props
  },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label className="inline-block pl-1 mb-1" htmlFor={id}>
          {label}
        </label>
      )}

      <input
        id={id}
        ref={ref}
        type={type}
        disabled={disabled}
        placeholder={placeholder ?? label}
        className={`px-3 py-2 rounded-lg bg-white text-black
          outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${className}`}
        {...props}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
});

export default Input;
