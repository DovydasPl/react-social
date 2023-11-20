import { useState, useEffect } from 'react';
import { Post } from '../../components/post/index';
import { IPost } from '../../types/posts';
import { APIService } from '../../API';
import { ResponseData } from '../../types/data';
import styles from './feed.module.css';

export const Feed = () => {
    const [postsList, setPostsList] = useState<IPost[] | null>(null);

    const [response, setResponse] = useState<ResponseData | null>(null);
    const [loading, setLoading] = useState(false);


    const getPosts = () => {
        APIService.getPosts({ setResponse, setLoading });
    };

    useEffect(() => {
        getPosts();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (response) {
            setPostsList(response as IPost[]);
        }

    }, [response]);

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Feed</h1>
            {loading ?
                <div>Loading...</div> :
                <div className={styles.postList}>
                    {postsList?.map((post) => (
                        <Post key={post.id} post={post} />
                    ))}
                </div>
            }
        </div>
    );
};