
import FirstPart from './Component/ContainerFirst/FirstPart'
import LoginPage from './Component/Login/LoginPage';
// import Navbar from './Component/Navbar/Navbar'
// import Navbar from './Component/'
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import Signup from './Component/SignUp/Signup';
import MainDashboard from './Component/Dashboard/FirstDashboard/MainDashboard';
import TicketsystemState from './ContextAPI/TicketsystemState';
function App() {
  const BaseUrl = import.meta.env;
  console.log("Process", BaseUrl)
  return (
    <>
      <TicketsystemState>
        <Router>
          {/* <Navbar/> */}
          <Routes>
            <Route path='/' element={<FirstPart />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/dashboard' element={<MainDashboard />} />
          </Routes>
        </Router>
      </TicketsystemState>
    </>
  )
}

export default App
