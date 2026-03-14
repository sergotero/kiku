import { useForm } from "react-hook-form";
import styles from "./login-form.module.css";
import { useNavigate } from "react-router";
// import { useAuth } from "../../../context";
// import * as AuthService from "../../../../services/auth-services";

const defaultValues = {
  defaultValues: {
    name: "",
    surname: "",
    email: "",
    password: "",
    confirm_pass: ""
  },
  mode: "all",
};

function LoginForm(){
  const navigate = useNavigate();
  //const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    reset
  } = useForm(defaultValues);

  const onLoginUser = async (loginData) => {
    try {
      
    } catch (error) {
      // const { status } = error;
      // if (status === 400) {
      //   const { errors } = error.response.data || {}
      //   Object.keys(errors).forEach((inputName) => {
      //     setError(inputName, {type: "custom", message: errors[inputName]});
      //   })
      // }
    }
  }

  return (
    <form className={styles.form} method="post" onSubmit={handleSubmit(onLoginUser)}>
      <fieldset className={styles.fieldset}>
        {/* EMAIL */}
        <div className={`${styles.inputGroup} ${errors.email ? styles.isInvalid: ""}`}>
          <label className={styles.label} htmlFor="email">Email</label>
          <input
            className={styles.input}
            {...register("email", 
              { required: {
                  value: true,
                  message: "*An email is required"
                }
              })
            }
            type="email"
            id="email"
          />
        </div>
        {errors.email && (<p className={styles.errors}>{errors.email.message}</p>)}

        {/* PASSWORD */}
        <div className={`${styles.inputGroup} ${errors.password ? styles.isInvalid: ""}`}>
          <label className={styles.label} htmlFor="password">Password</label>
          <input 
            className={styles.input}
            {...register("password",
              { required: {
                  value: true,
                  message: "*A password is required"
                },
                minLength: {
                  value: 3,
                  message: "*Min length is 3 chars"
                }
              })
            }
            type="password"
            id="password"
          />
        </div>
        {errors.password && (<p className={styles.errors}>{errors.password.message}</p>)}
      </fieldset>
      
      {/* BUTTON */}
      <button className={`${styles.button} ${!isValid?styles.invalid:""}`} type="submit" disabled={(!isValid)? true: false}>Login</button>
    </form>
  );
}

export default LoginForm;