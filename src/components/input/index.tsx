import styles from './input.module.css';
import { UseFormRegisterReturn } from 'react-hook-form';

interface IInput {
    type: 'text' | 'email' | 'password';
    placeholder?: string;
    register: () => UseFormRegisterReturn<string>;
    error?: string;
}

export const Input = ({ type = 'text', placeholder, register, error }: IInput) => {
    return (
        <div>
            <input className={styles.field} type={type} placeholder={placeholder} {...register()} />
            <p className={styles.error}>{error}</p>
        </div >
    );
};