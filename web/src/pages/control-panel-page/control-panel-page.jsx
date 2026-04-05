import { Link, useParams } from "react-router";
import styles from "./control-panel-page.module.css";
import ControlPanelLayout from "../../components/layouts/control-panel-layout.jsx";
import * as ApiServices from "../../services/api-service.js";
import { useEffect, useState } from "react";
import { useAuth } from "./../../components/context/index.js";

function ControlPanel(){
  const params = useParams();
  const { user } = useAuth();
  const [ category, setCategory ] = useState(params.type);
  const [ content, setContent ] = useState(null);

  useEffect(() => {
    if( category === "reports") {
      const fetch = async () => {
        const reportList = await ApiServices.listReports();
        setContent(reportList);
      }
      fetch();
    }
  }, []);
  
  return(
    <ControlPanelLayout>
      <section className={styles.menu}>
        <ul>
          <Link to={"/control-panel/lists"} onClick={() => setCategory("lists")}>
            <li className={category === "lists" ? styles.active : ""}>Listas</li>
          </Link>
          {user?.rol === "Administrator" && (
            <Link to={"/control-panel/users"} onClick={() => setCategory("users")}>
              <li className={category === "users" ? styles.active : ""}>
                Usuarios
              </li>
            </Link>
          )}
          {user?.rol === "Administrator" && (
            <Link to={"/control-panel/reports"} onClick={() => setCategory("reports")}>
              <li className={category === "reports" ? styles.active : ""}>
                Reportes
              </li>
            </Link>
          )}
        </ul>
      </section>
      <section className={styles.content}>
        {user?.rol === "Administrator" && category === "reports" && content && (
          <table>
            <thead>
              <tr>
                <th>Término</th>
                <th>Mensaje</th>
                <th>Usuario</th>
                <th>Email</th>
                <th>Fecha</th>
                <th>Resuelto</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {content?.map((rep) => (
                <tr key={rep._id}>
                  <td className={styles.term}>{rep.onModel === "Kanji"? rep.item.kanji : rep.item.word}</td>
                  <td className={styles.message}>{rep.reportMessage}</td>
                  <td>{`${rep.user.name} ${rep.user.lastName}`}</td>
                  <td>{rep.user.email}</td>
                  <td>{rep.dateFormatted}</td>
                  <td>
                    <select name="isResolved" id="isResolved" defaultValue={rep.isSolved}>
                      <option value={true}>Sí</option>
                      <option value={false}>No</option>
                    </select>
                    
                  </td>
                  <td className={styles.buttons}>
                    {/* Botones */}
                    <button type="button">Modificar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </ControlPanelLayout>
  );
}

export default ControlPanel;