import { useContext, lazy, Suspense } from 'react'
import { ThemeContext } from './context/theme.context'
import Navbar from './navbar/Navbar.component';
import {Routes, Route} from "react-router-dom";
import CustomLinearProgress from './components/custom-linear-progress/CustomLinearProgress.component';

// Imports with lazy loading
const Home = lazy(() => import("./pages/home/Home.page")); 

const App = () => {
  const {darkMode} = useContext(ThemeContext);

  const apptheme = darkMode ? "app dark" : "app";
  return (
    <div className={apptheme}>
      <Navbar />
      <div className="wrapper">
        <Suspense fallback={<CustomLinearProgress />}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  )
}

export default App