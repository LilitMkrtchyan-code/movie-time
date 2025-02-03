import xIcon from "../../../assets/images/x.png";
import telegramIcon from "../../../assets/images/telegram.png";
import vkIcon from "../../../assets/images/vk.png";
import linkedinIcon from "../../../assets/images/linkedin.png";
import "./SocialLinks.css";

export const SocialLinks = () => {
   return (
     <div className="social-links">
       <div className="social-icon">
         <a href="https://x.com/ivi_ru?mx=2">
           <img src={xIcon} alt="x Icon" className="x-icon"/>
         </a>
       </div>
       <div className="social-icon">
         <a href="https://t.me/official_iviru">
           <img src={telegramIcon} alt="telegram Icon" className="telegram-icon"/>
         </a>
       </div>
       <div className="social-icon">
         <a href="https://en.wikipedia.org/wiki/Ice_cream">
           <img src={vkIcon} alt="vk Icon" className="vk-icon"/>
         </a>
       </div>
       <div className="social-icon">
         <a href="https://en.wikipedia.org/wiki/Ice_cream">
           <img src={linkedinIcon} alt="linkedin Icon" className="linkedin-icon"/>
         </a>
       </div>
     </div>
   );
 };