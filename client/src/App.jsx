import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Signup/>}/> {/* Default route */}
        <Route path='/register' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App