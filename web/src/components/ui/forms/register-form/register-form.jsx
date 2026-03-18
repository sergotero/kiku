import { useForm } from "react-hook-form";
import styles from "./register-form.module.css";
import { useNavigate } from "react-router";
import * as ApiService from "./../../../../services/api-service.js";

const defaultValues = {
  defaultValues: {
    name: "",
    lastName: "",
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
      const newUser = await ApiService.register(user);
      if (newUser) {
        reset();
      }
    } catch (error) {
      console.log("Error: ", error);
      
      const { status } = error;
      if (status === 400) {
        const { errors } = error.response?.data || {};
        Object.keys(errors).forEach((inputName) => {
          setError(inputName, {type: "custom", message: errors[inputName]});
        });
      }
    }
  }

  return (
    <form className={styles.form} method="post" onSubmit={handleSubmit(onRegisterUser)}>
      <fieldset className={styles.fieldset}>
        
        {/* NAME */}
        {errors.name && (<p className={styles.errors}>{errors.name.message}</p>)}
        <div className={`${styles.inputGroup} ${errors.name ? styles.isInvalid: ""}`}>
          <label className={styles.label} htmlFor="name">Nombre</label>
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

        {/* lastName */}
        {errors.lastName && (<p className={styles.errors}>{errors.lastName.message}</p>)}
        <div className={`${styles.inputGroup} ${errors.lastName ? styles.isInvalid: ""}`}>
          <label className={styles.label} htmlFor="">Apellido</label>
          <input 
            className={styles.input} 
            {...register("lastName", 
              { required: {
                  value: true,
                  message: "*Se requiere un apellido"
                } 
              })
            } 
            type="text"
            id="lastName"
        />
        </div>

        {/* EMAIL */}
        {errors.email && (<p className={styles.errors}>{errors.email.message}</p>)}
        <div className={`${styles.inputGroup} ${errors.email ? styles.isInvalid: ""}`}>
          <label className={styles.label} htmlFor="email">Email</label>
          <input
            className={styles.input}
            {...register("email", 
              { required: {
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
        <div className={`${styles.inputGroup} ${errors.password ? styles.isInvalid: ""}`}>
          <label className={styles.label} htmlFor="password">Contraseña</label>
          <input 
            className={styles.input}
            {...register("password",
              { required: {
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

        {/* CONFIRM PASSWORD */}
        {errors.confirm_pass && (<p className={styles.errors}>{errors.confirm_pass.message}</p>)}
        <div className={`${styles.inputGroup} ${errors.confirm_pass ? styles.isInvalid: ""}`}>
          <label className={styles.label} htmlFor="confirm_pass">Confirmar contraseña</label>
          <input 
            className={styles.input} 
            {...register("confirm_pass", 
              { required: {
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
            id="confirm_pass" 
          />
        </div>
      </fieldset>
      
      {/* BUTTON */}
      <button className={`${styles.button} ${!isValid ? styles.invalid : ""}`} type="submit" disabled={(!isValid) ? true : false}>Registrarse</button>
    </form>
  );
}

export default RegisterForm;