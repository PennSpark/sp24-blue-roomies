import styles from "../style";
import { arrowUp } from "../assets";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const GetStarted = () => {

const navigate = useNavigate(); 

const handleClick = () => {
  navigate('/login'); 
};

return (
  
  <div onClick={handleClick} className={`${styles.flexCenter} on w-[140px] h-[140px] rounded-full bg-third p-[2px] cursor-pointer`}>
    <div className={`${styles.flexCenter} flex-col bg-primary w-[100%] h-[100%] rounded-full`}>
      <div className={`${styles.flexStart} flex-row`}>
        <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
          <span className="text-third">Get</span>
        </p>
        <img src={arrowUp} alt="arrow-up" className="w-[23px] h-[23px] object-contain" />
      </div>
      
      <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
        <span className="text-third">Started</span>
      </p>
    </div>
  </div>
)};

export default GetStarted;