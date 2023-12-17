import Post from "../model/post.js";
import User from "../model/user.js";


export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = await Post.create({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath:user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();
 
    res.status(201).json(newPost)
  
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const {postId}=req.params;
    const { comment } = req.body;
    const post = await Post.findOne({postId});
    if (!post) {
      return res.status(404).json({ message: 'Post not d found' });
    }
    post.comments.push({text:comment});
    const updatedPost = await post.save();
    res.status(201).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const getFeedPosts=async(req,res)=>{
    try{
        const post=await Post.find();
        res.status(200).json(post);
    }catch(err){
        res.status(404).json({message:err.message})
    }
}

export const getUserPost=async (req,res)=>{
try{
    const {userId}=req.params;
    const post=await Post.find({userId});
    res.status(200).json(post);

}catch (err){
 res.status(404).json({mess:err.mess})
}
}

export const likePost=async(req,res)=>{
   try{
    const {id}=req.params;
  const {userId}=req.body;
  const post=await Post.findById(id);
  const isLiked=post.likes.get(userId);

  if(isLiked){
    post.likes.delete(userId);
  }else{ 

    post.likes.set(userId,true)
  };
  const updatedPost=await Post.findByIdAndUpdate(
    id,
    {likes:post.likes},
    {new:true}
  );
  res.status(201).json(updatedPost)
   }catch(er){
    res.status(409).json({error:err.message})
   }
}


