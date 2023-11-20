export interface IUser {
    id: number;
    email: string;
}

export interface IPost {
    id: number;
    title: string;
    description: string;
    image: string;
    user: IUser;
    like_count: number;
    is_liked: boolean;
}

export interface IComment {
    id: string;
    userId: string;
    userPhoto: string | null;
    userName: string | null;
    content: string;
}

export interface ILike {
    id: string;
    userId: string;
}

export interface ICreateFormData {
    title: string;
    description: string;
}