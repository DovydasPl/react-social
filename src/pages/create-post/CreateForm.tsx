import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { ICreateFormData } from '../../types/posts';

export const CreateForm = () => {
    const [user] = useAuthState(auth);

    const navigate = useNavigate();

    const schema = yup.object().shape({
        title: yup.string().required('Title is required.').min(3, 'Title must be at least 3 characters long.').max(100, 'Title can be 100 characters long at a maximum.'),
        description: yup.string().required('Description is required.').min(3, 'Description must be at least 3 characters long.').max(1000, 'Description can be 1000 characters long at a maximum.')
    });

    const { register, handleSubmit, formState: { errors } } = useForm<ICreateFormData>({
        resolver: yupResolver(schema)
    });

    const postsRef = collection(db, 'posts');

    const onCreatePost = async (data: ICreateFormData) => {
        await addDoc(postsRef, {
            ...data,
            userName: user?.displayName,
            userId: user?.uid
        });
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit(onCreatePost)}>
            <input type="text" placeholder='Title...' {...register('title')} />
            <p>{errors.title?.message}</p>
            <textarea placeholder='Description...' {...register('description')} />
            <p>{errors.description?.message}</p>
            <button type='submit'>Submit</button>
        </form>
    );
};