import React, { useState } from "react";
import { addNewPost, postAdded } from "./postsSlice";
import { useAppDispatch, useAppSelector } from "../../app/hook";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => state.users);

  const onTitleChanged = (e: {
    target: { value: React.SetStateAction<string> };
  }) => setTitle(e.target.value);
  const onContentChanged = (e: {
    target: { value: React.SetStateAction<string> };
  }) => setContent(e.target.value);

  const onAuthorChanged = (e: {
    target: { value: React.SetStateAction<string> };
  }) => setUserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(
          addNewPost({
            title,
            body: content,
            userId,
          })
        ).unwrap();

        setTitle("");
        setContent("");
      } catch (error) {
        console.log("Failed to save the post", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const userOptions = users.map((user) => (
    <option value={user.id} key={user.id}>
      {user.name}
    </option>
  ));
  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTile">Post Title </label>
        <input
          type="text"
          id="postTile"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />

        <label htmlFor="postAuthor">Author:</label>
        <select
          name="postAuthor"
          id=""
          value={userId}
          onChange={onAuthorChanged}
        >
          <option value=""></option>
          {userOptions}
        </select>

        <label htmlFor="postContent">Post Content</label>
        <textarea
          name="postContent"
          id="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
