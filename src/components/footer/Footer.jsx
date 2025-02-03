import { SocialLinks } from "../ui/socialLinks/SocialLinks";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-content">
        <SocialLinks />
        <div>© {new Date().getFullYear()} Movie Time. All Rights Reserved.</div>
      </div>
    </footer>
  );
};
