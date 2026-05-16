import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Products from "./components/Products";
import Orders from "./components/Orders";
import Payments from "./components/Payments";
import Navbar from "./components/Navbar";
import CartPage from "./components/CartPage";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/cart" element={<CartPage />}/>
      </Routes>
    </Router>
  );
}

export default App;