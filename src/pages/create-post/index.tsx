import { CreateForm } from "./CreateForm";
import styles from './createPost.module.css';

export const CreatePost = () => {
    return (
        <div className={styles.wrapper}>
            <CreateForm />
        </div>
    );
};