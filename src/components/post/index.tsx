import { addDoc, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from "../../config/firebase";
import { useEffect, useState } from "react";
import { CommentsBox } from "./CommentsBox";
import { ILike, IPost } from "../../types/posts";

export const Post = (props: { post: IPost; }) => {
    const { post } = props;
    const [user] = useAuthState(auth);
    const [likes, setLikes] = useState<ILike[] | null>(null);

    const likesRef = collection(db, 'likes');
    const likesDoc = query(likesRef, where('postId', '==', post.id));


    const addLike = async () => {
        try {
            const newDoc = await addDoc(likesRef, {
                userId: user?.uid,
                postId: post.id
            });

            if (user) {
                setLikes((prev => prev ? [...prev, { id: newDoc.id, userId: user?.uid }] : [{ id: newDoc.id, userId: user?.uid }]));
            }
        } catch (err) {
            console.log(err);
        }
    };

    const removeLike = async () => {
        try {
            const likeToDeleteDoc = query(likesRef, where('postId', '==', post.id), where('userId', '==', user?.uid));
            const likeToDeleteData = await getDocs(likeToDeleteDoc);
            const likeId = likeToDeleteData.docs[0].id;
            const likeToDelete = doc(db, 'likes', likeId);

            await deleteDoc(likeToDelete);

            if (user) {
                setLikes((prev => prev && prev.filter((like) => like.id !== likeId)));
            }
        } catch (err) {
            console.log(err);
        }
    };



    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map(doc => ({
            id: doc.id,
            userId: doc.data().userId
        })));
    };

    const hasUserLiked = likes?.find((like) => {
        return like.userId === user?.uid;
    });


    useEffect(() => {
        getLikes();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div>
                <h1>{post.title}</h1>
            </div>
            <div>
                <p>{post.description}</p>
            </div>
            <div>
                <p>@{post.userName}</p>
                <button onClick={hasUserLiked ? removeLike : addLike}>{hasUserLiked ? <>&#128078;</> : <>&#128077;</>}</button>
                {!!likes?.length && <p>Likes: {likes?.length}</p>}
                <CommentsBox post={post} />
            </div>
        </div >
    );
};