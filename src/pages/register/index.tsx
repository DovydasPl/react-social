import { RegisterForm } from './RegisterForm';
import styles from './register.module.css';

export const Register = () => {
    return (
        <div className={styles.wrapper}>
            <RegisterForm />
        </div>
    );
};