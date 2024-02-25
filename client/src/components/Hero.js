import styles from "../style";
import { discount, robot, sparkLogo } from "../assets";
import GetStarted from "./GetStarted";

const Hero = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        <div className="flex flex-row items-center py-[6px] px-4 bg-third rounded-[10px] mb-2">
          <p className={`${styles.paragraph} ml-2`}>
            <span className="text-black">Free to use, at least for now...</span>
          </p>
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-black ss:leading-[100.8px] leading-[75px]">
            Your dorm<br className="sm:block hidden" />{" "}
            <span className="text-third">simplified</span>{" "}
          </h1>
          <div className="ss:flex hidden md:mr-4 mr-0">
            <GetStarted />
          </div>
        </div>

        <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-black ss:leading-[100.8px] leading-[75px] w-full">
          and organized.  
        </h1>
        <p className={`${styles.paragraph} max-w-[470px] mt-5 text-black`}>
          An app that allows you and your roomates to manage chores, assign tasks, and let your dorm tidy and organized in a simplified and fun way.
        </p>
      </div>

      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <div className={`max-w [100px] max-h [100px]`}>
          <img src={sparkLogo} alt="billing" className="w-[100%] h-[100%] relative z-[4]" />
        </div>

      </div>

      <div className={`ss:hidden ${styles.flexCenter}`}>
        <GetStarted />
      </div>
    </section>
  );
};

export default Hero;