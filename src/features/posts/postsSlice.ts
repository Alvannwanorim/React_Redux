import {
  PayloadAction,
  createSlice,
  nanoid,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

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
  body: string;
  userId?: string;
}
export interface PostFormat {
  id: string;
  title: string;
  body: string;
  userId?: string;
  date: string;
  reactions: Reactions;
}
export interface PostState {
  posts: PostFormat[];
  status: string;
  error: string | undefined;
}

const initialState: PostState = {
  posts: [],
  status: "idle",
  error: undefined,
};
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get(POSTS_URL);
  return data;
});

export const addNewPost = createAsyncThunk(
  "posts/AddNewPost",
  async (initialPost: Post) => {
    const response = await axios.post(POSTS_URL, initialPost);
    return response.data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<PostFormat>) {
        state.posts.push(action.payload);
      },
      prepare(post: Post) {
        return {
          payload: {
            id: nanoid(),
            title: post.title,
            body: post.body,
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
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction] += 1;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(
        fetchPosts.fulfilled,
        (state, action: PayloadAction<PostFormat[]>) => {
          state.status = "succeeded";
          let min = 1;
          const loadedPost = action.payload.map((post) => {
            post.date = sub(new Date(), { minutes: min++ }).toISOString();
            post.reactions = {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            };
            return post;
          });

          state.posts = state.posts.concat(loadedPost);
        }
      )
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "error";
        state.error = action?.error?.message;
      })
      .addCase(
        addNewPost.fulfilled,
        (state, action: PayloadAction<PostFormat>) => {
          action.payload.userId = action.payload.userId;
          action.payload.date = new Date().toISOString();
          action.payload.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          console.log(action.payload);
          state.posts.push(action.payload);
        }
      );
  },
});

export const { postAdded, reactionAdded } = postsSlice.actions;
export const selectAllPosts = (state: { posts: PostState }) => state.posts;
export default postsSlice.reducer;
