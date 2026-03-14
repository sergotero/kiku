import { Link } from "react-router";
// import { useAuth } from "./../../context";
// import { useState } from "react";
import SideNav from "./../sidenav/sidenav";
import styles from "./navbar.module.css";
import kiku from "./../../../assets/images/logo/kiku_name_logo2.png";

function Navbar() {
  // const { user, setUser } = useAuth();
  // const [ isOpen, setIsOpen ] = useState(false);

  return (
    <header>
      <nav className={styles.navbar}>
        <Link to="/" className={styles["logo-anchor"]}>
          <div className={styles.logo}>
            <img src={kiku} alt="Kiku logo" />
          </div>
        </Link>
        <ul>
          <li>
            <Link to="/books">Catálogo</Link>
          </li>
          {/* {!user ? (
            <>
              <li>
                <Link to="/login">Acceso</Link>
              </li>
              <li>
                <Link to="/register">Registro</Link>
              </li>
            </>
            ) : (
            <>
              <li className={styles.logout} onClick={() => {setIsOpen(!isOpen)}}>
                <i className="fa-solid fa-user"></i>
              </li>
            </>
            )} */}
        </ul>
      </nav>
      {/* <SideNav open={isOpen} setIsOpen={setIsOpen} /> */}
    </header>
  );
}

export default Navbar;