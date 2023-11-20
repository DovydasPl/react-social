import styles from './textArea.module.css';
import { UseFormRegisterReturn } from 'react-hook-form';

interface ITextArea {
    placeholder?: string;
    register: () => UseFormRegisterReturn<string>;
    error?: string;
}

export const TextArea = ({ placeholder, register, error }: ITextArea) => {
    return (
        <div>
            <textarea className={styles.area} placeholder={placeholder} {...register()} />
            <p className={styles.error}>{error}</p>
        </div >
    );
};