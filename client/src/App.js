import React from 'react'
import styles from './style'

import { Billing, Business, Clients, Button, CardDeal, CTA, Feedback, Footer, GetStarted, Hero, NavBar, Stats, Testimonials} from './components'

const App = () => {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <NavBar />
        </div>
      </div>
      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero/>
        </div>
      </div>
      <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Stats/>
          <Business/> 
          <Billing />
          <CardDeal/>
          <Testimonials />
          <CTA />
          <Footer/>
        </div>
      </div>
    </div>
  )
}

export default App