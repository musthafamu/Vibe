import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    createdDate: {
      type: Date,
      default: Date.now,
    },
  
    likes: {
      type: Map,
      of: Boolean,
    },
  
    comments: [
      {
        text: { 
          type: String,
        },
        
      },
    ]
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;