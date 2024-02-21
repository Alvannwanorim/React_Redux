import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

interface PostReaction {
  postId: string;
  reaction: string;
}
export interface Reactions {
  [key: string]: number;
  thumbsUp: number;
  wow: number;
  heart: number;
  rocket: number;
  coffee: number;
}
interface Post {
  title: string;
  content: string;
  userId?: string;
}

export interface PostState {
  id: string;
  title: string;
  content: string;
  userId?: string;
  date: string;
  reactions: Reactions;
}

const initialState: PostState[] = [
  {
    id: "1",
    title: "Learning Redux toolkit",
    content: "I've had good times",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: "2",
    title: "Slices...",
    content: "The more I say slices, the more I want cake",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<PostState>) {
        state.push(action.payload);
      },
      prepare(post: Post) {
        return {
          payload: {
            id: nanoid(),
            title: post.title,
            content: post.content,
            userId: post.userId,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action: PayloadAction<PostReaction>) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction] += 1;
      }
    },
  },
});

export const { postAdded, reactionAdded } = postsSlice.actions;
export const selectAllPosts = (state: { posts: PostState }) => state.posts;
export default postsSlice.reducer;
