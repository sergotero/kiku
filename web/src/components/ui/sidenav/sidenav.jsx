import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context";
import styles from "./sidenav.module.css";

function SideNav({ open, setIsOpen }) {
  const { user, userLogout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogOut = () => {
    //Logout within the AuthContext
    userLogout();
    navigate("/");
  };

  return (
    <div className={`${styles.sidenav} ${open ? styles.open : ""}`}>
      <button className={styles.closebtn} onClick={() => setIsOpen(!open)} id="close" >×</button>
      <Link to="/control-panel/lists" onClick={() => setIsOpen(!open)}><i className="fa-solid fa-list"></i> Listas</Link>
      {user?.rol === "Administrator" && (
        <>
          <Link to="/control-panel/users" onClick={() => setIsOpen(!open)}><i className="fa-solid fa-user"></i> Usuarios</Link>
          <Link to="/control-panel/reports" onClick={() => setIsOpen(!open)}><i className="fa-solid fa-triangle-exclamation"></i> Reportes</Link>
        </>
      )}
      <a href="" onClick={handleLogOut}><i className="fa-solid fa-arrow-right-from-bracket"></i> Cerrar sesión</a>
    </div>
  );
}

export default SideNav;