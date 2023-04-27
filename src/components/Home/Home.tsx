import React from 'react'
import styles from './home.module.css'
import { useNavigate } from 'react-router-dom'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const navigateToLogin = () => {
    navigate('/login')
  }
  const navigateToRegister = () => {
    navigate('/registration')
  }

  return (
      <div className={styles.container}>
         <div className={styles.btnContainer}>
            <button onClick={navigateToLogin} className={styles.homeBtn}>Login</button>
            <button onClick={navigateToRegister} className={styles.homeBtn}>Registration</button>
         </div>
      </div>
  )
}

export default Home
