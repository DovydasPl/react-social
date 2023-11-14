export interface IPost {
    id: string;
    title: string;
    description: string;
    userId: string;
    userName: string;
}

export interface IComment {
    id: string;
    userId: string;
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