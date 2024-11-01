import React from "react";

const TextInput = ({
  type,
  placeholder,
  Icon,
  VisibilityIcon,
  value,
  onChange,
  className,
  disabled,
  title,
  onBlur,

  ...rest
}) => {
  return (
    <div className="relative">
      <input
        disabled={disabled}
        value={value}
        title={title && title}
        onChange={onChange}
        onBlur={onBlur && onBlur}
        className={`block w-full px-10 py-3 mb-4 text-base rounded-lg border border-muted dark:border-accent-1 shadow-sm focus:border-accent-1 focus:ring-accent-1 focus:ring-2 focus:outline-none transition duration-200 ease-in-out bg-white text-dark-primary dark:text-primary placeholder-gray-400
                  dark:bg-dark-primary ${className}`}
        type={type}
        placeholder={placeholder}
        required
      />
      {Icon && (
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
      )}

      {!Icon && VisibilityIcon && (
        <VisibilityIcon
          {...rest}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-primary dark:text-gray-200"
        />
      )}
    </div>
  );
};

export default TextInput;
