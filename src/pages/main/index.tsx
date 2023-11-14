import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Post } from '../../components/post/index';
import { IPost } from '../../types/posts';

export const Main = () => {
    const [postsList, setPostsList] = useState<IPost[] | null>(null);
    const postsRef = collection(db, 'posts');

    const getPosts = async () => {
        const data = await getDocs(postsRef);
        setPostsList(data.docs.map(doc => ({ ...doc.data(), id: doc.id })) as IPost[]);
    };

    useEffect(() => {
        getPosts();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {postsList?.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
};