export const Icon = (props) => {
  const { className, children, onClick, size = 20, color = "#fff" } = props;

  const handleClick = onClick || (() => {});

  return (
    <div onClick={handleClick}>
      <i
        className={`icon ${className}`}
        style={{ fontSize: `${size}px`, color }}
      ></i>
      {children}
    </div>
  );
};
