import MainLayout from "../../components/layouts/main-layout";
import { RegisterForm } from "../../components/ui/forms";
import { LoginForm } from "../../components/ui/forms";
import styles from "./access-page.module.css";

function AccessPage() {
  return (
    <MainLayout>
    <section className={styles.section}>
      <h2>Acceso</h2>
      <LoginForm />
    </section>
    <section className={styles.section}>
      <h2>Registro</h2>
      <RegisterForm />
    </section>
    </MainLayout>
  );
}

export default AccessPage;