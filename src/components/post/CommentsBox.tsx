import { useEffect, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from "../../config/firebase";
import { addDoc, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Comment } from "./Comment";
import { IComment, IPost } from "../../types/posts";

export const CommentsBox = (props: { post: IPost; }) => {
    const { post } = props;
    const [user] = useAuthState(auth);

    const [comment, setComment] = useState<string>('');
    const [comments, setComments] = useState<IComment[] | null>(null);

    const commentsRef = collection(db, 'comments');
    const commentsDoc = query(commentsRef, where('postId', '==', post.id));

    const addComment = async () => {
        try {
            if (!user) return;

            const newDoc = await addDoc(commentsRef, {
                userId: user?.uid,
                postId: post.id,
                content: comment
            });

            const newComment = {
                id: newDoc.id,
                userId: user?.uid,
                content: comment
            };

            setComments((prev => prev ? [...prev, newComment] : [newComment]));
        } catch (err) {
            console.log(err);
        }
    };

    const getComments = async () => {
        const data = await getDocs(commentsDoc);
        setComments(data.docs.map(doc => ({
            id: doc.id,
            userId: doc.data().userId,
            content: doc.data().content
        })));
    };

    const removeComment = async (id: string) => {
        try {
            const commentToDelete = doc(db, 'comments', id);

            await deleteDoc(commentToDelete);

            setComments((prev => prev && prev.filter((comment) => comment.id !== id)));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getComments();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <input type="text" placeholder="Comment" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setComment(e.target.value)} />
            <button type="submit" onClick={addComment}>Submit</button>
            {!!comments?.length && (
                <div>
                    <div><strong>Comments:</strong></div>
                    {comments?.map((comment: IComment) => (
                        <Comment comment={comment} onDelete={(id: string) => removeComment(id)} />
                    ))}
                </div>
            )}
        </div>
    );
};