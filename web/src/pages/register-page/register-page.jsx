import { RegisterForm } from "./../../components/ui/forms";
import styles from "./register-page.module.css";

function RegisterPage() {
  return (
    <section className={styles.section}>
      <h1>Registry form</h1>
      <RegisterForm />
    </section>
  );
}

export default RegisterPage;