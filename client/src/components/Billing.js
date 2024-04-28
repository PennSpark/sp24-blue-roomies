import { apple, bill, dashboardbg, google } from "../assets";
import styles, { layout } from "../style";

const Billing = () => (
  <section id="product" className={layout.sectionReverse}>
    <div className={layout.sectionImgReverse}>
      <img src={dashboardbg} alt="billing" className="w-[120%] h-[120%] relative z-[5]" />

      {/* gradient start */}
      <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
      <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" />
      {/* gradient end */}
    </div>

    <div className={layout.sectionInfo}>
      <h2 className={styles.headingBlack}>
        Easily manage tasks with your roommates
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Add, edit, save, and delete tasks that are making your dorm look messy and unorganized. 
      </p>

    </div>
  </section>
);

export default Billing;