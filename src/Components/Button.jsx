import React from "react";

function Button({
  children,
  type = "button",
  bgcolor = "bg-blue-500",
  textcolor = "text-white",
  className = "",
  disabled = false,
  loading=false,

  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      type={type}
      className={`px-4 py-2 rounded-lg ${bgcolor} ${textcolor} ${className} `}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}

export default Button;
