import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ResponseData } from '../../types/data';
import { setValue } from '../../utils/localStorage';
import { APIService } from '../../API';
import { useQuery } from '@tanstack/react-query';
import styles from './register.module.css';
import { Input } from '../../components/input';
import { Button } from '../../components/button';


const schema = yup.object().shape({
    email: yup.string().email().required('Email is required.').max(100, 'Email can be 100 characters long at a maximum.'),
    password: yup.string().required('Password is required.').max(100, 'Password can be 100 characters long at a maximum.')
});

export const RegisterForm = () => {
    const navigate = useNavigate();


    const { register, handleSubmit, formState: { errors: formErors }, reset } = useForm({
        resolver: yupResolver(schema)
    });

    const [response, setResponse] = useState<ResponseData | null>(null);
    const [loading, setLoading] = useState(false);


    const onSubmit = async (data: FieldValues) => {
        // APIService.register({
        //     setLoading,
        //     setResponse,
        //     data
        // });
        console.log(data.email, data.password);

        const path = '/auth/register/';

        const options = {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        };

        fetch(`${process.env.REACT_APP_API_URL}${path}`, options)
            .then((resp) => {
                if (!resp.ok) throw resp;
                return resp.json();
            })
            .then((resp) => {
                console.log(resp);
            });
    };

    useEffect(() => {
        // if (response?.data) {
        //     setValue('AUTH-DATA', JSON.stringify(response.data));
        //     reset();
        // }
    }, [response]);

    return (
        <>
            <h1 className={styles.title}>Register</h1>
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