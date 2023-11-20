import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { ICreateFormData } from '../../types/posts';
import useAuth from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { ResponseData } from '../../types/data';
import { APIService } from '../../API';
import styles from './createPost.module.css';
import { Input } from '../../components/input';
import { TextArea } from '../../components/textArea';
import { Button } from '../../components/button';


export const CreateForm = () => {
    const navigate = useNavigate();
    const { auth } = useAuth();

    const [response, setResponse] = useState<ResponseData | null>(null);
    const [loading, setLoading] = useState(false);

    const schema = yup.object().shape({
        title: yup.string().required('Title is required.')
            .min(3, 'Title must be at least 3 characters long.')
            .max(100, 'Title can be 100 characters long at a maximum.'),
        description: yup.string().required('Description is required.')
            .min(3, 'Description must be at least 3 characters long.')
            .max(1000, 'Description can be 1000 characters long at a maximum.')
    });

    const { register, handleSubmit, formState: { errors } } = useForm<ICreateFormData>({
        resolver: yupResolver(schema)
    });


    const onCreatePost = async (formData: ICreateFormData) => {
        const data = {
            ...formData,
            'user': auth?.id
        };
        APIService.createPost({ setLoading, setResponse, data });
    };

    useEffect(() => {
        if (response?.success) {
            navigate('/feed');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response]);

    return (
        <>
            <h1 className={styles.title}>Create a new post</h1>
            {loading ?
                <div>Loading...</div> :
                <form className={styles.form} onSubmit={handleSubmit(onCreatePost)}>
                    <Input type='text' placeholder='Title...' register={() => register('title')} error={errors.title?.message} />
                    <TextArea placeholder='Description...' register={() => register('description')} error={errors.description?.message} />
                    <Button name='Submit' />
                </form>
            }
        </>
    );
};