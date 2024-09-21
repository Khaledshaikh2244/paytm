import {
BrowserRouter,
Route,
Routes,
} from "react-router-dom";

import {Signup} from "../src/pages/Signup";
import {Singin} from "../src/pages/Singin";
import  {Dashboard} from "../src/pages/Dashboard";
import { SendMoney } from "../src/pages/SendMoney";


function App() {

  return (
    <>
    
        <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Singin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />

        </Routes>
        </BrowserRouter>
        
    </>
  )
}

export default App
