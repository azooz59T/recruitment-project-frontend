import { useContext, lazy, Suspense } from 'react'
import { ThemeContext } from './context/theme.context'
import Navbar from './navbar/Navbar.component';
import {Routes, Route} from "react-router-dom";
import CustomLinearProgress from './components/custom-linear-progress/CustomLinearProgress.component';

// Imports with lazy loading
const Home = lazy(() => import("./pages/home/Home.page")); 
const Companies = lazy(() => import("./pages/companies/companies.page")); 
const AddCompany = lazy(() => import("./pages/companies/AddCompany.page"));
const Jobs = lazy(() => import("./pages/jobs/jobs.page"));  
const AddJob = lazy(() => import("./pages/jobs/AddJob.page"));
const Candidate = lazy(() => import("./pages/candidates/candidates.page"));  


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
            <Route path="/companies">
              <Route index element ={<Companies />} />
              <Route path="add" element={<AddCompany />}/>
            </Route>
            <Route path="/jobs">
              <Route index element ={<Jobs />} />
              <Route path="add" element ={<AddJob />} />
            </Route>
            <Route path="/candidates">
              <Route index element ={<Candidate />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  )
}

export default App