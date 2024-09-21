export function Button({ className, text, ...rest }) {
  return (
    <button
      {...rest}
      className={`${className} px-6 py-2 font-semibold rounded text-lg`}
    >
      {text}
    </button>
  );
}
