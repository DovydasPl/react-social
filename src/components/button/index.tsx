import styles from './button.module.css';

interface IButton {
    type?: 'submit' | 'reset' | 'button';
    name: string;
}

export const Button = ({ type = 'submit', name }: IButton) => {
    return (
        <button className={styles.button} type={type}>{name}</button>
    );
};