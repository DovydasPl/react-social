import { useEffect, useState } from "react";
import { ILike, IPost } from "../../types/posts";
import styles from './post.module.css';
import { APIService } from "../../API";
import { ResponseData } from "../../types/data";

export const Post = (props: { post: IPost; }) => {
    const { post } = props;
    const [likeCount, setLikeCount] = useState<number>(post.like_count);
    const [isLiked, setIsLiked] = useState<boolean>(post.is_liked);

    const [response, setResponse] = useState<ResponseData | null>(null);
    const [loading, setLoading] = useState(false);



    const toggleLike = () => {
        try {
            APIService.likePost({ setResponse, setLoading, 'id': post.id });

            setIsLiked(prev => !prev);

            setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.userInfo}>
                <img className={styles.userImage} src="userPlaceholder.png" alt="user" />
                <p>{post.user.email}</p>
            </div>
            <div className={styles.cardInfo}>
                <div>
                    <h2 className={styles.cardTitle}>{post.title}</h2>
                    <div className={styles.cardDescription}>{post.description}</div>
                </div>
                <div>
                    <img className={styles.cardImage} src={post.image || 'postPlaceholder.png'} />
                    <div className={styles.actions}>
                        <button className={`${styles.likeButton} ${isLiked && styles.pressedLikeButton}`} onClick={toggleLike}>{isLiked ? <>&#128078;</> : <>&#128077;</>}{likeCount}</button>
                    </div>
                </div>

            </div>

            {/* <CommentsBox post={post} /> */}
        </div >
    );
};