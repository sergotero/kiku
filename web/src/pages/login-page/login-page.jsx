import { LoginForm } from "./../../components/ui/forms";
import styles from "./login-page.module.css";

function LoginPage() {
  return (
    <section className={styles.section}>
      <h1>Login form</h1>
      <LoginForm />
    </section>
  );
}

export default LoginPage;