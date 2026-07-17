import { NavLink } from "react-router";
import image from "../../assets/hero.png";
import "./Navbar.css";


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={image} alt="logo" />
      </div>

      <div className="nav-links">
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/product">Products</NavLink></li>
          <li><NavLink to="/about-us">About Us</NavLink></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;