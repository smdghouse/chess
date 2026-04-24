import './App.css'
import Auth from './pages/auth.jsx'
import Home from './pages/home.jsx'
import {Routes , Route} from "react-router-dom"
import Gameboard from "./pages/gameboard.jsx"
import Protectedroute from './components/protectedroute.jsx'
import WaitingPage from './pages/waiting_page.jsx'

function App() {
 
  return (
    <Routes>
      <Route path='/' element={<Auth/>}/>
      <Route path='/game' element={<Protectedroute>
        <Gameboard/>
      </Protectedroute>}/>
      <Route path='/home' element={<Protectedroute>
        <Home/>
      </Protectedroute>}/>
      <Route path='/waiting' element={<Protectedroute>
        <WaitingPage/>
      </Protectedroute>}/>

    </Routes>
    
  )
}

export default App
