import React, { useContext } from 'react'
import { ThemeContext } from './context/theme.context'

const App = () => {
  const {darkMode} = useContext(ThemeContext);

  const apptheme = darkMode ? "app dark" : "app";
  return (
    <div className={apptheme}>App</div>
  )
}

export default App