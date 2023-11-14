import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import { IComment } from "../../types/posts";

export const Comment = (props: { comment: IComment, onDelete: (id: string) => void; }) => {
    const [user] = useAuthState(auth);
    const { comment, onDelete } = props;

    return (
        <div>
            <div>{comment.content}</div>
            {comment.userId === user?.uid && <button onClick={() => onDelete(comment.id)}>Delete</button>}
        </div>
    );
};