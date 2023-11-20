import { IComment } from "../../types/posts";

export const Comment = (props: { comment: IComment, onDelete: (id: string) => void; }) => {
    const { comment, onDelete } = props;

    return (
        <div>
            {/* <img src={comment.userPhoto || ""} alt="" />
            <div>{comment.userName}</div>
            <div>{comment.content}</div>
            {comment.userId === user?.uid && <button onClick={() => onDelete(comment.id)}>Delete</button>} */}
        </div>
    );
};