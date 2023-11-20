import { LoginForm } from './LoginForm';
import styles from './login.module.css';

export const Login = () => {

    return (
        <div className={styles.wrapper}>
            <LoginForm />
        </div>
    );
};