import React from "react";

const InputLabel = ({ label, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="font-semibold text-sm uppercase tracking-wider xl:text-lg"
    >
      {label}
    </label>
  );
};

export default InputLabel;
