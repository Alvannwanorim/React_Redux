import React from "react";
import { useAppSelector } from "../../app/hook";
interface PostAuthorInterface {
  userId: string;
}
const PostAuthor: React.FC<PostAuthorInterface> = ({ userId }) => {
  const users = useAppSelector((state) => state.users);

  const author = users.find((user) => user.id === userId);
  return <span>by {author ? author.name : "unknown author"}</span>;
};

export default PostAuthor;
