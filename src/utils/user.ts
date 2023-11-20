import { jwtDecode } from "jwt-decode";

interface IJwtPayload {
    email: string;
    user_id: number;
}

export const getAuthenticatedUser = () => {
    const authData = localStorage.getItem('AUTH-DATA');

    if (!authData) return null;

    const { email, user_id: id } = jwtDecode(JSON.parse(authData).access) as IJwtPayload;

    return { email, id };
};
