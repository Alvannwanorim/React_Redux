import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";

import { fetchPosts } from "./postsSlice";
import PostExcerpt from "./PostExcerpt";

export const PostList = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts);
  const postsStatus = useAppSelector((state) => state.posts.status);
  const error = useAppSelector((state) => state.posts.error);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  let content;
  if (postsStatus === "loading") {
    content = <p>loading</p>;
  } else if (postsStatus === "succeeded") {
    const orderedPosts = posts.posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post, index) => (
      <PostExcerpt post={post} key={index} />
    ));
  } else if (postsStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};
