import { useForm } from "react-hook-form";
import styles from "./login-form.module.css";
import { useNavigate } from "react-router";
import { useAuth } from "./../../../context";

const defaultValues = {
  defaultValues: {
    email: "",
    password: "",
  },
  mode: "all",
};

function LoginForm() {
  const navigate = useNavigate();
  const { userLogin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    reset
  } = useForm(defaultValues);

  const onLoginUser = async (loginData) => {
    try {
      userLogin(loginData);
      reset();
      navigate("/");
    } catch (error) {
      const { status } = error;
      if (status === 400) {
        const { errors } = error.response.data || {}
        Object.keys(errors).forEach((inputName) => {
          setError(inputName, { type: "custom", message: errors[inputName] });
        })
      }
    }
  }

  return (
    <form className={styles.form} method="POST" onSubmit={handleSubmit(onLoginUser)}>
      <fieldset className={styles.fieldset}>
        {/* EMAIL */}
        {errors.email && (<p className={styles.errors}>{errors.email.message}</p>)}
        <div className={`${styles.inputGroup} ${errors.email ? styles.isInvalid : ""}`}>
          <label className={styles.label} htmlFor="email">Email</label>
          <input
            className={styles.input}
            {...register("email",
              {
                required: {
                  value: true,
                  message: "*Se requiere un email"
                },
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-z]{2,6}$/,
                  message: "El email debe ser válido"
                }
              })
            }
            type="email"
            id="email"
          />
        </div>

        {/* PASSWORD */}
        {errors.password && (<p className={styles.errors}>{errors.password.message}</p>)}
        <div className={`${styles.inputGroup} ${errors.password ? styles.isInvalid : ""}`}>
          <label className={styles.label} htmlFor="password">Contraseña</label>
          <input
            className={styles.input}
            {...register("password",
              {
                required: {
                  value: true,
                  message: "*Se requiere una contraseña"
                },
                minLength: {
                  value: 5,
                  message: "*La contraseña debe tener, al menos, 5 caracteres"
                },
                maxLength: {
                  value: 15,
                  message: "*La contraseña debe tener, como máximo, 15 caracteres"
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,15}$/,
                  message: "*La contraseña debe contener al menos una minúscula, una mayúscula, un número y un símbolo y debe tener entre 5 y 15 caracteres"
                }
              })
            }
            type="password"
            id="password"
          />
        </div>
      </fieldset>

      {/* BUTTON */}
      <button
        className={`${styles.button} ${!isValid ? styles.invalid : ""}`}
        type="submit"
        disabled={(!isValid) ? true : false}>
        Login
      </button>
    </form>
  );
}

export default LoginForm;