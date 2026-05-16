import { NavLink } from "react-router-dom";
import "./css/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="logo">
        Fresh<span>Food</span>
      </div>

      {/* Menu */}
      <ul className="nav-links">

        <li>
          <NavLink to="/">Home</NavLink>
        </li>

        <li>
          <NavLink to="/products">Products</NavLink>
        </li>

        <li>
          <NavLink to="/orders">Orders</NavLink>
        </li>

        <li>
          <NavLink to="/payments">Payments</NavLink>
        </li>

        <li>
          <NavLink to="/login">Login</NavLink>
        </li>

      </ul>

      {/* Button */}
      <button className="nav-btn">
        Login
      </button>

    </nav>
  );
}

export default Navbar;