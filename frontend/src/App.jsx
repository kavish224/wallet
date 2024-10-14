import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { Confirmation } from "./pages/Confirmation";
import { Home } from "./pages/Home";


function App() {

  return (
    <>
    <BrowserRouter>
     <Routes>
       <Route path="/signup" element={<Signup />} />
       <Route path="/signin" element={<Signin />} />
       <Route path="/" element={<Home />} />
       <Route path="/dashboard" element={<Dashboard />} />
       <Route path="/send" element={<SendMoney />} />
       <Route path="/confirmation" element={<Confirmation />} />
     </Routes>
   </BrowserRouter>
 </>
  )
}

export default App
