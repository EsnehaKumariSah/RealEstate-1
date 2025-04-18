import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Auth/SignIn";
import Forgot from "./Auth/Forgot";
import LayoutDashboard from "./Layout/LayoutDashboard";
import LayoutProperty from "./Layout/LayoutProperty";
import LayoutBooking from "./Layout/LayoutBooking";
import LayoutAgent from "./Layout/LayoutAgent";
import LayoutBuyers from "./Layout/LayoutBuyers";
import LayoutLease from "./Layout/LayoutLease";
import LayoutFinance from "./Layout/LayoutFinance";
import LayoutSeller from "./Layout/LayoutSeller";
import {ToastContainer} from "react-toastify";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer/>
      <Routes>

        <Route path="/SignIn" element={<SignIn />}/>
        <Route path="/" element={<LayoutDashboard/>}/>
        <Route path="/Forgot" element={<Forgot />}/>
        <Route path="/Property" element={<LayoutProperty/>}/>
        <Route path="/Booking" element={<LayoutBooking/>}/>
        <Route path="/Agent" element={<LayoutAgent/>}/>
        <Route path="/Buyers" element={<LayoutBuyers/>}/>
        <Route path="/Lease" element={<LayoutLease/>}/>
        <Route path="/Finance" element={<LayoutFinance/>}/>
        <Route path="/Seller" element={<LayoutSeller/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;