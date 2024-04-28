import { achievements, card } from "../assets";
import styles, { layout } from "../style";
import Button from "./Button";

const CardDeal = () => (
  <section className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.headingBlack}>
        Know who is doing the most for your dorm. 
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Keep track of who is the most engaged roommate with a gamified approach.
      </p>

      <Button styles={`mt-10`} />
    </div>

    <div className={layout.sectionImg}>
      <img src={achievements} alt="billing" className="w-[100%] h-[100%]" />
    </div>
  </section>
);

export default CardDeal;