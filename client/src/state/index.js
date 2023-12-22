import { createSlice } from "@reduxjs/toolkit";

const initialState = {

  user: null,
  token: null,
  posts: [],


};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
   
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setComment:(state,action)=>{
      const { postId, comment } = action.payload;
      const updatedPosts = state.posts.map((post) => {
        if (post._id === postId) {
          post.comments.push(comment);
          return post;
        }
        return post;
      });
      state.posts = updatedPosts;

    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;

    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },  
});

export const {  setLogin, setLogout, setFriends,setComment, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;