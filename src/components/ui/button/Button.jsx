import "./Button.css";

export const Button = (props) => {
  if (!props) return null;

  const {
    className = "but",
    onClick,
    type = "button",
    children,
    ...rest
  } = props;

  const handleClick = onClick || (() => {});

  return (
    <button
      type={type}
      className={`but ${className}`}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
};
