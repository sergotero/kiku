import { useParams } from "react-router";
import { useAuth } from "../../../context";
import styles from "./report-form.module.css";
import { useForm } from "react-hook-form";
import * as ApiServices from "./../../../../services/api-service.js";


function ReportForm({ setModal }) {

  const { type, id } = useParams();
  const { user } = useAuth();

  const finalType = type.charAt(0).toUpperCase() + type.slice(1);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    reset
  } = useForm({
    defaultValues:{
      user: user?.id,
      item: id,
      onModel: finalType,
      reportMessage: "",
      isSolved: false
    },
    mode: "all",
  });

  const onCreateReport = async (report) => {
    try {
      const newReport = await ApiServices.createReport(report);
      if (newReport) {
        reset();
        setModal(false);
      }
    } catch (error) {
      const errors = error.response?.data || {};
      Object.keys(errors).forEach((inputName) => {
        setError(inputName, { type: "custom", message: errors[inputName] });
      });
    }
  }

  return (
    <form className={styles.form} method="POST" onSubmit={handleSubmit(onCreateReport)}>
      <fieldset className={styles.fieldset}>
        <div className={`${styles.inputTextGroup} ${errors.reportMessage ? styles.isInvalid : ""}`}>
          <label htmlFor="reportMessage">Escribe aquí tú mensaje. Trata de ser lo más concreto posible a la hora de identificar el error y, si es posible, aporta información para que nuestro equipo pueda valorarlo. Gracias.</label>
          <textarea
            {...register("reportMessage", {
              required: {
                value: true,
                message: "Es necesario indicar la naturaleza del problema detectado"
              }
            })}
          ></textarea>
        </div>
        <button className={`${styles.button} ${!isValid ? styles.invalid : ""}`} type="submit" disabled={(!isValid) ? true : false}>Enviar reporte</button>
      </fieldset>
    </form>
  );
}

export default ReportForm;