import { FieldValues } from "react-hook-form";
import { removeValue } from "../utils/localStorage";


export interface IAPIFetch {
    setLoading: (value: boolean) => void;
    setResponse: (value: any) => void;
    data?: FieldValues;
    id?: number;
}

const getAuthToken = () => {
    const authData = localStorage.getItem('AUTH-DATA');

    if (!authData) return null;

    return JSON.parse(authData).access;
};

export class APIService {
    static login = ({
        setLoading,
        setResponse,
        data
    }: IAPIFetch) => {
        const path = '/auth/login/';
        const options = {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        };

        if (setLoading) setLoading(true);

        fetch(`${process.env.REACT_APP_API_URL}${path}`, options)
            .then((resp) => {
                if (!resp.ok) throw resp;
                return resp.json();
            })
            .then((resp) => {
                setLoading(false);
                setResponse(resp);
            });
    };

    static register = ({
        setLoading,
        setResponse,
        data
    }: IAPIFetch) => {
        const path = '/auth/register/';

        const options = {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        };

        if (setLoading) setLoading(true);

        fetch(`${process.env.REACT_APP_API_URL}${path}`, options)
            .then((resp) => {
                if (!resp.ok) throw resp;
                return resp.json();
            })
            .then((resp) => {
                setLoading(false);
                setResponse(resp);
            });
    };

    static getPosts = ({ setLoading, setResponse }: IAPIFetch) => {
        const path = '/blog-apiview/posts/';

        const options = {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'authorization': `Bearer ${getAuthToken()}`
            },
            method: 'GET',
        };

        if (setLoading) setLoading(true);

        fetch(`${process.env.REACT_APP_API_URL}${path}`, options)
            .then((resp) => {
                if (!resp.ok) throw resp;
                return resp.json();
            })
            .then((resp) => {
                setLoading(false);
                setResponse(resp);
            }).catch(error => {
                if (error.status === 401) {
                    removeValue('AUTH-DATA');
                    window.location.reload();
                }
            });
    };

    static createPost = ({ setLoading, setResponse, data }: IAPIFetch) => {
        const path = '/blog-apiview/posts/';

        const options = {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'authorization': `Bearer ${getAuthToken()}`
            },
            method: 'POST',
            body: JSON.stringify(data)
        };

        if (setLoading) setLoading(true);

        fetch(`${process.env.REACT_APP_API_URL}${path}`, options)
            .then((resp) => {
                if (!resp.ok) throw resp;

                console.log(resp);
                return resp.json();
            })
            .then((resp) => {
                console.log(resp);
                setLoading(false);
                setResponse(resp);
            }).catch(error => {
                if (error.status === 401) {
                    removeValue('AUTH-DATA');
                    window.location.reload();
                }
            });
    };

    static likePost = ({ setLoading, setResponse, id }: IAPIFetch) => {
        const path = `/blog-apiview/posts/${id}/like/`;

        const options = {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'authorization': `Bearer ${getAuthToken()}`
            },
            method: 'POST',
        };

        if (setLoading) setLoading(true);

        fetch(`${process.env.REACT_APP_API_URL}${path}`, options)
            .then((resp) => {
                if (!resp.ok) throw resp;

                return resp.json();
            })
            .then((resp) => {
                setLoading(false);
                setResponse(resp);
            }).catch(error => {
                if (error.status === 401) {
                    removeValue('AUTH-DATA');
                    window.location.reload();
                }
            });
    };
}