import React from "react";
import { useAppSelector } from "../../app/hook";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

export const PostList = () => {
  const posts = useAppSelector((state) => state.posts);

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderPosts = orderedPosts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <p className="postContent">
        <PostAuthor userId={String(post.userId)} />
        <TimeAgo timestamp={post.date} />
        <ReactionButtons post={post} />
      </p>
    </article>
  ));
  return (
    <section>
      <h2>Posts</h2>
      {renderPosts}
    </section>
  );
};
