import React from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { PostFormat } from "./postsSlice";

interface PostExcerptInterface {
  post: PostFormat;
}
const PostExcerpt: React.FC<PostExcerptInterface> = ({ post }) => {
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 100)}</p>
      <p className="postContent">
        <PostAuthor userId={String(post.userId)} />
        <TimeAgo timestamp={post.date} />
        <ReactionButtons post={post} />
      </p>
    </article>
  );
};

export default PostExcerpt;
