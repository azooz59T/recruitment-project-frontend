import React, { useContext } from 'react'
import { ThemeContext } from './context/theme.context'

const App = () => {
  const {darkMode} = useContext(ThemeContext);

  const apptheme = darkMode ? "app dark" : "app";
  return (
    <div className={apptheme}>
      <h1>Navbar</h1>
      <div className="wrapper">
        Routes
      </div>
    </div>
  )
}

export default App