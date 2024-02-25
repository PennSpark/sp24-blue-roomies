import styles from "../style";
import Button from "./Button";
import ButtonWhite from "./ButtonWhite";


const CTA = () => (
  <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-third rounded-[20px] box-shadow`}>
    <div className="flex-1 flex flex-col">
      <h2 className={styles.headingActuallyBlack}>Try our app now!</h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Everything you need to make your dorm go from a complete mess to a hotel-level suite.
      </p>
    </div>

    <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
      <ButtonWhite />
    </div>
  </section>
);

export default CTA;