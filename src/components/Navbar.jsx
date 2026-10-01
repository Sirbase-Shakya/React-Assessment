import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useShop } from "../context/ShopContext.jsx";
import { CirclePlus, PackageSearch, SunMedium, Moon, ShoppingBasket } from "lucide-react";
export default function Navbar() {
  const { cartCount } = useShop();
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <nav className="navbar bg-body-tertiary border-bottom sticky-top">
      <div className="container flex-wrap gap-2">
        <Link to="/" className="navbar-brand fw-bold"><ShoppingBasket />Dokan</Link>
        <div className="navbar-nav flex-row align-items-center gap-3">
          <NavLink to="/" end className="nav-link"><PackageSearch /> Products</NavLink>
          <NavLink to="/add" className="nav-link"><CirclePlus /> Add product</NavLink>
          <NavLink to="/cart" className="nav-link">
            Cart <span className="badge text-bg-success rounded-pill" aria-label={`${cartCount} items in cart`}>{cartCount}</span>
          </NavLink>
          <button className="btn btn-sm btn-outline-secondary" onClick={() => setDark((d) => !d)} aria-label="Toggle dark mode">
            {dark ? <SunMedium /> : <Moon />}
          </button>
        </div>
      </div>
    </nav>
  );
}
