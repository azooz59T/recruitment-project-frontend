import React, { useContext } from 'react'
import { ThemeContext } from './context/theme.context'
import Navbar from './navbar/Navbar.component';

const App = () => {
  const {darkMode} = useContext(ThemeContext);

  const apptheme = darkMode ? "app dark" : "app";
  return (
    <div className={apptheme}>
      <Navbar />
      <div className="wrapper">
        Routes
      </div>
    </div>
  )
}

export default App