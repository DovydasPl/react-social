import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ResponseData } from '../../types/data';
import { setValue } from '../../utils/localStorage';
import { APIService } from '../../API';
import useAuth from '../../hooks/useAuth';
import { getAuthenticatedUser } from '../../utils/user';
import styles from './login.module.css';
import { Input } from '../../components/input';
import { Button } from '../../components/button';


const schema = yup.object().shape({
    email: yup.string().email().required('Email is required.').max(100, 'Email can be 100 characters long at a maximum.'),
    password: yup.string().required('Password is required.').max(100, 'Password can be 100 characters long at a maximum.')
});

export const LoginForm = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();


    const { register, handleSubmit, formState: { errors: formErors } } = useForm({
        resolver: yupResolver(schema)
    });

    const [response, setResponse] = useState<ResponseData | null>(null);
    const [loading, setLoading] = useState(false);


    const onSubmit = async (data: FieldValues) => {
        APIService.login({
            setLoading,
            setResponse,
            data
        });
    };

    useEffect(() => {
        if (response?.access) {
            setValue('AUTH-DATA', JSON.stringify(response));
            setAuth(getAuthenticatedUser());
            navigate('/feed');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response]);

    return (
        <>
            <h1 className={styles.title}>Login</h1>
            {loading ?
                <div>Loading...</div> :
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <Input type='email' placeholder='Email...' register={() => register('email')} error={formErors.email?.message} />
                    <Input type='password' placeholder='Password...' register={() => register('password')} error={formErors.password?.message} />
                    <Button type='submit' name='Submit' />
                </form>
            }
        </>
    );
};