import "./PageTitle.css";

export const PageTitle = ({ text, className = "" }) => {
  return <h1 className={`page-title ${className}`}>{text}</h1>;
};
