import { Link } from "react-router";
import { useAuth } from "../../context";
import styles from "./sidenav.module.css";

function SideNav({ open, setIsOpen }) {
  const { logout } = useAuth();
  
  const handleLogOut = () => {
    //Logout within the AuthContext
    logout();
  };

  return (
    <div className={`${styles.sidenav} ${open ? styles.open : ""}`}>
      <button className={styles.closebtn} onClick={() => setIsOpen(!open)} id="close" >×</button>
      <Link to="/profile" onClick={() => setIsOpen(!open)}><i className="fa-solid fa-user"></i> Perfil</Link>
      <a href="" onClick={handleLogOut}><i className="fa-solid fa-arrow-right-from-bracket"></i> Cerrar sesión</a>
    </div>
  );
}

export default SideNav;