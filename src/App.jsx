import './App.css'
import Auth from './pages/auth.jsx'
import Home from './pages/home.jsx'
import {Routes , Route} from "react-router-dom"
import Gameboard from "./pages/gameboard.jsx"
import Protectedroute from './components/protectedroute.jsx'
import WaitingPage from './pages/waiting_page.jsx'
import Watch from './pages/watch.jsx'
import Spectate from './pages/spectate.jsx'
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
      <Route path='/watch' element={<Protectedroute>
        <Watch/>
      </Protectedroute>}/>
      <Route path='/watch/:gameId' element={<Protectedroute>
        <Spectate/>
      </Protectedroute>}/>
      

    </Routes>
    
  )
}

export default App
