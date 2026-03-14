import { useForm } from "react-hook-form";
import styles from "./register-form.module.css";
import { useNavigate } from "react-router";
// import * as AuthServices from "./../../../../services/auth-services";

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

function RegisterForm(){
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    reset
  } = useForm(defaultValues);

  const onRegisterUser = async (user) => {
    try {
      
    } catch (error) {
      // const { status } = error;
      // if (status === 400) {
      //   const { errors } = error.response?.data || {};
      //   Object.keys(errors).forEach((inputName) => {
      //     setError(inputName, {type: "custom", message: errors[inputName]});
      //   });
      // }
    }
  }

  return (
    <form className={styles.form} method="post" onSubmit={handleSubmit(onRegisterUser)}>
      <fieldset className={styles.fieldset}>
        
        {/* NAME */}
        <div className={`${styles.inputGroup} ${errors.name ? styles.isInvalid: ""}`}>
          <label className={styles.label} htmlFor="name">Name</label>
          <input 
            className={styles.input}
            {...register("name",
              {
                required: {
                  value: true,
                  message:"*Se requiere un nombre"
                }
              })
            }
            type="text"
            id="name"
          />
        </div>
          {errors.name && (<p className={styles.errors}>{errors.name.message}</p>)}

        {/* SURNAME */}
        <div className={`${styles.inputGroup} ${errors.surname ? styles.isInvalid: ""}`}>
          <label className={styles.label} htmlFor="">Surname</label>
          <input 
            className={styles.input} 
            {...register("surname", 
              { required: {
                  value: true,
                  message: "*Se requiere un apellido"
                } 
              })
            } 
            type="text"
            id="surname"
        />
        </div>
        {errors.surname && (<p className={styles.errors}>{errors.surname.message}</p>)}

        {/* EMAIL */}
        <div className={`${styles.inputGroup} ${errors.email ? styles.isInvalid: ""}`}>
          <label className={styles.label} htmlFor="email">Email</label>
          <input
            className={styles.input}
            {...register("email", 
              { required: {
                  value: true,
                  message: "*Se requiere un correo electrónico"
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
                  message: "*Se requiere una contraseña"
                },
                minLength: {
                  value: 3,
                  message: "*El tamaño mínimo es de 3 caracteres"
                }
              })
            }
            type="password"
            id="password"
          />
        </div>
        {errors.password && (<p className={styles.errors}>{errors.password.message}</p>)}

        {/* CONFIRM PASSWORD */}
        <div className={`${styles.inputGroup} ${errors.confirm_pass ? styles.isInvalid: ""}`}>
          <label className={styles.label} htmlFor="confirm_pass">Repeat password</label>
          <input 
            className={styles.input} 
            {...register("confirm_pass", 
              { required: {
                  value: true,
                  message: "*Se requiere una confirmación de la contraseña"
                },
                minLength: {
                  value: 3,
                  message: "*El tamaño mínimo es de 3 caracteres"
                }
              })
            } 
            type="password" 
            id="confirm_pass" 
          />
        </div>
        {errors.confirm_pass && (<p className={styles.errors}>{errors.confirm_pass.message}</p>)}
      </fieldset>
      
      {/* BUTTON */}
      <button className={`${styles.button} ${!isValid?styles.invalid:""}`} type="submit" disabled={(!isValid)? true: false}>Register</button>
    </form>
  );
}

export default RegisterForm;