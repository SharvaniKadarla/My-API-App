import Link from "next/link.js";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__list-item">
          <Link href="/electric" className="nav__link">
            Electric
          </Link>
        </li>
        <li className="nav__list-item">
          <Link href="/fire" className="nav__link">
            Fire
          </Link>
        </li>
        <li className="nav__list-item">
          <Link href="/">
            <div className="nav__logo-container">
              <img src="logo.png" alt="logo" className="nav__logo" />
            </div>
          </Link>
        </li>
        <li className="nav__list-item">
          <Link href="/grass" className="nav__link">
            Grass
          </Link>
        </li>
        <li className="nav__list-item">
          <Link href="/water" className="nav__link">
            Water
          </Link>
        </li>
      </ul>
    </nav>
  );
}
