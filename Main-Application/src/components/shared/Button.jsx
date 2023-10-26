import React from "react";

const Button = ({
  bg,
  border,
  bottom,
  buttonContent,
  center,
  bold,
  sm,
  disabled,
  justifyCenter,
  handleFormClear,
  color,
  icon,
  mb,
  mr,
  position,
  px,
  py,
  width
}) => {
  return (
    <button
      style={{
        backgroundColor: bg,
        border: border,
        bottom: bottom,
        color: color,
        fontSize:sm,
        fontWeight:bold,
        textAlign:center,
        marginBottom: mb,
        marginRight: mr,
        position: position,
        paddingBlock: py,
        paddingInline: px,
        width: width,
        justifyItems: justifyCenter
      }}
      onClick={handleFormClear}
      disabled={disabled}
      className={`inline-flex items-center text-white justify-${justifyCenter} bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg`}
    >
      {icon}
      {buttonContent}
    </button>
  );
};

export default Button;
