import { useEffect, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { Comment } from "./Comment";
import { IComment, IPost } from "../../types/posts";

export const CommentsBox = (props: { post: IPost; }) => {
    const { post } = props;

    const [comment, setComment] = useState<string>('');
    const [comments, setComments] = useState<IComment[] | null>(null);


    const addComment = async () => {
        try {
            // if (!user) return;

            // const newDoc = await addDoc(commentsRef, {
            //     userId: user?.uid,
            //     postId: post.id,
            //     userPhoto: user?.photoURL,
            //     userName: user?.displayName,
            //     content: comment
            // });

            // const newComment = {
            //     id: newDoc.id,
            //     userId: user?.uid,
            //     userPhoto: user?.photoURL,
            //     userName: user?.displayName,
            //     content: comment,
            // };

            // setComments((prev => prev ? [...prev, newComment] : [newComment]));
        } catch (err) {
            console.log(err);
        }
    };

    const getComments = async () => {
        // setComments(data.docs.map(doc => ({
        //     id: doc.id,
        //     userId: doc.data().userId,
        //     userPhoto: doc.data().userPhoto,
        //     userName: doc.data().userName,
        //     content: doc.data().content
        // })));
    };

    const removeComment = async (id: string) => {
        try {
            // setComments((prev => prev && prev.filter((comment) => comment.id !== id)));
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