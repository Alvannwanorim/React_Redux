import React from "react";
import { PostState, reactionAdded } from "./postsSlice";
import { useAppDispatch } from "../../app/hook";

interface ReactionButtonsInterface {
  post: PostState;
}
const reactionEmoji = {
  thumbsUp: "👍",
  heart: "❤️",
  wow: "😮",
  rocket: "🚀",
  coffee: "☕",
};

const ReactionButtons: React.FC<ReactionButtonsInterface> = ({ post }) => {
  const dispatch = useAppDispatch();
  const reactionButton = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="reactionButton"
        onClick={() => {
          dispatch(reactionAdded({ postId: post.id, reaction: name }));
        }}
      >
        {emoji}
        {post.reactions[name]}
      </button>
    );
  });
  return <div>{reactionButton}</div>;
};

export default ReactionButtons;
